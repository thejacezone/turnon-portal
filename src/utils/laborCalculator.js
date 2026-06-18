import { laborConditions, laborRules } from '../data/laborRules.js'

function safeNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
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
