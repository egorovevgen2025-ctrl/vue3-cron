<template>
  <div class="eea-cron-picker">

    <!-- Переключатель режима -->
    <div class="eea-cron-picker__modes">
      <label class="eea-cron-picker__mode-label">
        <input
          type="radio"
          name="cronMode"
          value="at"
          v-model="mode"
        />
        <span>{{ t.modeAt }}</span>
      </label>
      <label class="eea-cron-picker__mode-label">
        <input
          type="radio"
          name="cronMode"
          value="every"
          v-model="mode"
        />
        <span>{{ t.modeEvery }}</span>
      </label>
    </div>

    <!-- Режим "В определённое время" -->
    <div v-if="mode === 'at'" class="eea-cron-picker__section">

      <!-- Повтор -->
      <div class="eea-cron-picker__row">
        <label class="eea-cron-picker__field-label">{{ t.repeatLabel }}</label>
        <select class="eea-cron-picker__select" v-model="atRepeat">
          <option
            v-for="opt in t.repeatOptions"
            :key="opt.value"
            :value="opt.value"
          >{{ opt.label }}</option>
        </select>
      </div>

      <!-- Минуты (только для режима "каждый час") -->
      <div v-if="atRepeat === 'hour'" class="eea-cron-picker__row">
        <label class="eea-cron-picker__field-label">{{ t.timeLabel }}</label>
        <span class="eea-cron-picker__colon">:</span>
        <select class="eea-cron-picker__select eea-cron-picker__select--time" v-model="atMinute">
          <option v-for="m in minutes" :key="m" :value="m">{{ pad(m) }}</option>
        </select>
      </div>

      <!-- День недели (только для режима "каждую неделю") -->
      <div v-if="atRepeat === 'week'" class="eea-cron-picker__row">
        <label class="eea-cron-picker__field-label">{{ t.weekDays[0].label.replace('Воскресенье','').replace('Sunday','') || 'День' }}</label>
        <select class="eea-cron-picker__select" v-model="atWeekDay">
          <option
            v-for="d in t.weekDays"
            :key="d.value"
            :value="d.value"
          >{{ d.label }}</option>
        </select>
      </div>

      <!-- День месяца (только для режима "каждый месяц") -->
      <div v-if="atRepeat === 'month'" class="eea-cron-picker__row">
        <label class="eea-cron-picker__field-label">{{ t.monthDayLabel }}</label>
        <select class="eea-cron-picker__select eea-cron-picker__select--time" v-model="atMonthDay">
          <option v-for="d in monthDays" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>

      <!-- Время (для day, week, month) -->
      <div v-if="['day','week','month'].includes(atRepeat)" class="eea-cron-picker__row">
        <label class="eea-cron-picker__field-label">{{ t.timeLabel }}</label>
        <select class="eea-cron-picker__select eea-cron-picker__select--time" v-model="atHour">
          <option v-for="h in hours" :key="h" :value="h">{{ pad(h) }}</option>
        </select>
        <span class="eea-cron-picker__colon">:</span>
        <select class="eea-cron-picker__select eea-cron-picker__select--time" v-model="atMinute">
          <option v-for="m in minutes" :key="m" :value="m">{{ pad(m) }}</option>
        </select>
      </div>

    </div>

    <!-- Режим "С интервалом" -->
    <div v-if="mode === 'every'" class="eea-cron-picker__section">
      <div class="eea-cron-picker__row">
        <label class="eea-cron-picker__field-label">{{ t.everyLabel }}</label>
        <select class="eea-cron-picker__select eea-cron-picker__select--time" v-model="everyValue">
          <option v-for="n in everyValueOptions" :key="n" :value="n">{{ n }}</option>
        </select>
        <select class="eea-cron-picker__select" v-model="everyUnit">
          <option
            v-for="u in t.intervalUnits"
            :key="u.value"
            :value="u.value"
          >{{ u.label }}</option>
        </select>
      </div>
    </div>

    <!-- Превью -->
    <div class="eea-cron-picker__preview">
      <span class="eea-cron-picker__preview-text">{{ preview }}</span>
      <code class="eea-cron-picker__result">{{ cronValue }}</code>
    </div>

  </div>
</template>

<script>
import builtinLocales from './locales.js'

