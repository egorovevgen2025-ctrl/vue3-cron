/**
 * i18n-ключи для eeaCronPicker.
 *
 * Подключи эти ключи в свой i18n-фреймворк (vue-i18n, i18next, и др.)
 * и передай функцию перевода через prop :translator="$t".
 *
 * Пример для vue-i18n:
 *   <eeaCronPicker v-model="cron" :translator="$t" />
 *
 * Пример для i18next:
 *   <eeaCronPicker v-model="cron" :translator="(key, p) => i18next.t(key, p)" />
 */

export const KEYS = {
  // Режимы
  modeAt:    'eeaCronPicker.modeAt',
  modeEvery: 'eeaCronPicker.modeEvery',

  // Лейблы полей
  repeatLabel:   'eeaCronPicker.repeatLabel',
  timeLabel:     'eeaCronPicker.timeLabel',
  everyLabel:    'eeaCronPicker.everyLabel',
  monthDayLabel: 'eeaCronPicker.monthDayLabel',

  // Варианты повтора
  repeatMinute: 'eeaCronPicker.repeat.minute',
  repeatHour:   'eeaCronPicker.repeat.hour',
  repeatDay:    'eeaCronPicker.repeat.day',
  repeatWeek:   'eeaCronPicker.repeat.week',
  repeatMonth:  'eeaCronPicker.repeat.month',

  // Единицы интервала
  unitMinutes: 'eeaCronPicker.unit.minutes',
  unitHours:   'eeaCronPicker.unit.hours',
  unitDays:    'eeaCronPicker.unit.days',

  // Дни недели
  daySunday:    'eeaCronPicker.day.sunday',
  dayMonday:    'eeaCronPicker.day.monday',
  dayTuesday:   'eeaCronPicker.day.tuesday',
  dayWednesday: 'eeaCronPicker.day.wednesday',
  dayThursday:  'eeaCronPicker.day.thursday',
  dayFriday:    'eeaCronPicker.day.friday',
  daySaturday:  'eeaCronPicker.day.saturday',

  // Превью
  previewEveryMinute:  'eeaCronPicker.preview.everyMinute',
  previewHour:         'eeaCronPicker.preview.hour',         // params: { m }
  previewDay:          'eeaCronPicker.preview.day',          // params: { time }
  previewWeek:         'eeaCronPicker.preview.week',         // params: { day, time }
  previewMonth:        'eeaCronPicker.preview.month',        // params: { date, time }
  previewEveryMinutes: 'eeaCronPicker.preview.everyMinutes', // params: { n }
  previewEveryHours:   'eeaCronPicker.preview.everyHours',   // params: { n }
  previewEveryDays:    'eeaCronPicker.preview.everyDays',    // params: { n }
}

/**
 * Готовые переводы для вставки в свой i18n-файл.
 *
 * Скопируй нужный язык в свой messages.ru.js / messages.en.js
 */
export const messages = {
  ru: {
    eeaCronPicker: {
      modeAt:        'В определённое время',
      modeEvery:     'С интервалом',
      repeatLabel:   'Повтор',
      timeLabel:     'Время',
      everyLabel:    'Каждые',
      monthDayLabel: 'День месяца',
      repeat: {
        minute: 'Каждую минуту',
        hour:   'Каждый час',
        day:    'Каждый день',
        week:   'Каждую неделю',
        month:  'Каждый месяц',
      },
      unit: {
        minutes: 'минут',
        hours:   'часов',
        days:    'дней',
      },
      day: {
        sunday:    'Воскресенье',
        monday:    'Понедельник',
        tuesday:   'Вторник',
        wednesday: 'Среда',
        thursday:  'Четверг',
        friday:    'Пятница',
        saturday:  'Суббота',
      },
      preview: {
        everyMinute:  'Каждую минуту',
        hour:         'Каждый час в :{m}',
        day:          'Каждый день в {time}',
        week:         'Каждую неделю, {day} в {time}',
        month:        'Каждый месяц, {date}-го в {time}',
        everyMinutes: 'Каждые {n} минут',
        everyHours:   'Каждые {n} часов',
        everyDays:    'Каждые {n} дней',
      },
    },
  },

  en: {
    eeaCronPicker: {
      modeAt:        'At specific time',
      modeEvery:     'By interval',
      repeatLabel:   'Repeat',
      timeLabel:     'Time',
      everyLabel:    'Every',
      monthDayLabel: 'Day of month',
      repeat: {
        minute: 'Every minute',
        hour:   'Every hour',
        day:    'Every day',
        week:   'Every week',
        month:  'Every month',
      },
      unit: {
        minutes: 'minutes',
        hours:   'hours',
        days:    'days',
      },
      day: {
        sunday:    'Sunday',
        monday:    'Monday',
        tuesday:   'Tuesday',
        wednesday: 'Wednesday',
        thursday:  'Thursday',
        friday:    'Friday',
        saturday:  'Saturday',
      },
      preview: {
        everyMinute:  'Every minute',
        hour:         'Every hour at :{m}',
        day:          'Every day at {time}',
        week:         'Every week on {day} at {time}',
        month:        'Every month on day {date} at {time}',
        everyMinutes: 'Every {n} minutes',
        everyHours:   'Every {n} hours',
        everyDays:    'Every {n} days',
      },
    },
  },
}
