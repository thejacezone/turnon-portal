import { laborConditions, laborRules } from '../data/laborRules.js'

function safeNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

export function validateLaborInputs({ salary, hours }) {
  const errors = {}
  if (!String(salary).trim() || Number(salary) <= 0) errors.salary = 'Ingresá un salario mensual mayor que $0.'
  if (!String(hours).trim() || Number(hours) <= 0) errors.hours = 'Ingresá una cantidad de horas mayor que 0.'
  return errors
}

export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.max(0, Number(value) || 0))
}

export function emptyLaborResult(conditionId) {
  const condition = laborConditions.find((item) => item.id === conditionId) || laborConditions[0]
  return { salary: 0, hourlyRate: 0, condition: condition.label, multiplier: condition.multiplier, hours: 0, total: 0 }
}

export function calculateLaborHours({ salary, hours, conditionId }) {
  const result = emptyLaborResult(conditionId)
  result.salary = safeNumber(salary)
  result.hours = safeNumber(hours)
  result.hourlyRate = result.salary / laborRules.monthlyBaseHours
  result.total = result.hourlyRate * result.multiplier * result.hours
  return result
}
