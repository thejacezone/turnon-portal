import { laborConditions } from '../data/laborRules.js'
import { formatMultiplier, formatUSD } from '../utils/laborCalculator.js'

export default function LaborCalculatorRows({
  lines,
  calculatedLines,
  salary,
  dailySalary,
  dailyHours,
  hourlyRate,
  errors,
  onChange,
  onRemove,
}) {
  const completedLines = calculatedLines.filter((line) => line.hours > 0)

  return (
    <>
      <div className="labor-lines">
        <div className="labor-table-header" aria-hidden="true">
          <span>Condición</span>
          <span>Horas</span>
          <span>Multiplicador</span>
          <span>Total</span>
          <span></span>
        </div>
        {lines.map((line, index) => {
          const calculated = calculatedLines[index]
          const errorId = `labor-hours-error-${line.id}`
          const selectedCondition = laborConditions.find((condition) => condition.id === line.conditionId) || laborConditions[0]

          return (
            <div className="labor-line" key={line.id}>
              <label>
                <span className="mobile-label">Condición</span>
                <select
                  value={line.conditionId}
                  onChange={(event) => onChange(line.id, 'conditionId', event.target.value)}
                  title={selectedCondition.description}
                  aria-label={`Condición ${index + 1}`}
                >
                  {laborConditions.map((condition) => (
                    <option key={condition.id} value={condition.id}>{condition.label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mobile-label">Horas</span>
                <input
                  type="number"
                  min="0"
                  step="0.25"
                  value={line.hours}
                  onChange={(event) => onChange(line.id, 'hours', event.target.value)}
                  placeholder="0"
                  aria-label={`Horas de la condición ${index + 1}`}
                  aria-invalid={Boolean(errors[line.id])}
                  aria-describedby={errors[line.id] ? errorId : undefined}
                />
                {errors[line.id] && <small className="field-error" id={errorId}>{errors[line.id]}</small>}
              </label>
              <span><span className="mobile-label">Multiplicador</span>{formatMultiplier(calculated?.multiplier || 1)}</span>
              <strong><span className="mobile-label">Total</span>{formatUSD(calculated?.total || 0)}</strong>
              <button
                className="remove-line"
                type="button"
                onClick={() => onRemove(line.id)}
                disabled={lines.length === 1}
                aria-label={`Eliminar condición ${index + 1}`}
              >×</button>
            </div>
          )
        })}
      </div>

      <section className="labor-breakdown" aria-labelledby="labor-breakdown-title">
        <h3 id="labor-breakdown-title">Así se hizo el cálculo</h3>
        {completedLines.length ? completedLines.map((line, index) => (
          <article key={line.id} className="labor-breakdown-card">
            <h4>{line.hours} {line.hours === 1 ? 'hora' : 'horas'} · {line.condition}</h4>
            <dl>
              <div><dt>Salario mensual</dt><dd>{formatUSD(salary)}</dd></div>
              <div><dt>Salario diario estimado</dt><dd>{formatUSD(dailySalary)}</dd></div>
              <div><dt>Jornada ordinaria diaria</dt><dd>{dailyHours} {dailyHours === 1 ? 'hora' : 'horas'}</dd></div>
              <div><dt>Valor hora base</dt><dd>{formatUSD(hourlyRate)}</dd></div>
              <div><dt>Multiplicador</dt><dd>{formatMultiplier(line.multiplier)}</dd></div>
              <div><dt>Valor de hora estimado</dt><dd>{formatUSD(line.unitValue)}</dd></div>
              <div className="is-total"><dt>Total condición {index + 1}</dt><dd>{formatUSD(line.total)}</dd></div>
            </dl>
          </article>
        )) : <p className="labor-breakdown-empty">Agregá horas para ver aquí el cálculo individual de cada condición.</p>}
      </section>
    </>
  )
}
