import { Link } from 'react-router-dom'
import TypingTestFeature from '../features/typing-test/index.js'
import '../features/typing-test/styles/typingTest.css'

export default function TypingTestPage() {
  return (
    <div className="typing-test-portal-page">
      <div className="typing-test-portal-links" role="navigation" aria-label="Typing Test navigation">
        <Link className="back-link" to="/work-english-test">← Back to Tests</Link>
        <Link className="back-link" to="/">Back to TurnOn Home</Link>
      </div>
      <TypingTestFeature />
    </div>
  )
}
