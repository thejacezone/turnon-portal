import {
  journeyTypes,
  laborConditions,
  laborRules,
  weeklyScheduleOptions,
} from '../data/laborRules.js'

function safeNonNegativeNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function isPositiveFinite(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0
}

export function resolveWeeklyHours(scheduleId, customWeeklyHours = '') {
  if (scheduleId === 'custom') return safeNonNegativeNumber(customWeeklyHours)
  return weeklyScheduleOptions.find((option) => option.id === scheduleId)?.hours || 0
}

export function calculateEstimatedDailySalary(salary) {
  const safeSalary = safeNonNegativeNumber(salary)
  if (!safeSalary) return 0
  return safeSalary / laborRules.daysInMonthlyPeriod
}

export function calculateBaseHourlyRate(salary, dailyHours) {
  const dailySalary = calculateEstimatedDailySalary(salary)
  const safeDailyHours = safeNonNegativeNumber(dailyHours)
  if (!dailySalary || !safeDailyHours) return 0
  const rate = dailySalary / safeDailyHours
  return Number.isFinite(rate) ? rate : 0
}

export function formatUSD(value) {
  const safeValue = safeNonNegativeNumber(value)
  const roundedValue = Math.round((safeValue + 1e-9) * 100) / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: laborRules.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedValue)
}

export function formatMultiplier(value) {
  return `${Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })}×`
}

export function calculateLaborHours({ salary, weeklyHours, dailyHours, hours, conditionId }) {
  const condition = laborConditions.find((item) => item.id === conditionId) || laborConditions[0]
  const dailySalary = calculateEstimatedDailySalary(salary)
  const hourlyRate = calculateBaseHourlyRate(salary, dailyHours)
  const safeHours = safeNonNegativeNumber(hours)
  const unitValue = hourlyRate * condition.multiplier
  return {
    salary: safeNonNegativeNumber(salary),
    weeklyHours: safeNonNegativeNumber(weeklyHours),
    dailyHours: safeNonNegativeNumber(dailyHours),
    dailySalary,
    hourlyRate,
    condition: condition.label,
    multiplier: condition.multiplier,
    hours: safeHours,
    unitValue,
    total: unitValue * safeHours,
  }
}

export function calculateLaborLines({ salary, weeklyHours, dailyHours, lines }) {
  const safeSalary = safeNonNegativeNumber(salary)
  const safeWeeklyHours = safeNonNegativeNumber(weeklyHours)
  const safeDailyHours = safeNonNegativeNumber(dailyHours)
  const dailySalary = calculateEstimatedDailySalary(safeSalary)
  const hourlyRate = calculateBaseHourlyRate(safeSalary, safeDailyHours)
  const calculatedLines = lines.map((line) => {
    const condition = laborConditions.find((item) => item.id === line.conditionId) || laborConditions[0]
    const hours = safeNonNegativeNumber(line.hours)
    const unitValue = hourlyRate * condition.multiplier
    return {
      ...line,
      condition: condition.label,
      description: condition.description,
      multiplier: condition.multiplier,
      hours,
      unitValue,
      total: unitValue * hours,
    }
  })

  const estimatedValues = laborConditions.map((condition) => ({
    ...condition,
    value: hourlyRate * condition.multiplier,
  }))

  return {
    salary: safeSalary,
    weeklyHours: safeWeeklyHours,
    dailyHours: safeDailyHours,
    dailySalary,
    hourlyRate,
    lines: calculatedLines,
    estimatedValues,
    grandTotal: calculatedLines.reduce((sum, line) => sum + line.total, 0),
  }
}

export function validateLaborCalculator({ salary, scheduleId, customWeeklyHours, dailyHours, journeyType, lines }) {
  const errors = { lines: {} }
  const numericSalary = Number(salary)

  if (!String(salary).trim()) errors.salary = 'Ingresá tu salario base mensual.'
  else if (!Number.isFinite(numericSalary) || numericSalary <= 0) errors.salary = 'Ingresá un salario mensual mayor que $0.'

  const scheduleIsValid = weeklyScheduleOptions.some((option) => option.id === scheduleId)
  if (!scheduleIsValid) errors.schedule = 'Seleccioná las horas ordinarias contratadas por semana.'

  if (scheduleId === 'custom') {
    if (!String(customWeeklyHours).trim()) errors.customWeeklyHours = 'Ingresá tu jornada semanal personalizada.'
    else if (!isPositiveFinite(customWeeklyHours) || Number(customWeeklyHours) > laborRules.maxWeeklyHours) {
      errors.customWeeklyHours = `Ingresá un valor mayor que 0 y de hasta ${laborRules.maxWeeklyHours} horas.`
    }
  }

  if (!String(dailyHours).trim()) errors.dailyHours = 'Ingresá las horas ordinarias de tu jornada diaria.'
  else if (!isPositiveFinite(dailyHours) || Number(dailyHours) > laborRules.maxDailyHours) {
    errors.dailyHours = `Ingresá un valor mayor que 0 y de hasta ${laborRules.maxDailyHours} horas.`
  }

  if (!journeyTypes.some((journey) => journey.id === journeyType)) {
    errors.journeyType = 'Seleccioná tu tipo de jornada principal.'
  }

  lines.forEach((line) => {
    const numericHours = Number(line.hours)
    if (!String(line.hours).trim()) errors.lines[line.id] = 'Ingresá la cantidad de horas.'
    else if (!Number.isFinite(numericHours) || numericHours <= 0 || numericHours > laborRules.maxConditionHours) {
      errors.lines[line.id] = `Ingresá un valor mayor que 0 y de hasta ${laborRules.maxConditionHours} horas.`
    }
  })

  errors.valid = !errors.salary
    && !errors.schedule
    && !errors.customWeeklyHours
    && !errors.dailyHours
    && !errors.journeyType
    && Object.keys(errors.lines).length === 0

  return errors
}
