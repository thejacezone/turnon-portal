import { SearchX } from 'lucide-react'

export default function EmptyState({ title, description }) {
  return <section className="empty-state" role="status"><SearchX aria-hidden="true" /><h2>{title}</h2><p>{description}</p></section>
}
