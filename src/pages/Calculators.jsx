import { useId, useMemo, useState } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import LaborCalculatorRows from '../components/LaborCalculatorRows.jsx'
import PageHeader from '../components/PageHeader.jsx'
import {
  journeyTypes,
  laborConditions,
  laborRules,
  weeklyScheduleOptions,
} from '../data/laborRules.js'
import {
  calculateLaborLines,
  formatMultiplier,
  formatUSD,
  resolveWeeklyHours,
  validateLaborCalculator,
} from '../utils/laborCalculator.js'

const newLine = () => ({ id: crypto.randomUUID(), conditionId: laborConditions[0].id, hours: '' })

function formatWeeklyHours(value) {
  return Number(value).toLocaleString('es-SV', { maximumFractionDigits: 2 })
}

export default function Calculators() {
  const salaryErrorId = useId()
  const scheduleErrorId = useId()
  const customHoursErrorId = useId()
  const dailyHoursErrorId = useId()
  const journeyErrorId = useId()
  const [salary, setSalary] = useState('')
  const [scheduleId, setScheduleId] = useState('')
  const [customWeeklyHours, setCustomWeeklyHours] = useState('')
  const [dailyHours, setDailyHours] = useState('')
  const [journeyType, setJourneyType] = useState('')
  const [lines, setLines] = useState([newLine()])
  const [errors, setErrors] = useState({ lines: {} })
  const [reviewMessage, setReviewMessage] = useState('')

  const weeklyHours = useMemo(
    () => resolveWeeklyHours(scheduleId, customWeeklyHours),
    [scheduleId, customWeeklyHours],
  )
  const result = useMemo(
    () => calculateLaborLines({ salary, weeklyHours, dailyHours, lines }),
    [salary, weeklyHours, dailyHours, lines],
  )
  const updateLine = (id, field, value) => {
    setLines((current) => current.map((line) => line.id === id ? { ...line, [field]: value } : line))
    setReviewMessage('')
    if (field === 'hours' && Number(value) > 0) {
      setErrors((current) => ({ ...current, lines: { ...current.lines, [id]: undefined } }))
    }
  }

  const review = () => {
    const nextErrors = validateLaborCalculator({
      salary,
      scheduleId,
      customWeeklyHours,
      dailyHours,
      journeyType,
      lines,
    })
    setErrors(nextErrors)
    setReviewMessage(nextErrors.valid
      ? 'Los datos están completos. Revisá el detalle y el total estimado.'
      : 'Revisá los campos marcados antes de utilizar el total.')
  }

  const removeLine = (id) => {
    setLines((current) => current.filter((line) => line.id !== id))
    setErrors((current) => {
      const lineErrors = { ...current.lines }
      delete lineErrors[id]
      return { ...current, lines: lineErrors }
    })
    setReviewMessage('')
  }

  const clear = () => {
    setSalary('')
    setScheduleId('')
    setCustomWeeklyHours('')
    setDailyHours('')
    setJourneyType('')
    setLines([newLine()])
    setErrors({ lines: {} })
    setReviewMessage('')
  }

  return (
    <div className="portal-page calculators-page">
      <PageHeader
        eyebrow="TurnOn / Calculadora laboral"
        title="Calculá tus horas sin enredos"
        description="Estimá valores laborales de forma clara y revisá cada condición con una estructura fácil de entender."
      />

      <section className="calculator-tool-section page-section" aria-label="Calculadora de horas laborales">
        <CalculatorCard
          title="Calculadora de horas laborales"
          description="Ingresá tu salario, jornada semanal y las condiciones trabajadas. La herramienta mostrará una estimación orientativa y el detalle de cada cálculo."
        >
          <div className="calculator-primary-fields">
            <label className="salary-field">
              Salario base mensual
              <input
                type="number"
                min="0"
                step="0.01"
                value={salary}
                onChange={(event) => {
                  setSalary(event.target.value)
                  setReviewMessage('')
                  if (Number(event.target.value) > 0) setErrors((current) => ({ ...current, salary: undefined }))
                }}
                placeholder="Ej. 477.00"
                aria-invalid={Boolean(errors.salary)}
                aria-describedby={errors.salary ? salaryErrorId : undefined}
              />
              {errors.salary && <span className="field-error" id={salaryErrorId}>{errors.salary}</span>}
            </label>

            <label>
              Horas ordinarias contratadas por semana
              <select
                value={scheduleId}
                onChange={(event) => {
                  const nextScheduleId = event.target.value
                  setScheduleId(nextScheduleId)
                  if (!dailyHours) {
                    if (nextScheduleId === '30') setDailyHours('6')
                    else if (nextScheduleId === '40') setDailyHours('8')
                  }
                  setReviewMessage('')
                  setErrors((current) => ({ ...current, schedule: undefined, customWeeklyHours: undefined }))
                }}
                aria-invalid={Boolean(errors.schedule)}
                aria-describedby={errors.schedule ? scheduleErrorId : undefined}
              >
                <option value="">Seleccioná tu jornada</option>
                {weeklyScheduleOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
              </select>
              {errors.schedule && <span className="field-error" id={scheduleErrorId}>{errors.schedule}</span>}
            </label>

            {scheduleId === 'custom' && (
              <label>
                Horas semanales personalizadas
                <input
                  type="number"
                  min="0"
                  max={laborRules.maxWeeklyHours}
                  step="0.25"
                  value={customWeeklyHours}
                  onChange={(event) => {
                    setCustomWeeklyHours(event.target.value)
                    setReviewMessage('')
                    if (Number(event.target.value) > 0) setErrors((current) => ({ ...current, customWeeklyHours: undefined }))
                  }}
                  placeholder="Ej. 36"
                  aria-invalid={Boolean(errors.customWeeklyHours)}
                  aria-describedby={errors.customWeeklyHours ? customHoursErrorId : undefined}
                />
                {errors.customWeeklyHours && <span className="field-error" id={customHoursErrorId}>{errors.customWeeklyHours}</span>}
              </label>
            )}

            <label>
              Horas ordinarias por día
              <input
                type="number"
                min="0"
                max={laborRules.maxDailyHours}
                step="0.25"
                value={dailyHours}
                onChange={(event) => {
                  setDailyHours(event.target.value)
                  setReviewMessage('')
                  if (Number(event.target.value) > 0) setErrors((current) => ({ ...current, dailyHours: undefined }))
                }}
                placeholder={scheduleId === '44' ? 'Ingresá según tu horario' : 'Ej. 8'}
                aria-invalid={Boolean(errors.dailyHours)}
                aria-describedby={errors.dailyHours ? dailyHoursErrorId : undefined}
              />
              <small>Editable: usá las horas de tu jornada ordinaria diaria real.</small>
              {errors.dailyHours && <span className="field-error" id={dailyHoursErrorId}>{errors.dailyHours}</span>}
            </label>

            <label>
              Tipo de jornada principal
              <select
                value={journeyType}
                onChange={(event) => {
                  setJourneyType(event.target.value)
                  setReviewMessage('')
                  setErrors((current) => ({ ...current, journeyType: undefined }))
                }}
                aria-invalid={Boolean(errors.journeyType)}
                aria-describedby={errors.journeyType ? journeyErrorId : undefined}
              >
                <option value="">Seleccioná el tipo</option>
                {journeyTypes.map((journey) => <option key={journey.id} value={journey.id}>{journey.label}</option>)}
              </select>
              {errors.journeyType && <span className="field-error" id={journeyErrorId}>{errors.journeyType}</span>}
            </label>
          </div>
          <p className="journey-context-note">Las horas semanales dan contexto a tu jornada, pero la tarifa se calcula con las horas ordinarias por día. El tipo de jornada tampoco aplica recargos automáticamente: elegí manualmente la condición que querés estimar.</p>

          <div className="calculator-summary" aria-label="Resumen de datos">
            <div><span>Salario base mensual</span><strong>{formatUSD(result.salary)}</strong></div>
            <div><span>Jornada semanal indicada</span><strong>{weeklyHours ? `${formatWeeklyHours(weeklyHours)} h/semana` : '0 h/semana'}</strong></div>
            <div><span>Jornada ordinaria diaria</span><strong>{result.dailyHours ? `${formatWeeklyHours(result.dailyHours)} h/día` : '0 h/día'}</strong></div>
            <div><span>Valor estimado de hora base</span><strong>{formatUSD(result.hourlyRate)}</strong></div>
          </div>

          <LaborCalculatorRows
            lines={lines}
            calculatedLines={result.lines}
            salary={result.salary}
            dailySalary={result.dailySalary}
            dailyHours={result.dailyHours}
            hourlyRate={result.hourlyRate}
            errors={errors.lines || {}}
            onChange={updateLine}
            onRemove={removeLine}
          />

          <aside className="additional-hours-note" aria-label="Información sobre la hora adicional">
            <strong>ⓘ Sobre la hora adicional</strong>
            <p>{laborRules.additionalHoursNote}</p>
          </aside>

          <div className="calculator-total"><span>Total general</span><strong>{formatUSD(result.grandTotal)}</strong></div>
          <div className="calculator-actions">
            <button className="button" type="button" onClick={() => { setLines((current) => [...current, newLine()]); setReviewMessage('') }}>Agregar otra condición</button>
            <button className="button ghost dark-ghost" type="button" onClick={review}>Revisar datos</button>
            <button className="button ghost dark-ghost" type="button" onClick={clear}>Limpiar todo</button>
          </div>
          {reviewMessage && <p className={`calculator-review-message${errors.valid ? ' is-valid' : ''}`} role="status">{reviewMessage}</p>}
        </CalculatorCard>

        <section className="estimated-values-section" aria-labelledby="estimated-values-title">
          <div className="estimated-values-heading">
            <span className="eyebrow">Referencia dinámica</span>
            <h2 id="estimated-values-title">Tus valores estimados</h2>
            <p>Se actualizan automáticamente cuando cambiás el salario o la jornada semanal.</p>
          </div>
          <table className="estimated-values-table">
            <thead><tr><th>Tipo de hora</th><th>Multiplicador</th><th>Valor estimado</th></tr></thead>
            <tbody>
              {result.estimatedValues.map((condition) => (
                <tr key={condition.id}>
                  <th scope="row">{condition.tableLabel}</th>
                  <td data-label="Multiplicador">{formatMultiplier(condition.multiplier)}</td>
                  <td data-label="Valor estimado">{formatUSD(condition.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="labor-method-section" aria-labelledby="labor-method-title">
          <span className="eyebrow">Metodología orientativa</span>
          <h2 id="labor-method-title">¿Cómo se calcula?</h2>
          <p>{laborRules.hourlyMethodNote}</p>
          <p>{laborRules.scheduleDistributionNote} {laborRules.generalReference}</p>
          <p className="labor-method-legal-reference">{laborRules.legalReference}</p>
          <aside className="labor-method-callout">
            <strong>Sobre la clasificación “hora adicional”</strong>
            <p>“Hora adicional” no es una clasificación universal. Algunas empresas utilizan este concepto para determinadas horas trabajadas fuera de la jornada contratada. Consultá tu contrato o planilla para confirmar cómo las calcula tu empleador.</p>
          </aside>
          <p className="labor-method-disclaimer">{laborRules.disclaimer}</p>
        </section>
      </section>
    </div>
  )
}
