const locales = {
  ru: {
    modeAt: 'В определённое время',
    modeEvery: 'С интервалом',

    repeatLabel: 'Повтор',
    timeLabel: 'Время',
    everyLabel: 'Каждые',
    resultLabel: 'Cron-выражение',

    // Режим "В определённое время" — варианты повтора
    repeatOptions: [
      { value: 'minute', label: 'Каждую минуту' },
      { value: 'hour',   label: 'Каждый час' },
      { value: 'day',    label: 'Каждый день' },
      { value: 'week',   label: 'Каждую неделю' },
      { value: 'month',  label: 'Каждый месяц' },
    ],

    // Режим "С интервалом" — единицы
    intervalUnits: [
      { value: 'minute', label: 'минут' },
      { value: 'hour',   label: 'часов' },
      { value: 'day',    label: 'дней' },
    ],

    // Дни недели
    weekDays: [
      { value: 0, label: 'Воскресенье' },
      { value: 1, label: 'Понедельник' },
      { value: 2, label: 'Вторник' },
      { value: 3, label: 'Среда' },
      { value: 4, label: 'Четверг' },
      { value: 5, label: 'Пятница' },
      { value: 6, label: 'Суббота' },
    ],

    // Числа месяца
    monthDayLabel: 'День месяца',

    // Превью
    previewEveryMinute: 'Каждую минуту',
    previewAt: (repeat, extra, h, m) => {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      switch (repeat) {
        case 'minute': return 'Каждую минуту'
        case 'hour':   return `Каждый час в :${String(m).padStart(2, '0')}`
        case 'day':    return `Каждый день в ${time}`
        case 'week':   return `Каждую неделю, ${extra} в ${time}`
        case 'month':  return `Каждый месяц, ${extra}-го в ${time}`
        default:       return ''
      }
    },
    previewEvery: (n, unit) => {
      switch (unit) {
        case 'minute': return `Каждые ${n} минут`
        case 'hour':   return `Каждые ${n} часов`
        case 'day':    return `Каждые ${n} дней`
        default:       return ''
      }
    },
  },

  en: {
    modeAt: 'At specific time',
    modeEvery: 'By interval',

    repeatLabel: 'Repeat',
    timeLabel: 'Time',
    everyLabel: 'Every',
    resultLabel: 'Cron expression',

    repeatOptions: [
      { value: 'minute', label: 'Every minute' },
      { value: 'hour',   label: 'Every hour' },
      { value: 'day',    label: 'Every day' },
      { value: 'week',   label: 'Every week' },
      { value: 'month',  label: 'Every month' },
    ],

    intervalUnits: [
      { value: 'minute', label: 'minutes' },
      { value: 'hour',   label: 'hours' },
      { value: 'day',    label: 'days' },
    ],

    weekDays: [
      { value: 0, label: 'Sunday' },
      { value: 1, label: 'Monday' },
      { value: 2, label: 'Tuesday' },
      { value: 3, label: 'Wednesday' },
      { value: 4, label: 'Thursday' },
      { value: 5, label: 'Friday' },
      { value: 6, label: 'Saturday' },
    ],

    monthDayLabel: 'Day of month',

    previewEveryMinute: 'Every minute',
    previewAt: (repeat, extra, h, m) => {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      switch (repeat) {
        case 'minute': return 'Every minute'
        case 'hour':   return `Every hour at :${String(m).padStart(2, '0')}`
        case 'day':    return `Every day at ${time}`
        case 'week':   return `Every week on ${extra} at ${time}`
        case 'month':  return `Every month on day ${extra} at ${time}`
        default:       return ''
      }
    },
    previewEvery: (n, unit) => {
      switch (unit) {
        case 'minute': return `Every ${n} minutes`
        case 'hour':   return `Every ${n} hours`
        case 'day':    return `Every ${n} days`
        default:       return ''
      }
    },
  },
}

export default locales
