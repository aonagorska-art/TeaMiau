export type Language = 'pl' | 'en'

export type LocalizedText = Record<Language, string>

export interface Tea {
  id: string
  name: LocalizedText
  nickname?: string
  description: LocalizedText
  temperature: number
  duration: number
  amount: LocalizedText
  color: string
  pairings: Record<Language, string[]>
  moment: LocalizedText
  qualities: Record<Language, string[]>
}

export const teas: Tea[] = [
  {
    id: 'black',
    name: { pl: 'Czarna', en: 'Black' },
    description: { pl: 'Głęboka, wyrazista i otulająca.', en: 'Deep, bold and comforting.' },
    temperature: 95,
    duration: 240,
    amount: { pl: '2–3 g', en: '2–3 g' },
    color: '#aa6048',
    pairings: { pl: ['mleko', 'miód', 'cytryna'], en: ['milk', 'honey', 'lemon'] },
    moment: { pl: 'Rano lub wczesnym popołudniem', en: 'Morning or early afternoon' },
    qualities: { pl: ['zawiera kofeinę', 'sprzyja czujności', 'wyrazista do śniadania'], en: ['contains caffeine', 'supports alertness', 'bold with breakfast'] },
  },
  {
    id: 'green',
    name: { pl: 'Zielona', en: 'Green' },
    description: { pl: 'Świeża, lekka i delikatnie roślinna.', en: 'Fresh, light and gently grassy.' },
    temperature: 80,
    duration: 150,
    amount: { pl: '2–3 g', en: '2–3 g' },
    color: '#a4aa63',
    pairings: { pl: ['cytryna', 'mięta', 'odrobina miodu'], en: ['lemon', 'mint', 'a little honey'] },
    moment: { pl: 'Rano lub po południu', en: 'Morning or afternoon' },
    qualities: { pl: ['zawiera kofeinę', 'lekka i świeża', 'źródło katechin'], en: ['contains caffeine', 'light and fresh', 'a source of catechins'] },
  },
  {
    id: 'white',
    name: { pl: 'Biała', en: 'White' },
    description: { pl: 'Subtelna, miękka i naturalnie słodka.', en: 'Subtle, soft and naturally sweet.' },
    temperature: 75,
    duration: 300,
    amount: { pl: '3–4 g', en: '3–4 g' },
    color: '#d9bd88',
    pairings: { pl: ['brzoskwinia', 'miód', 'bez dodatków'], en: ['peach', 'honey', 'on its own'] },
    moment: { pl: 'Późny poranek lub spokojne popołudnie', en: 'Late morning or a quiet afternoon' },
    qualities: { pl: ['delikatny smak', 'zawiera kofeinę', 'łagodny rytuał'], en: ['delicate taste', 'contains caffeine', 'a gentle ritual'] },
  },
  {
    id: 'oolong',
    name: { pl: 'Oolong', en: 'Oolong' },
    nickname: 'Meowlong',
    description: { pl: 'Kwiatowy, wielowarstwowy i aromatyczny.', en: 'Floral, layered and aromatic.' },
    temperature: 90,
    duration: 210,
    amount: { pl: '4–5 g', en: '4–5 g' },
    color: '#d79d55',
    pairings: { pl: ['miód', 'skórka cytrusów', 'bez dodatków'], en: ['honey', 'citrus peel', 'on its own'] },
    moment: { pl: 'Popołudnie lub po posiłku', en: 'Afternoon or after a meal' },
    qualities: { pl: ['zawiera kofeinę', 'wielowymiarowy aromat', 'dobry do degustacji'], en: ['contains caffeine', 'layered aroma', 'made for slow tasting'] },
  },
  {
    id: 'puerh',
    name: { pl: 'Pu-erh', en: 'Pu-erh' },
    nickname: 'Purr-erh',
    description: { pl: 'Ziemisty, pełny i przyjemnie głęboki.', en: 'Earthy, full and pleasantly deep.' },
    temperature: 95,
    duration: 240,
    amount: { pl: '4–5 g', en: '4–5 g' },
    color: '#8d4d3e',
    pairings: { pl: ['imbir', 'miód', 'suszona śliwka'], en: ['ginger', 'honey', 'dried plum'] },
    moment: { pl: 'Po południu, często po obfitym posiłku', en: 'Afternoon, often after a rich meal' },
    qualities: { pl: ['zawiera kofeinę', 'głęboki, ziemisty smak', 'tradycyjny napar po posiłku'], en: ['contains caffeine', 'deep earthy taste', 'traditionally served after meals'] },
  },
  {
    id: 'rooibos',
    name: { pl: 'Rooibos', en: 'Rooibos' },
    description: { pl: 'Łagodny, miodowy i bezkofeinowy.', en: 'Mellow, honeyed and caffeine-free.' },
    temperature: 95,
    duration: 360,
    amount: { pl: '3–4 g', en: '3–4 g' },
    color: '#c86f51',
    pairings: { pl: ['mleko', 'miód', 'wanilia'], en: ['milk', 'honey', 'vanilla'] },
    moment: { pl: 'Popołudnie lub wieczór', en: 'Afternoon or evening' },
    qualities: { pl: ['bez kofeiny', 'naturalnie łagodny', 'dobry do wieczornego rytuału'], en: ['caffeine-free', 'naturally mellow', 'suited to an evening ritual'] },
  },
  {
    id: 'herbal',
    name: { pl: 'Ziołowa', en: 'Herbal' },
    description: { pl: 'Aromatyczna chwila spokoju bez teiny.', en: 'A fragrant, caffeine-free pause.' },
    temperature: 95,
    duration: 420,
    amount: { pl: '4–5 g', en: '4–5 g' },
    color: '#8da06b',
    pairings: { pl: ['miód', 'cytryna', 'imbir'], en: ['honey', 'lemon', 'ginger'] },
    moment: { pl: 'Po posiłku lub wieczorem', en: 'After a meal or in the evening' },
    qualities: { pl: ['zwykle bez kofeiny', 'właściwości zależą od ziół', 'mięta i imbir są tradycyjnie wybierane po posiłku'], en: ['usually caffeine-free', 'properties depend on the herbs', 'mint and ginger are traditionally chosen after meals'] },
  },
  {
    id: 'matcha',
    name: { pl: 'Matcha', en: 'Matcha' },
    nickname: 'Miaucza',
    description: { pl: 'Kremowa, intensywna i pełna umami.', en: 'Creamy, vibrant and rich in umami.' },
    temperature: 75,
    duration: 60,
    amount: { pl: '1,5–2 g', en: '1.5–2 g' },
    color: '#7f9a54',
    pairings: { pl: ['mleko owsiane', 'wanilia', 'odrobina miodu'], en: ['oat milk', 'vanilla', 'a little honey'] },
    moment: { pl: 'Rano lub przed aktywną częścią dnia', en: 'Morning or before an active part of the day' },
    qualities: { pl: ['zawiera kofeinę', 'sprzyja czujności', 'intensywny smak umami'], en: ['contains caffeine', 'supports alertness', 'intense umami taste'] },
  },
]
