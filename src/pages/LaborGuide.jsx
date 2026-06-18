import { useMemo, useState } from 'react'
import PageIntro from '../components/PageIntro.jsx'
import { laborRules } from '../data/laborRules.js'
import { estimateBenefits } from '../utils/laborCalculations.js'

export default function LaborGuide() {
  const [salary, setSalary] = useState('')
  const [months, setMonths] = useState('12')
  const estimate = useMemo(() => estimateBenefits(Number(salary), Number(months), laborRules), [salary, months])

  return (
    <>
      <PageIntro eyebrow="Orientación laboral" title="Entiende tus números antes de tomar decisiones" description="Esta estimación educativa utiliza reglas locales visibles en el proyecto. No sustituye asesoría legal o contable profesional." />
      <section className="calculator section-block">
        <div><span className="eyebrow">Calculadora informativa</span><h2>Estimación proporcional</h2><p>Los valores se calculan únicamente en tu sesión actual y no se guardan.</p></div>
        <div className="calculator-panel">
          <label>Salario mensual<input type="number" min="0" value={salary} onChange={(event) => setSalary(event.target.value)} placeholder="Ej. 5000" /></label>
          <label>Meses trabajados<input type="number" min="0" max="12" value={months} onChange={(event) => setMonths(event.target.value)} /></label>
          <dl><div><dt>Bono anual proporcional</dt><dd>Q {estimate.annualBonus.toFixed(2)}</dd></div><div><dt>Bono 14 proporcional</dt><dd>Q {estimate.bonus14.toFixed(2)}</dd></div><div><dt>Vacaciones estimadas</dt><dd>Q {estimate.vacationPay.toFixed(2)}</dd></div></dl>
        </div>
      </section>
      <section className="rules"><h2>Reglas utilizadas</h2>{laborRules.notes.map((note) => <p key={note}>{note}</p>)}</section>
    </>
  )
}
