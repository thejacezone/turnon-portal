import { Link, useParams } from 'react-router-dom'
import ChecklistBeforeApplyingArticle from '../components/resources/ChecklistBeforeApplyingArticle.jsx'
import CvTemplateArticle from '../components/resources/CvTemplateArticle.jsx'
import InterviewResourceArticle from '../components/resources/InterviewResourceArticle.jsx'
import InterviewWithoutExperienceArticle from '../components/resources/InterviewWithoutExperienceArticle.jsx'
import InterviewWithExperienceArticle from '../components/resources/InterviewWithExperienceArticle.jsx'
import SpeakingToolkitArticle from '../components/resources/SpeakingToolkitArticle.jsx'
import interviewResourceArticles from '../data/interviewResourceArticles.json' with { type: 'json' }
import { interviewWithoutExperienceArticle } from '../data/interviewWithoutExperienceArticle.js'
import { interviewWithExperienceArticle } from '../data/interviewWithExperienceArticle.js'
import { speakingToolkitArticle } from '../data/speakingToolkitArticle.js'
import { resources } from '../data/resources.js'

export default function ResourceDetail() {
  const { id } = useParams()
  const resource = resources.find((item) => item.id === id)
  if (!resource) return <section className="detail-page"><h1>Recurso no encontrado</h1><Link className="button" to="/recursos">Volver a recursos</Link></section>
  if (resource.articleType === 'application-checklist') return <ChecklistBeforeApplyingArticle />
  if (resource.articleType === 'cv-template') return <CvTemplateArticle resource={resource} />
  if (resource.articleType === 'interview-guide') return <InterviewResourceArticle article={interviewResourceArticles[resource.id]} resource={resource} />
  if (resource.articleType === 'interview-no-experience') return <InterviewWithoutExperienceArticle article={interviewWithoutExperienceArticle} resource={resource} />
  if (resource.articleType === 'interview-with-experience') return <InterviewWithExperienceArticle article={interviewWithExperienceArticle} resource={resource} />
  if (resource.articleType === 'speaking-toolkit') return <SpeakingToolkitArticle article={speakingToolkitArticle} resource={resource} />
  return <article className="detail-page"><Link className="back-link" to="/recursos">← Volver a recursos</Link><header><span className="eyebrow">{resource.category} · {resource.type}</span><h1>{resource.title}</h1><p>{resource.content}</p><span className={`status ${resource.status === 'disponible' ? 'available' : ''}`}>{resource.status === 'disponible' ? 'Disponible' : 'Próximamente'}</span></header><div className="detail-sections">{resource.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>{resource.commonErrors.length > 0 && <section className="common-errors"><h2>Errores comunes</h2><ul>{resource.commonErrors.map((error) => <li key={error}>{error}</li>)}</ul></section>}<aside className="recommendation"><strong>Recomendación final</strong><p>{resource.recommendation}</p></aside></article>
}
