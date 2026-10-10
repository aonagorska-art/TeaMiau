import { useCallback, useEffect, useRef, useState } from 'react'
import { MiauCup } from './components/MiauCup'
import { teas, type Language, type Tea } from './data/teas'
import { copy } from './i18n'
import { usePersistentState } from './hooks/usePersistentState'

type TimerStatus = 'idle' | 'running' | 'paused' | 'done'

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
}

function safeNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min))
}

function App() {
  const [language, setLanguage] = usePersistentState<Language>('teammiau-language', 'pl')
  const [soundOn, setSoundOn] = usePersistentState('teammiau-sound', true)
  const [selectedId, setSelectedId] = usePersistentState('teammiau-selected-tea', 'green')
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [duration, setDuration] = useState(150)
  const [remaining, setRemaining] = useState(150)
  const [endAt, setEndAt] = useState<number | null>(null)
  const [hasChosenTea, setHasChosenTea] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [recommendOpen, setRecommendOpen] = useState(false)
  const [recommendationMood, setRecommendationMood] = useState<'energy' | 'calm' | null>(null)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastRecommendationRef = useRef<Record<'energy' | 'calm', string | null>>({ energy: null, calm: null })
  const t = copy[language]

  const selectedTea = teas.find((tea) => tea.id === selectedId) ?? teas[1]

  useEffect(() => {
    if (status !== 'idle') return
    setDuration(selectedTea.duration)
    setRemaining(selectedTea.duration)
  }, [selectedId, status, selectedTea.duration])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setPickerOpen(false)
      setRecommendOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const releaseWakeLock = useCallback(async () => {
    if (!wakeLockRef.current) return
    await wakeLockRef.current.release().catch(() => undefined)
    wakeLockRef.current = null
  }, [])

  const requestWakeLock = useCallback(async () => {
    if (!('wakeLock' in navigator)) return
    try { wakeLockRef.current = await navigator.wakeLock.request('screen') } catch { /* progressive enhancement */ }
  }, [])

  const getAudioContext = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContextClass()
      }
      return audioContextRef.current
    } catch {
      return null
    }
  }, [])

  const activateAudio = useCallback(() => {
    const context = getAudioContext()
    if (!context) return
    if (context.state === 'suspended') void context.resume().catch(() => undefined)

    try {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      gain.gain.setValueAtTime(0.0001, context.currentTime)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + 0.01)
      window.setTimeout(() => {
        oscillator.disconnect()
        gain.disconnect()
      }, 60)
    } catch { /* audio context remains ready for the completion chime */ }
  }, [getAudioContext])

  const playChime = useCallback(async () => {
    if (!soundOn) return
    const context = getAudioContext()
    if (!context) return

    try {
      if (context.state === 'suspended') await context.resume()
      const startAt = context.currentTime + 0.02
      const gain = context.createGain()
      gain.gain.setValueAtTime(0.0001, startAt)
      gain.gain.exponentialRampToValueAtTime(0.11, startAt + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 1.35)
      gain.connect(context.destination)
      ;[523.25, 659.25, 783.99].forEach((frequency, index) => {
        const oscillator = context.createOscillator()
        oscillator.type = 'sine'
        oscillator.frequency.value = frequency
        oscillator.connect(gain)
        oscillator.start(startAt + index * 0.18)
        oscillator.stop(startAt + 0.9 + index * 0.18)
      })
      window.setTimeout(() => gain.disconnect(), 1750)
    } catch { /* visual feedback remains available */ }
  }, [getAudioContext, soundOn])

  const completeTimer = useCallback(() => {
    setRemaining(0)
    setEndAt(null)
    setStatus('done')
    void playChime()
    if ('vibrate' in navigator) navigator.vibrate([90, 60, 150])
    void releaseWakeLock()
  }, [playChime, releaseWakeLock])

  useEffect(() => {
    if (status !== 'running' || endAt === null) return
    const tick = () => {
      const next = Math.max(0, Math.ceil((endAt - Date.now()) / 1000))
      setRemaining(next)
      if (next <= 0) completeTimer()
    }
    tick()
    const interval = window.setInterval(tick, 250)
    return () => window.clearInterval(interval)
  }, [status, endAt, completeTimer])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && status === 'running') void requestWakeLock()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [requestWakeLock, status])

  useEffect(() => () => void releaseWakeLock(), [releaseWakeLock])

  useEffect(() => () => {
    const context = audioContextRef.current
    audioContextRef.current = null
    if (context && context.state !== 'closed') void context.close()
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'pl' ? 'TeaMiau — Parz. Mrucz. Odpocznij.' : 'TeaMiau — Steep. Sip. Purr.'
  }, [language])

  const selectTea = (tea: Tea) => {
    if (status !== 'idle') return
    setSelectedId(tea.id)
    setDuration(tea.duration)
    setRemaining(tea.duration)
    setHasChosenTea(true)
    setPickerOpen(false)
  }

  const chooseRecommendation = (mood: 'energy' | 'calm') => {
    const hour = new Date().getHours()
    const candidates = mood === 'energy'
      ? hour < 11 ? ['black', 'matcha', 'green', 'oolong'] : hour < 16 ? ['green', 'black', 'matcha', 'oolong'] : ['oolong', 'green', 'black', 'matcha']
      : hour >= 18 ? ['rooibos', 'herbal', 'white'] : ['white', 'rooibos', 'herbal']
    const previousIndex = candidates.indexOf(lastRecommendationRef.current[mood] ?? '')
    const recommendedId = candidates[previousIndex < 0 ? 0 : (previousIndex + 1) % candidates.length]
    const recommendation = teas.find((tea) => tea.id === recommendedId) ?? teas[1]
    lastRecommendationRef.current[mood] = recommendation.id
    selectTea(recommendation)
    setRecommendationMood(mood)
  }

  const start = () => {
    if (soundOn) activateAudio()
    setPickerOpen(false)
    setRecommendOpen(false)
    setRemaining(duration)
    setEndAt(Date.now() + duration * 1000)
    setStatus('running')
    void requestWakeLock()
  }

  const toggleSound = () => {
    const nextSoundOn = !soundOn
    setSoundOn(nextSoundOn)
    if (nextSoundOn) activateAudio()
  }

  const pause = () => {
    if (endAt !== null) setRemaining(Math.max(0, Math.ceil((endAt - Date.now()) / 1000)))
    setEndAt(null)
    setStatus('paused')
    void releaseWakeLock()
  }

  const resume = () => {
    setEndAt(Date.now() + remaining * 1000)
    setStatus('running')
    void requestWakeLock()
  }

  const reset = () => {
    setEndAt(null)
    setDuration(selectedTea.duration)
    setRemaining(selectedTea.duration)
    setStatus('idle')
    void releaseWakeLock()
  }

  const backToStart = () => {
    setEndAt(null)
    setStatus('idle')
    setHasChosenTea(false)
    setPickerOpen(false)
    setRecommendOpen(false)
    setRecommendationMood(null)
    void releaseWakeLock()
  }

  const handleMugAction = () => {
    if (status === 'idle') setPickerOpen((open) => !open)
    else if (status === 'running') pause()
    else if (status === 'paused') resume()
    else reset()
  }

  const adjustTime = (amount: number) => {
    if (status !== 'idle') return
    const next = safeNumber(duration + amount, 15, 3600)
    setDuration(next)
    setRemaining(next)
  }

  const progress = duration > 0 ? Math.min(1, 1 - remaining / duration) : 0
  const almostReady = status === 'running' && remaining <= 30
  const ringOffset = 100 - progress * 100
  const actionLabel = status === 'running' ? t.pause : status === 'paused' ? t.resume : status === 'done' ? t.again : t.start
  const actionIcon = status === 'running' ? 'Ⅱ' : status === 'done' ? '↻' : '→'
  const mugLabel = status === 'running' ? t.pauseCup : status === 'paused' ? t.resumeCup : status === 'done' ? t.resetCup : pickerOpen ? t.closePicker : t.chooseCup
  const statusMessage = status === 'done' ? t.doneHint : status === 'paused' ? t.pausedHint : status === 'running' && remaining <= 30 ? t.almostHint : status === 'running' ? t.runningHint : t.idleHint

  const renderControlDock = (placement: 'mobile' | 'desktop') => hasChosenTea ? (
    <section className={`control-dock ${placement}-control-dock`} aria-label={t.controls}>
      <div className="selected-ritual"><span className="selected-swatch" aria-hidden="true" /><div>{selectedTea.nickname && <small>{selectedTea.nickname}</small>}<strong>{selectedTea.name[language]}</strong><p>{selectedTea.description[language]}</p><div className="ritual-meta"><span>{selectedTea.temperature}°</span><span>{selectedTea.amount[language]}</span></div></div></div>
      <div className="main-controls">
        {status === 'idle' && <div className="time-tune" aria-label={t.timeAria}><button type="button" onClick={() => adjustTime(-15)} aria-label={t.decrease}>−</button><span>{formatTime(duration)}</span><button type="button" onClick={() => adjustTime(15)} aria-label={t.increase}>＋</button></div>}
        <button className="primary-action" type="button" onClick={status === 'idle' ? start : handleMugAction}><span>{actionLabel}</span><b aria-hidden="true">{actionIcon}</b></button>
        {(status === 'running' || status === 'paused') && <button className="text-action" type="button" onClick={reset}>{t.reset}</button>}
      </div>
    </section>
  ) : null

  return (
    <div className={`app-shell status-${status} ${almostReady ? 'status-almost' : ''} ${pickerOpen ? 'picker-active' : ''} ${recommendOpen ? 'recommend-active' : ''} ${hasChosenTea ? 'tea-selected' : ''}`} style={{ '--tea-color': selectedTea.color, '--progress': progress } as React.CSSProperties}>
      <a className="skip-link" href="#ritual">{t.skip}</a>
      <div className="ambient-grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="TeaMiau — home">
          <span className="brand-cat" aria-hidden="true"><i /><b>M</b><i /></span><span>TeaMiau</span>
        </a>
        <div className="ritual-step" aria-label={t.ritualProgress}>
          <span className="step-dot active" /><span className={`step-line ${status !== 'idle' ? 'active' : ''}`} />
          <span className={`step-dot ${status !== 'idle' ? 'active' : ''}`} /><span className={`step-line ${status === 'done' ? 'active' : ''}`} />
          <span className={`step-dot ${status === 'done' ? 'active' : ''}`} /><small>{status === 'done' ? '03' : status === 'idle' ? '01' : '02'} / 03</small>
        </div>
        <div className="header-actions">
          <button className={`round-action ${soundOn ? '' : 'is-muted'}`} type="button" onClick={toggleSound} aria-label={t.soundToggle} title={soundOn ? t.soundOn : t.soundOff}><span aria-hidden="true">{soundOn ? '♪' : '♪̸'}</span></button>
          <button className="language-switch" type="button" onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')} aria-label={t.languageToggle}>
            <span className={language === 'pl' ? 'active' : ''}>PL</span><span aria-hidden="true">·</span><span className={language === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-copy" aria-labelledby="page-title">
          <p>{t.eyebrow}</p><h1 id="page-title">{t.heroLead} <em>{t.heroAccent}</em></h1><span>{status === 'idle' ? pickerOpen ? t.pickFromFan : hasChosenTea ? t.selectedHint : t.chooseHint : statusMessage}</span>
        </section>

        <section className={`ritual-stage ${pickerOpen ? 'picker-open' : ''} ${hasChosenTea ? 'tea-chosen' : 'awaiting-choice'}`} id="ritual" aria-label={t.steepTime}>
          <div className="picker-caption" aria-hidden={!pickerOpen}><span>01</span>{t.teaPicker}</div>
          <div className="tea-orbit" role="group" aria-label={t.teaPicker}>
            {teas.map((tea, index) => (
              <button key={tea.id} type="button" className={`tea-node ${selectedId === tea.id ? 'selected' : ''}`} style={{ '--angle': `${index * 45 - 112.5}deg`, '--i': index, '--node-color': tea.color } as React.CSSProperties} onClick={() => selectTea(tea)} disabled={status !== 'idle' || !pickerOpen} aria-pressed={selectedId === tea.id}>
                <svg className="tea-leaf" viewBox="0 0 130 72" aria-hidden="true">
                  <path className="tea-leaf-surface" d="M8 52C21 14 69 4 121 18C111 52 67 70 8 52Z" />
                  <path className="tea-leaf-veins" d="M14 51C45 43 78 31 113 21M43 43L31 29M62 37L51 20M80 31L74 15M91 28L103 15M69 35L83 51M48 42L59 57" />
                </svg>
                <span>{tea.name[language]}</span>
              </button>
            ))}
          </div>
          <button className="picker-recommend" type="button" onClick={() => { setPickerOpen(false); setRecommendOpen(true); setRecommendationMood(null) }} aria-hidden={!pickerOpen} tabIndex={pickerOpen ? 0 : -1}>{t.miauPicks}</button>
          {hasChosenTea && !pickerOpen && <button className="back-to-start" type="button" onClick={backToStart}><span aria-hidden="true">←</span>{t.backToStart}</button>}

          {recommendOpen && <section className="recommend-panel" id="miau-recommendation" aria-labelledby="recommend-title">
            <button className="recommend-close" type="button" onClick={() => setRecommendOpen(false)} aria-label={t.closeRecommendation}>×</button>
            <span className="recommend-kicker">Miau / {new Date().getHours().toString().padStart(2, '0')}:00</span>
            <h2 id="recommend-title">{recommendationMood ? t.recommendationForYou : t.recommendationTitle}</h2>
            {!recommendationMood ? <div className="mood-options">
              <button type="button" onClick={() => chooseRecommendation('energy')}><i aria-hidden="true">↗</i><span>{t.energy}</span></button>
              <button type="button" onClick={() => chooseRecommendation('calm')}><i aria-hidden="true">~</i><span>{t.calm}</span></button>
            </div> : <div className="recommend-result">
              <strong>{selectedTea.name[language]}</strong>
              <p>{recommendationMood === 'energy' ? t.energyReason : t.calmReason}</p>
              <div className="recommend-actions"><button className="primary-action compact" type="button" onClick={start}>{t.brewThis}</button><button className="text-action" type="button" onClick={() => recommendationMood && chooseRecommendation(recommendationMood)}>{t.anotherSuggestion}</button><button className="text-action subtle" type="button" onClick={() => setRecommendationMood(null)}>{t.changeNeed}</button></div>
            </div>}
          </section>}

          {hasChosenTea && !pickerOpen && !recommendOpen && <>
            <aside className="tea-side-panel pairing-panel" aria-labelledby="pairing-title">
              <span className="side-panel-icon" aria-hidden="true">＋</span>
              <div><small id="pairing-title">{t.withWhat}</small><h2>{t.tastesGoodWith}</h2><ul>{selectedTea.pairings[language].map((pairing) => <li key={pairing}>{pairing}</li>)}</ul></div>
            </aside>
            <aside className="tea-side-panel moment-panel" aria-labelledby="moment-title">
              <span className="side-panel-icon" aria-hidden="true">◷</span>
              <div><small id="moment-title">{t.bestMoment}</small><h2>{selectedTea.moment[language]}</h2><ul>{selectedTea.qualities[language].map((quality) => <li key={quality}>{quality}</li>)}</ul><p>{t.wellnessNote}</p></div>
            </aside>
          </>}

          <div className="center-console">
            {hasChosenTea && <div className="timer-orb" aria-live="off">
              <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="orb-track" cx="60" cy="60" r="55" pathLength="100" /><circle className="orb-progress" cx="60" cy="60" r="55" pathLength="100" strokeDashoffset={ringOffset} /></svg>
              {status === 'done'
                ? <div><output className="timer-ready" aria-label={t.ready}>{t.readyShort}</output></div>
                : <div><span>{status === 'idle' ? selectedTea.name[language] : t.readyIn}</span><output aria-label={`${t.readyIn} ${formatTime(remaining)}`}>{formatTime(remaining)}</output></div>}
            </div>}

            <div className="steam-field" aria-hidden="true"><i /><i /><i /><i /></div>
            <button className="mug-button" type="button" onClick={handleMugAction} aria-label={mugLabel}>
              <MiauCup label={t.mugAlt} progress={progress} />
              <span className="tap-ripple ripple-one" aria-hidden="true" /><span className="tap-ripple ripple-two" aria-hidden="true" />
              <span className="heart-pop heart-a" aria-hidden="true">♥</span><span className="heart-pop heart-b" aria-hidden="true">♥</span><span className="heart-pop heart-c" aria-hidden="true">✦</span>
            </button>
            <span className="cup-instruction">{mugLabel}<i aria-hidden="true">↟</i></span>
          </div>
          {renderControlDock('mobile')}
        </section>

        {renderControlDock('desktop')}
        <p className="sr-only" aria-live="assertive">{status === 'done' ? t.ready : ''}</p>
      </main>

      <footer><span>{t.tagline}</span><span>© {new Date().getFullYear()}</span></footer>

      {status === 'done' && <div className="ready-toast" role="status" aria-live="polite"><span aria-hidden="true">♥</span><div><strong>{t.doneHint}</strong><p>{t.ready}</p></div></div>}

    </div>
  )
}

declare global { interface Window { webkitAudioContext: typeof AudioContext } }
export default App
