# Домовой - Сайт студии детских праздников

Профессиональный сайт для организации детских праздников в Бельцах, Молдова.

## 🎯 Особенности

- **12 персонажей-аниматоров** с отдельными страницами
- **Контактная форма** с интеграцией Telegram Bot
- **Галерея мероприятий** с фото и видео
- **Адаптивный дизайн** (mobile-first)
- **Статическая генерация** для максимальной производительности
- **SEO-оптимизация** всех страниц

## 🛠 Технологии

- **Next.js 15.4.10** (App Router)
- **TypeScript 5.x**
- **Tailwind CSS v4**
- **React Hook Form** + **Zod** (валидация форм)
- **Axios** (Telegram API)

## 📦 Установка

1. Клонируйте репозиторий:
\`\`\`bash
git clone <repository-url>
cd celebrate-agency
\`\`\`

2. Установите зависимости:
\`\`\`bash
npm install
# или
yarn install
\`\`\`

3. Создайте файл \`.env.local\` на основе \`.env.example\`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Заполните переменные окружения в \`.env.local\`:
\`\`\`env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_USER_IDS=user_id_1,user_id_2
\`\`\`

## 🚀 Запуск

### Режим разработки:
\`\`\`bash
npm run dev
\`\`\`
Сайт будет доступен по адресу: http://localhost:3000

### Production build:
\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Структура проекта

\`\`\`
src/
├── app/                    # Next.js App Router страницы
│   ├── page.tsx           # Главная страница
│   ├── services/          # Страницы услуг
│   ├── about/             # О нас
│   ├── media/             # Медиа/события
│   ├── contact/           # Контакты
│   └── api/form/          # API для формы
├── components/            # React компоненты
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Секции страниц
│   ├── cards/            # Карточки
│   ├── forms/            # Формы
│   ├── media/            # Медиа компоненты
│   └── ui/               # UI компоненты
├── data/                 # JSON данные
│   ├── services.json     # 12 услуг
│   ├── features.json     # Дополнительные услуги
│   ├── events.json       # События
│   └── contact.json      # Контактная информация
└── lib/                  # Утилиты
    ├── types.ts          # TypeScript типы
    ├── validations.ts    # Zod схемы
    ├── utils.ts          # Вспомогательные функции
    └── constants.ts      # Константы
\`\`\`

## 🔧 Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Получите свой User ID через [@userinfobot](https://t.me/userinfobot)
4. Добавьте данные в \`.env.local\`

## 🖼️ Изображения

### Текущее состояние
Все изображения - это **JPG placeholder'ы** с правильными размерами. Они готовы к замене на реальные фотографии.

### Замена изображений
1. Подготовьте фотографии в нужных размерах:
   - **Hero:** 1920x600 px
   - **Услуги:** 800x600 px (12 фото)
   - **События (featured):** 1200x675 px
   - **События (галерея):** 800x600 px

2. Сохраните с теми же именами файлов
3. Поместите в соответствующие папки в \`public/images/\`

Подробности см. в \`IMAGE-PLACEHOLDERS.md\`

### Регенерация placeholder'ов
Если нужно пересоздать placeholder изображения:
\`\`\`bash
node scripts/generate-jpg-placeholders.js
\`\`\`

## 📝 Обновление контента

### Добавление нового персонажа:

1. Откройте \`src/data/services.json\`
2. Добавьте новый объект с полями:
\`\`\`json
{
  "id": "13",
  "nameRu": "Название персонажа",
  "slug": "nazvanie-personazha",
  "description": "Описание...",
  "image": "/images/services/nazvanie-personazha.jpg",
  "color": "#FF1493",
  "price": 2500,
  "ageRange": "3-10 лет",
  "duration": "1-1.5 часа"
}
\`\`\`
3. Добавьте изображение в \`public/images/services/\`
4. Пересоберите проект: \`npm run build\`

### Добавление события:

1. Откройте \`src/data/events.json\`
2. Добавьте новое событие:
\`\`\`json
{
  "id": "4",
  "title": "Название события",
  "slug": "nazvanie-sobytiya",
  "date": "2024-04-15",
  "featuredImage": "/images/events/event-4-featured.jpg",
  "images": ["/images/events/event-4-1.jpg"],
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "description": "Описание события"
}
\`\`\`
3. Добавьте изображения в \`public/images/events/\`
4. Пересоберите проект

### Обновление контактов:

Отредактируйте \`src/data/contact.json\`

## 🎨 Цветовая палитра

- **Soft Pink**: #FFD6E8 (фоны)
- **Lavender**: #E5DEFF (фоны)
- **Mint**: #D4F1E8 (фоны)
- **Peach**: #FFE5D4 (фоны)
- **Hot Pink**: #FF1493 (CTA, акценты)
- **Electric Blue**: #00B4D8 (вторичные CTA)
- **Navy**: #1A1A2E (текст)

## 🌐 Деплой

### Vercel (рекомендуется):

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта
3. Деплой произойдет автоматически

### VPS:

1. Соберите проект: \`npm run build\`
2. Загрузите файлы на сервер
3. Установите переменные окружения
4. Запустите: \`npm start\`

## 📱 Страницы сайта

- **/** - Главная страница
- **/services** - Все услуги
- **/services/[slug]** - Страница персонажа (12 страниц)
- **/about** - О нас
- **/media** - Галерея событий
- **/media/[slug]** - Страница события
- **/contact** - Контакты

## 🔒 Безопасность

- Не коммитьте \`.env.local\` в Git
- Храните токен бота в секрете
- Используйте HTTPS в production
- Регулярно обновляйте зависимости

## 📞 Поддержка

Для вопросов и предложений:
- Телефон: +373 79 18 18 25 (Александра)
- Телефон: +373 78 68 42 85 (Екатерина)

## 📄 Лицензия

© 2024 Домовой. Все права защищены.
