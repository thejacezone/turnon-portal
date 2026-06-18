import { useState } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { laborConditions, laborRules } from '../data/laborRules.js'
import { calculateLaborHours, emptyLaborResult } from '../utils/laborCalculator.js'

export default function Calculators() {
  const [salary, setSalary] = useState('')
  const [hours, setHours] = useState('')
  const [conditionId, setConditionId] = useState(laborConditions[0].id)
  const result = salary && hours ? calculateLaborHours({ salary, hours, conditionId }) : emptyLaborResult(conditionId)
  const clear = () => { setSalary(''); setHours(''); setConditionId(laborConditions[0].id) }
  return (
    <>
      <PageHeader eyebrow="Calculadoras laborales" title="Sacá cuentas antes de quedarte con la duda" description="Estimaciones claras para entender mejor tus horas y revisar tus números con información oficial." />
      <CalculatorCard title="Calculadora de horas laborales" description="Ingresá tu salario, horas y condición. Los multiplicadores son orientativos y no reemplazan un cálculo oficial.">
        <div className="form-grid"><label>Salario base mensual<input type="number" min="0" value={salary} onChange={(event) => setSalary(event.target.value)} placeholder="Ej. 5000" /></label><label>Cantidad de horas trabajadas<input type="number" min="0" value={hours} onChange={(event) => setHours(event.target.value)} placeholder="Ej. 8" /></label><label className="full-field">Condición de las horas<select value={conditionId} onChange={(event) => setConditionId(event.target.value)}>{laborConditions.map((condition) => <option key={condition.id} value={condition.id}>{condition.label}</option>)}</select></label></div>
        <dl className="calculation-results"><div><dt>Salario base mensual</dt><dd>Q {result.salary.toFixed(2)}</dd></div><div><dt>Valor estimado de hora base</dt><dd>Q {result.hourlyRate.toFixed(2)}</dd></div><div><dt>Condición</dt><dd>{result.condition}</dd></div><div><dt>Multiplicador aplicado</dt><dd>{result.multiplier}×</dd></div><div><dt>Cantidad de horas</dt><dd>{result.hours}</dd></div><div className="total"><dt>Total estimado</dt><dd>Q {result.total.toFixed(2)}</dd></div></dl>
        <button className="button ghost dark-ghost" type="button" onClick={clear}>Limpiar campos</button>
      </CalculatorCard>
      <aside className="official-note"><strong>Importante</strong><p>{laborRules.disclaimer}</p></aside>
    </>
  )
}
