# Umbrella Corporation Travel

Інтерактивна туристична презентація на React 19, TypeScript, Vite 8 і Tailwind CSS 4.

## Запуск у VS Code

1. Встановіть [Node.js](https://nodejs.org/) версії 20 або новіше.
2. Склонуйте репозиторій:

```bash
git clone https://github.com/Arthur04Morgan/umbrella-travel.git
cd umbrella-travel
```

3. Відкрийте папку у VS Code:

```bash
code .
```

4. У терміналі VS Code виконайте:

```bash
npm install
npm run dev
```

5. Відкрийте адресу, яку покаже Vite, зазвичай:

```text
http://localhost:5173
```

> Не відкривайте `index.html` подвійним кліком і не використовуйте Live Server. `index.html` завантажує React/TypeScript через Vite, тому потрібна команда `npm run dev`.

## Production-перевірка

```bash
npm run build
npm run preview
```

Готова збірка створюється у папці `dist`.

## Локальні зображення

Для повного візуального оформлення у репозиторії повинні бути такі файли:

```text
public/assets/hero-rain-umbrella.jpg
public/assets/review-man-umbrella.jpg
public/assets/umbrella-mark.png
```

Без них застосунок збирається і працює, але локальний фон візитки, фотографія на екрані відгуку та логотип зонта не відображатимуться.
