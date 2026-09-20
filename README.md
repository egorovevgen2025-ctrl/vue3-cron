# eeaCronPicker

Vue 3 компонент для визуального создания cron-расписаний через селект-боксы.  
Пользователь выбирает параметры в удобном интерфейсе — компонент возвращает готовое cron-выражение.

---

## Возможности

- 🕐 Два режима: **в определённое время** и **с интервалом**
- 📅 Поддержка: каждую минуту, каждый час, каждый день, каждую неделю, каждый месяц
- 👁 Превью расписания на человеческом языке
- 🌍 Встроенная локализация: `ru`, `en` + поддержка кастомных локалей
- 🎨 Кастомизация стилей через CSS-переменные
- 🔌 `v-model` — работает как обычный input
- 📦 Без внешних зависимостей (нативный HTML/CSS)

---

## Установка

Скопируй файлы в свой проект:

```
src/
├── eeaCronPicker.vue
└── locales.js
```

---

## Использование

```vue
<template>
  <eeaCronPicker v-model="cronExpression" locale="ru" />
  <p>Cron: {{ cronExpression }}</p>
</template>

<script>
import eeaCronPicker from './src/eeaCronPicker.vue'

export default {
  components: { eeaCronPicker },
  data() {
    return {
      cronExpression: '* * * * *',
    }
  },
}
</script>
```

---

## Props

| Prop         | Тип               | По умолчанию  | Описание                                                    |
|--------------|-------------------|---------------|-------------------------------------------------------------|
| `modelValue` | `String`          | `* * * * *`   | Cron-выражение (используется через `v-model`)               |
| `locale`     | `String / Object` | `'ru'`        | Язык интерфейса или кастомный объект локали                 |
| `translator` | `Function`        | `null`        | Функция перевода из внешнего i18n-фреймворка. Если передана — `locale` игнорируется |

## Events

| Event                | Описание                              |
|----------------------|---------------------------------------|
| `update:modelValue`  | Emits новое cron-выражение при смене  |

---

## Локализация

Компонент поддерживает три способа локализации — в порядке приоритета:

### 1. Внешний i18n-фреймворк через `translator`

Передай функцию перевода `(key, params?) => string` из любого фреймворка:

```vue
<!-- vue-i18n -->
<eeaCronPicker v-model="cron" :translator="$t" />

<!-- i18next -->
<eeaCronPicker v-model="cron" :translator="(key, p) => i18next.t(key, p)" />

<!-- кастомная функция -->
<eeaCronPicker v-model="cron" :translator="(key) => myDict[key]" />
```

Добавь ключи из файла `src/i18n-keys.js` в свои переводы:

```js
// messages.ru.js
export default {
  eeaCronPicker: {
    modeAt:    'В определённое время',
    modeEvery: 'С интервалом',
    // ... полный список ключей в src/i18n-keys.js
  }
}
```

Файл `src/i18n-keys.js` содержит экспорт `KEYS` (все константы ключей) и `messages` (готовые переводы на `ru` и `en` для вставки в свой проект).

### 2. Встроенные локали через `locale`

```vue
<!-- Русский (по умолчанию) -->
<eeaCronPicker v-model="cron" locale="ru" />

<!-- Английский -->
<eeaCronPicker v-model="cron" locale="en" />
```

### 3. Кастомный объект локали

Передай объект со своими переводами:

```vue
<eeaCronPicker v-model="cron" :locale="myLocale" />
```

```js
const myLocale = {
  modeAt: 'Zum bestimmten Zeitpunkt',
  modeEvery: 'Mit Intervall',
  repeatLabel: 'Wiederholen',
  timeLabel: 'Zeit',
  everyLabel: 'Alle',
  repeatOptions: [
    { value: 'minute', label: 'Jede Minute' },
    { value: 'hour',   label: 'Jede Stunde' },
    { value: 'day',    label: 'Jeden Tag' },
    { value: 'week',   label: 'Jede Woche' },
    { value: 'month',  label: 'Jeden Monat' },
  ],
  intervalUnits: [
    { value: 'minute', label: 'Minuten' },
    { value: 'hour',   label: 'Stunden' },
    { value: 'day',    label: 'Tage' },
  ],
  weekDays: [
    { value: 0, label: 'Sonntag' },
    { value: 1, label: 'Montag' },
    // ...
  ],
  monthDayLabel: 'Tag des Monats',
  previewEveryMinute: 'Jede Minute',
  previewAt: (repeat, extra, h, m) => `...`,
  previewEvery: (n, unit) => `Alle ${n} ${unit}`,
}
```

---

## Кастомизация стилей

Переопредели CSS-переменные в своём проекте:

```css
/* Светлая тема (по умолчанию) */
:root {
  --eea-cron-font-family: inherit;
  --eea-cron-font-size: 14px;
  --eea-cron-color: #303133;
  --eea-cron-bg: #ffffff;
  --eea-cron-border: #dcdfe6;
  --eea-cron-border-radius: 6px;
  --eea-cron-primary: #409eff;
  --eea-cron-preview-bg: #f4f4f5;
  --eea-cron-preview-color: #606266;
  --eea-cron-code-color: #409eff;
  --eea-cron-gap: 10px;
  --eea-cron-padding: 16px;
}
```

### Пример тёмной темы

```css
.my-dark-wrapper {
  --eea-cron-bg: #1e1e2e;
  --eea-cron-color: #cdd6f4;
  --eea-cron-border: #45475a;
  --eea-cron-primary: #89b4fa;
  --eea-cron-preview-bg: #181825;
  --eea-cron-preview-color: #a6adc8;
  --eea-cron-code-color: #89dceb;
}
```

```vue
<div class="my-dark-wrapper">
  <eeaCronPicker v-model="cron" />
</div>
```

---

## Примеры cron-выражений

| Интерфейс                        | Cron-выражение  |
|----------------------------------|-----------------|
| Каждую минуту                    | `* * * * *`     |
| Каждый час в :30                 | `30 * * * *`    |
| Каждый день в 09:00              | `0 9 * * *`     |
| Каждый понедельник в 14:30       | `30 14 * * 1`   |
| Каждый месяц 1-го в 00:00        | `0 0 1 * *`     |
| Каждые 30 минут                  | `*/30 * * * *`  |
| Каждые 2 часа                    | `0 */2 * * *`   |
| Каждые 3 дня                     | `0 0 */3 * *`   |

---

## Демо

Открой `demo.html` в браузере — без сборщика, работает сразу.

---

## Лицензия

MIT
