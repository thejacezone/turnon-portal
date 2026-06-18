import { useMemo, useState } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import LaborCalculatorRows from '../components/LaborCalculatorRows.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { laborConditions, laborRules } from '../data/laborRules.js'
import { calculateLaborLines, formatUSD, validateLaborLines } from '../utils/laborCalculator.js'

const newLine = () => ({ id: crypto.randomUUID(), conditionId: laborConditions[0].id, hours: '' })

export default function Calculators() {
  const [salary, setSalary] = useState('')
  const [lines, setLines] = useState([newLine()])
  const [errors, setErrors] = useState({ salary: undefined, lines: {} })
  const result = useMemo(() => calculateLaborLines(salary, lines), [salary, lines])
  const updateLine = (id, field, value) => { setLines((current) => current.map((line) => line.id === id ? { ...line, [field]: value } : line)); if (field === 'hours' && Number(value) > 0) setErrors((current) => ({ ...current, lines: { ...current.lines, [id]: undefined } })) }
  const validate = () => setErrors(validateLaborLines(salary, lines))
  const clear = () => { setSalary(''); setLines([newLine()]); setErrors({ salary: undefined, lines: {} }) }
  return <><PageHeader eyebrow="Calculadoras laborales" title="Sacá cuentas antes de quedarte con la duda" description="Sumá varias condiciones trabajadas y revisá cada cálculo por separado." /><CalculatorCard title="Calculadora de horas laborales" description="Ingresá tu salario mensual, agregá una o varias condiciones trabajadas y colocá la cantidad de horas. La herramienta estimará el valor de esas horas usando multiplicadores orientativos."><label className="salary-field">Salario base mensual en dólares<input type="number" min="0" value={salary} onChange={(event) => { setSalary(event.target.value); if (Number(event.target.value) > 0) setErrors((current) => ({ ...current, salary: undefined })) }} placeholder="Ej. 365.00" aria-invalid={Boolean(errors.salary)} />{errors.salary && <span className="field-error">{errors.salary}</span>}</label><div className="calculator-summary"><div><span>Salario base mensual</span><strong>{formatUSD(result.salary)}</strong></div><div><span>Valor estimado de hora base</span><strong>{formatUSD(result.hourlyRate)}</strong></div></div><LaborCalculatorRows lines={lines} calculatedLines={result.lines} errors={errors.lines || {}} onChange={updateLine} onRemove={(id) => setLines((current) => current.filter((line) => line.id !== id))} /><div className="calculator-total"><span>Total general</span><strong>{formatUSD(result.grandTotal)}</strong></div><div className="calculator-actions"><button className="button" type="button" onClick={() => setLines((current) => [...current, newLine()])}>Agregar otra condición</button><button className="button ghost dark-ghost" type="button" onClick={validate}>Revisar datos</button><button className="button ghost dark-ghost" type="button" onClick={clear}>Limpiar todo</button></div></CalculatorCard><aside className="official-note"><strong>Importante</strong><p>{laborRules.disclaimer}</p></aside></>
}
