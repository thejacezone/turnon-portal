const levels = ['Todos', 'A1', 'A2', 'B1', 'B2', 'C1']
const contexts = ['Todos', 'entrevista', 'customer service', 'oficina', 'training', 'general']

export default function PracticeFilters({ filters, topics, onChange }) {
  return (
    <section className="practice-filters" aria-label="Filtros de Grammar Practice">
      <label>
        Nivel
        <select value={filters.level} onChange={(event) => onChange('level', event.target.value)}>
          {levels.map((level) => <option key={level} value={level}>{level}</option>)}
        </select>
      </label>
      <label>
        Tema
        <select value={filters.topic} onChange={(event) => onChange('topic', event.target.value)}>
          <option value="Todos">Todos</option>
          {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
        </select>
      </label>
      <label>
        Contexto
        <select value={filters.context} onChange={(event) => onChange('context', event.target.value)}>
          {contexts.map((context) => <option key={context} value={context}>{context}</option>)}
        </select>
      </label>
    </section>
  )
}
