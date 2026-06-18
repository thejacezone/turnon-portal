export function estimateBenefits(salary, months, rules) {
  const safeSalary = Number.isFinite(salary) && salary > 0 ? salary : 0
  const safeMonths = Number.isFinite(months) ? Math.min(12, Math.max(0, months)) : 0
  const proportion = safeMonths / 12

  return {
    annualBonus: safeSalary * rules.annualBonusMonths * proportion,
    bonus14: safeSalary * rules.bonus14Months * proportion,
    vacationPay: (safeSalary / rules.daysPerMonth) * rules.vacationDaysPerYear * proportion,
  }
}
