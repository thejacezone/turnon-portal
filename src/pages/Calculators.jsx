import { useState } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { laborConditions, laborRules } from '../data/laborRules.js'
import { calculateLaborHours, emptyLaborResult, formatUSD, validateLaborInputs } from '../utils/laborCalculator.js'

export default function Calculators() {
  const [salary, setSalary] = useState('')
  const [hours, setHours] = useState('')
  const [conditionId, setConditionId] = useState(laborConditions[0].id)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(emptyLaborResult(laborConditions[0].id))
  const updateSalary = (value) => { setSalary(value); if (Number(value) > 0) setErrors((current) => ({ ...current, salary: undefined })) }
  const updateHours = (value) => { setHours(value); if (Number(value) > 0) setErrors((current) => ({ ...current, hours: undefined })) }
  const calculate = (event) => {
    event.preventDefault()
    const nextErrors = validateLaborInputs({ salary, hours })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setResult(calculateLaborHours({ salary, hours, conditionId }))
  }
  const clear = () => { setSalary(''); setHours(''); setConditionId(laborConditions[0].id); setErrors({}); setResult(emptyLaborResult(laborConditions[0].id)) }
  return (
    <>
      <PageHeader eyebrow="Calculadoras laborales" title="Sacá cuentas antes de quedarte con la duda" description="Estimaciones claras para entender mejor tus horas y revisar tus números con información oficial." />
      <CalculatorCard title="Calculadora de horas laborales" description="Ingresá tu salario mensual, seleccioná el tipo de hora trabajada y la cantidad de horas. La herramienta estimará cuánto valen esas horas según el multiplicador seleccionado.">
        <form onSubmit={calculate} noValidate>
          <div className="form-grid"><label>Salario base mensual en dólares<input type="number" min="0" value={salary} onChange={(event) => updateSalary(event.target.value)} placeholder="Ej. 365.00" aria-invalid={Boolean(errors.salary)} />{errors.salary && <span className="field-error">{errors.salary}</span>}</label><label>Cantidad de horas trabajadas<input type="number" min="0" value={hours} onChange={(event) => updateHours(event.target.value)} placeholder="Ej. 8" aria-invalid={Boolean(errors.hours)} />{errors.hours && <span className="field-error">{errors.hours}</span>}</label><label className="full-field">Condición de las horas<select value={conditionId} onChange={(event) => setConditionId(event.target.value)}>{laborConditions.map((condition) => <option key={condition.id} value={condition.id}>{condition.label}</option>)}</select></label></div>
          <div className="calculator-actions"><button className="button" type="submit">Calcular</button><button className="button ghost dark-ghost" type="button" onClick={clear}>Limpiar</button></div>
        </form>
        <dl className="calculation-results"><div><dt>Salario mensual ingresado</dt><dd>{formatUSD(result.salary)}</dd></div><div><dt>Valor estimado de la hora base</dt><dd>{formatUSD(result.hourlyRate)}</dd></div><div><dt>Condición seleccionada</dt><dd>{result.condition}</dd></div><div><dt>Multiplicador aplicado</dt><dd>{result.multiplier}×</dd></div><div><dt>Cantidad de horas</dt><dd>{result.hours}</dd></div><div className="total"><dt>Total estimado por esas horas</dt><dd>{formatUSD(result.total)}</dd></div></dl>
      </CalculatorCard>
      <aside className="official-note"><strong>Importante</strong><p>{laborRules.disclaimer}</p></aside>
    </>
  )
}
