# TeaMiau

TeaMiau to dwujęzyczny timer do parzenia herbaty. Projekt skupia się na jednym dopracowanym ekranie, który prowadzi użytkownika od wyboru herbaty do pierwszego łyku.

Głównym interfejsem jest kubek: uruchamia i zatrzymuje rytuał, pokazuje postęp, a wybór herbaty i parametry układają się wokół niego.

## Wersja online

[Otwórz TeaMiau](https://teamiau.pages.dev/)

## Decyzja produktowa

Zamiast klasycznego układu „formularz + timer” TeaMiau wykorzystuje model **one-object interface**. Użytkownik ma jeden punkt skupienia i jedną główną akcję. Orbita herbat, trzy sygnały parametrów i animowane stany kubka prowadzą przez prosty przepływ: wybór → parzenie → gotowe. Dzięki temu produkt pozostaje minimalistyczny, ale ma rozpoznawalny moment charakterystyczny dla portfolio.

## Funkcje

- osiem rodzajów herbat z temperaturą, czasem i ilością suszu;
- wybór herbaty z ukrytego, animowanego wachlarza otwieranego kliknięciem kubka;
- pierwszy ekran ograniczony do kubka; timer i sterowanie pojawiają się dopiero po wyborze naparu;
- funkcja „Miau wybiera”, która proponuje herbatę na podstawie nastroju i pory dnia;
- dopasowane do każdej herbaty sugestie dodatków, pory dnia i charakteru naparu;
- sterowanie timerem bezpośrednio przez kliknięcie lub dotknięcie kubka;
- autorska ilustracja SVG inspirowana ręcznie malowanym kubkiem, z osobno animowanymi oczami, uchem, naparem i parą;
- dokładny timer z pauzą, wznowieniem, resetem i korektą czasu;
- poprawne odliczanie po przełączeniu karty;
- delikatny dźwięk, opcjonalna wibracja i obsługa Wake Lock;
- pełne wersje polska i angielska;
- zapamiętywanie języka, dźwięku, wyboru herbaty i ustawień własnych;
- responsywny, dostępny interfejs z obsługą klawiatury;
- ograniczenie animacji dla `prefers-reduced-motion`.

## Technologie

React, TypeScript, Vite i autorski CSS. Aplikacja nie wymaga backendu ani konta użytkownika — dane są zapisywane w `localStorage`.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Kompilacja produkcyjna:

```bash
npm run build
```

## Dostępność i responsywność

TeaMiau używa semantycznego HTML, widocznych stanów fokusu, komunikatów dla technologii asystujących i odpowiednio dużych kontrolek. Układ dostosowuje się do telefonu, tabletu i komputera.