export default {
  name: 'eeaCronPicker',

  props: {
    modelValue: {
      type: String,
      default: '* * * * *',
    },
    locale: {
      type: [String, Object],
      default: 'ru',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      mode: 'at',

      // Режим "at"
      atRepeat: 'day',
      atHour: 9,
      atMinute: 0,
      atWeekDay: 1,
      atMonthDay: 1,

      // Режим "every"
      everyValue: 30,
      everyUnit: 'minute',
    }
  },

  computed: {
    // Разрешаем локаль: строка → встроенная, объект → кастомная
    t() {
      if (typeof this.locale === 'object' && this.locale !== null) {
        return this.locale
      }
      return builtinLocales[this.locale] || builtinLocales['ru']
    },

    hours() {
      return Array.from({ length: 24 }, (_, i) => i)
    },

    minutes() {
      return Array.from({ length: 60 }, (_, i) => i)
    },

    monthDays() {
      return Array.from({ length: 31 }, (_, i) => i + 1)
    },

    everyValueOptions() {
      switch (this.everyUnit) {
        case 'minute': return Array.from({ length: 59 }, (_, i) => i + 1)
        case 'hour':   return Array.from({ length: 23 }, (_, i) => i + 1)
        case 'day':    return Array.from({ length: 30 }, (_, i) => i + 1)
        default:       return Array.from({ length: 59 }, (_, i) => i + 1)
      }
    },

    cronValue() {
      if (this.mode === 'at') {
        return this.buildAtCron()
      } else {
        return this.buildEveryCron()
      }
    },

    preview() {
      if (this.mode === 'at') {
        if (this.atRepeat === 'minute') return this.t.previewEveryMinute

        let extra = ''
        if (this.atRepeat === 'week') {
          extra = this.t.weekDays.find(d => d.value === this.atWeekDay)?.label || ''
        } else if (this.atRepeat === 'month') {
          extra = this.atMonthDay
        }
        return this.t.previewAt(this.atRepeat, extra, this.atHour, this.atMinute)
      } else {
        return this.t.previewEvery(this.everyValue, this.everyUnit)
      }
    },
  },

  watch: {
    cronValue(val) {
      this.$emit('update:modelValue', val)
    },

    // Сброс everyValue если юнит изменился и значение вышло за диапазон
    everyUnit() {
      const max = { minute: 59, hour: 23, day: 30 }[this.everyUnit] || 59
      if (this.everyValue > max) this.everyValue = 1
    },
  },

  mounted() {
    // Если передано начальное значение — пытаемся распарсить
    if (this.modelValue && this.modelValue !== '* * * * *') {
      this.parseCron(this.modelValue)
    }
    // Сразу эмитим начальное значение
    this.$emit('update:modelValue', this.cronValue)
  },

  methods: {
    pad(n) {
      return String(n).padStart(2, '0')
    },

    buildAtCron() {
      const min = this.atMinute
      const hour = this.atHour

      switch (this.atRepeat) {
        case 'minute': return '* * * * *'
        case 'hour':   return `${min} * * * *`
        case 'day':    return `${min} ${hour} * * *`
        case 'week':   return `${min} ${hour} * * ${this.atWeekDay}`
        case 'month':  return `${min} ${hour} ${this.atMonthDay} * *`
        default:       return '* * * * *'
      }
    },

    buildEveryCron() {
      const n = this.everyValue
      switch (this.everyUnit) {
        case 'minute': return `*/${n} * * * *`
        case 'hour':   return `0 */${n} * * *`
        case 'day':    return `0 0 */${n} * *`
        default:       return '* * * * *'
      }
    },

    parseCron(cron) {
      const parts = cron.trim().split(/\s+/)
      if (parts.length !== 5) return

      const [min, hour, dom, , dow] = parts

      // Определяем режим и тип
      if (min.startsWith('*/') || hour.startsWith('*/') || dom.startsWith('*/')) {
        this.mode = 'every'
        if (min.startsWith('*/')) {
          this.everyUnit = 'minute'
          this.everyValue = parseInt(min.slice(2)) || 30
        } else if (hour.startsWith('*/')) {
          this.everyUnit = 'hour'
          this.everyValue = parseInt(hour.slice(2)) || 1
        } else if (dom.startsWith('*/')) {
          this.everyUnit = 'day'
          this.everyValue = parseInt(dom.slice(2)) || 1
        }
        return
      }

      this.mode = 'at'

      if (min === '*' && hour === '*') {
        this.atRepeat = 'minute'
        return
      }

      const parsedMin = parseInt(min)
      const parsedHour = parseInt(hour)

      if (!isNaN(parsedMin)) this.atMinute = parsedMin
      if (!isNaN(parsedHour)) this.atHour = parsedHour

      if (dom !== '*') {
        this.atRepeat = 'month'
        this.atMonthDay = parseInt(dom) || 1
      } else if (dow !== '*') {
        this.atRepeat = 'week'
        this.atWeekDay = parseInt(dow) || 1
      } else if (hour !== '*') {
        this.atRepeat = 'day'
      } else {
        this.atRepeat = 'hour'
      }
    },
  },
}
</script>

