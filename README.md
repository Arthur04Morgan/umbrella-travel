# Umbrella Corporation Travel

Интерактивный туристический сайт на React 19, TypeScript, Vite 8 и Tailwind CSS 4.

## Что находится в репозитории

```text
index.html                         HTML-страница, которую загружает Chrome
src/App.tsx                       все 6 экранов и интерактивная логика
src/index.css                     стили, анимации и адаптивная верстка
src/main.tsx                      запуск React-приложения
public/assets/world-map.jpg       спутниковая карта мира
public/assets/*.jpg               локальные фотографии
public/assets/umbrella-mark.png   логотип Umbrella
.github/workflows/                автоматическая публикация GitHub Pages
```

У React/Vite-приложения должна быть одна основная HTML-страница — `index.html`.
Остальные экраны создаются компонентом `src/App.tsx` и отображаются в Chrome
без перезагрузки страницы. Перенос каждого экрана в отдельный HTML-файл сломал
бы переходы, сохранение выбранной страны и загрузочные анимации.

## Как перенести проект на ноутбук

Установите:

- [Git](https://git-scm.com/downloads)
- [Node.js 22 LTS](https://nodejs.org/)
- [VS Code](https://code.visualstudio.com/)

Откройте PowerShell или терминал и выполните:

```bash
git clone https://github.com/Arthur04Morgan/umbrella-travel.git
cd umbrella-travel
code .
```

## Как запустить в Chrome

В терминале VS Code:

```bash
npm install
npm run dev
```

Vite покажет локальную ссылку, обычно:

```text
http://localhost:5173
```

Откройте её в Google Chrome.

> Не открывайте `index.html` двойным кликом и не используйте расширение Live
> Server. Браузеру нужна обработка React и TypeScript через Vite.

## Production-проверка

```bash
npm run build
npm run preview
```

Готовая оптимизированная версия создаётся в папке `dist`.

## GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` автоматически:

1. устанавливает зависимости;
2. собирает сайт;
3. публикует папку `dist` в GitHub Pages.

В репозитории один раз выберите:

```text
Settings → Pages → Source → GitHub Actions
```

После этого каждый новый push в ветку `main` будет обновлять сайт.

## Основные возможности

- 6 интерактивных экранов;
- спутниковая карта мира в локальном JPEG;
- выбор 6 регионов и каталог 120 стран;
- карточки направлений с фотографиями;
- анкета путешественника;
- форма отзыва и рейтинг;
- сохранение региона и страны в `localStorage`;
- адаптивная верстка для мобильных экранов;
- корректные относительные пути для GitHub Pages.
