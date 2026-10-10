import type { Language } from './data/teas'

export const copy = {
  pl: {
    skip: 'Przejdź do rytuału', tagline: 'Parz. Mrucz. Odpocznij.', eyebrow: 'Twój spokojniejszy moment',
    heroLead: 'Ty wybierasz herbatę.', heroAccent: 'Miau pilnuje reszty.', chooseHint: 'Dotknij kubka, a pokaże Ci herbaty.', pickFromFan: 'Wybierz napar z wachlarza wokół kubka.', selectedHint: 'Twój napar jest wybrany. Możesz zacząć parzenie.',
    teaPicker: 'Wybierz herbatę', customTea: 'Moja herbata', temperature: 'Woda', amountShort: 'Susz', amount: 'Susz / 250 ml', steepTime: 'Czas',
    readyIn: 'Gotowa za', idleHint: 'Miau czeka na Twój znak.', runningHint: 'Cicho… właśnie dzieje się magia.', pausedHint: 'Rytuał zatrzymany. Nic się nie spieszy.', almostHint: 'Jeszcze tylko mrugnięcie…', doneHint: 'Idealnie zaparzona!',
    start: 'Zaparz', pause: 'Zatrzymaj', resume: 'Wznów rytuał', again: 'Zaparz ponownie', reset: 'Resetuj', backToStart: 'Wróć do wyboru',
    startCup: 'Dotknij kubka, aby rozpocząć', chooseCup: 'Dotknij kubka, aby wybrać herbatę', closePicker: 'Dotknij kubka, aby schować herbaty', pauseCup: 'Dotknij kubka, aby zatrzymać', resumeCup: 'Dotknij kubka, aby wznowić', resetCup: 'Dotknij kubka, aby zacząć od nowa',
    soundOn: 'Dźwięk włączony', soundOff: 'Dźwięk wyciszony', soundToggle: 'Przełącz dźwięk', languageToggle: 'Switch to English',
    timeAria: 'Dostosuj czas parzenia', decrease: 'Odejmij 15 sekund', increase: 'Dodaj 15 sekund', ready: 'Herbata gotowa! Czas na pierwszy łyk.', readyShort: 'Gotowe',
    controls: 'Sterowanie timerem', localNote: 'zapisuje się lokalnie', ritualProgress: 'Postęp rytuału', mugAlt: 'Animowana ilustracja ręcznie wykonanego kubka z kotem',
    miauPicks: 'Wybierz za mnie', recommendationTitle: 'Czego teraz potrzebujesz?', recommendationForYou: 'Miau wybrała dla Ciebie', energy: 'Potrzebuję energii', calm: 'Chcę się wyciszyć',
    energyReason: 'Jasny, pobudzający napar dobrany do tej pory dnia — bez zbędnego kombinowania.', calmReason: 'Łagodny wybór na spokojniejszy moment i miękkie lądowanie.', brewThis: 'Zaparz ten wybór', anotherSuggestion: 'Pokaż inną', changeNeed: 'Zmień potrzebę', chooseAgain: 'Wybierz inaczej', closeRecommendation: 'Zamknij rekomendację',
    withWhat: 'Dodatki', tastesGoodWith: 'Dobrze smakuje z', bestMoment: 'Pora i charakter', wellnessNote: 'Wskazówki mają charakter kulinarny i ogólny, nie medyczny.',
    customTitle: 'Zapisz swój rytuał', customName: 'Nazwa', customNamePlaceholder: 'np. Wieczorny blend', customDuration: 'Czas (min)', customTemperature: 'Temperatura (°C)', save: 'Zapisz herbatę', cancel: 'Anuluj',
  },
  en: {
    skip: 'Skip to the ritual', tagline: 'Steep. Sip. Purr.', eyebrow: 'Your calmer moment',
    heroLead: 'You choose the tea.', heroAccent: 'Miau watches the rest.', chooseHint: 'Tap the mug and it will reveal the teas.', pickFromFan: 'Choose a brew from the fan around the mug.', selectedHint: 'Your brew is selected. You can start steeping.',
    teaPicker: 'Choose your tea', customTea: 'My tea', temperature: 'Water', amountShort: 'Leaves', amount: 'Leaves / 250 ml', steepTime: 'Time',
    readyIn: 'Ready in', idleHint: 'Miau is waiting for your cue.', runningHint: 'Quiet… the magic is steeping.', pausedHint: 'Ritual paused. Nothing is rushing.', almostHint: 'Just one more blink…', doneHint: 'Purrfectly brewed!',
    start: 'Steep', pause: 'Pause', resume: 'Resume ritual', again: 'Steep again', reset: 'Reset', backToStart: 'Back to tea choice',
    startCup: 'Tap the mug to begin', chooseCup: 'Tap the mug to choose a tea', closePicker: 'Tap the mug to hide the teas', pauseCup: 'Tap the mug to pause', resumeCup: 'Tap the mug to resume', resetCup: 'Tap the mug to start again',
    soundOn: 'Sound on', soundOff: 'Sound muted', soundToggle: 'Toggle sound', languageToggle: 'Przełącz na polski',
    timeAria: 'Adjust steeping time', decrease: 'Subtract 15 seconds', increase: 'Add 15 seconds', ready: 'Your tea is ready! Time for the first sip.', readyShort: 'Ready',
    controls: 'Timer controls', localNote: 'saved locally', ritualProgress: 'Ritual progress', mugAlt: 'Animated illustration of the handmade cat mug',
    miauPicks: 'Choose for me', recommendationTitle: 'What do you need right now?', recommendationForYou: 'Miau picked this for you', energy: 'I need energy', calm: 'I want to unwind',
    energyReason: 'A bright, energising brew matched to this time of day — no overthinking required.', calmReason: 'A gentle choice for a quieter moment and a soft landing.', brewThis: 'Brew this one', anotherSuggestion: 'Show another', changeNeed: 'Change need', chooseAgain: 'Choose again', closeRecommendation: 'Close recommendation',
    withWhat: 'Pairings', tastesGoodWith: 'Tastes good with', bestMoment: 'Time and character', wellnessNote: 'These are culinary and general notes, not medical advice.',
    customTitle: 'Save your ritual', customName: 'Name', customNamePlaceholder: 'e.g. Evening blend', customDuration: 'Time (min)', customTemperature: 'Temperature (°C)', save: 'Save tea', cancel: 'Cancel',
  },
} satisfies Record<Language, Record<string, string>>

export type Copy = (typeof copy)[Language]