<style>
/* ─── CSS-переменные для кастомизации ─────────────────────────── */
:root {
  --eea-cron-font-family: inherit;
  --eea-cron-font-size: 14px;
  --eea-cron-color: #303133;
  --eea-cron-bg: #ffffff;
  --eea-cron-border: #dcdfe6;
  --eea-cron-border-radius: 6px;
  --eea-cron-primary: #409eff;
  --eea-cron-primary-hover: #337ecc;
  --eea-cron-preview-bg: #f4f4f5;
  --eea-cron-preview-color: #606266;
  --eea-cron-code-color: #409eff;
  --eea-cron-gap: 10px;
  --eea-cron-padding: 16px;
}

/* ─── Корневой элемент ─────────────────────────────────────────── */
.eea-cron-picker {
  font-family: var(--eea-cron-font-family);
  font-size: var(--eea-cron-font-size);
  color: var(--eea-cron-color);
  background: var(--eea-cron-bg);
  border: 1px solid var(--eea-cron-border);
  border-radius: var(--eea-cron-border-radius);
  padding: var(--eea-cron-padding);
  display: inline-flex;
  flex-direction: column;
  gap: var(--eea-cron-gap);
  min-width: 320px;
}

/* ─── Переключатель режимов ────────────────────────────────────── */
.eea-cron-picker__modes {
  display: flex;
  gap: 20px;
}

.eea-cron-picker__mode-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}

.eea-cron-picker__mode-label input[type="radio"] {
  accent-color: var(--eea-cron-primary);
  cursor: pointer;
  width: 16px;
  height: 16px;
}

/* ─── Секция полей ─────────────────────────────────────────────── */
.eea-cron-picker__section {
  display: flex;
  flex-direction: column;
  gap: var(--eea-cron-gap);
}

/* ─── Строка поля ──────────────────────────────────────────────── */
.eea-cron-picker__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.eea-cron-picker__field-label {
  min-width: 110px;
  color: var(--eea-cron-preview-color);
}

/* ─── Селект ───────────────────────────────────────────────────── */
.eea-cron-picker__select {
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--eea-cron-bg);
  border: 1px solid var(--eea-cron-border);
  border-radius: var(--eea-cron-border-radius);
  color: var(--eea-cron-color);
  font-size: var(--eea-cron-font-size);
  font-family: var(--eea-cron-font-family);
  padding: 5px 28px 5px 10px;
  cursor: pointer;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23909399' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  transition: border-color 0.2s;
}

.eea-cron-picker__select:hover {
  border-color: var(--eea-cron-primary);
}

.eea-cron-picker__select:focus {
  border-color: var(--eea-cron-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--eea-cron-primary) 20%, transparent);
}

.eea-cron-picker__select--time {
  width: 70px;
}

/* ─── Двоеточие между часами и минутами ───────────────────────── */
.eea-cron-picker__colon {
  font-weight: 600;
  color: var(--eea-cron-preview-color);
}

/* ─── Превью ───────────────────────────────────────────────────── */
.eea-cron-picker__preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--eea-cron-preview-bg);
  border-radius: var(--eea-cron-border-radius);
  padding: 8px 12px;
  margin-top: 4px;
}

.eea-cron-picker__preview-text {
  color: var(--eea-cron-preview-color);
  font-size: calc(var(--eea-cron-font-size) - 1px);
}

.eea-cron-picker__result {
  font-family: monospace;
  font-size: var(--eea-cron-font-size);
  color: var(--eea-cron-code-color);
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
</style>
