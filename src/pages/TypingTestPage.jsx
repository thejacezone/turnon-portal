import { Link } from 'react-router-dom'
import PracticeTestHero from '../components/PracticeTestHero.jsx'
import { practicePageHeroes } from '../data/practicePageHeroes.js'
import TypingTestFeature from '../features/typing-test/index.js'
import '../features/typing-test/styles/typingTest.css'

export default function TypingTestPage() {
  return (
    <div className="typing-test-portal-page internal-test-page test-practice-page">
      <PracticeTestHero {...practicePageHeroes.typing} targetId="typing-test-setup" />
      <div className="typing-test-portal-links" role="navigation" aria-label="Typing Test navigation">
        <Link className="back-link" to="/work-english-test">← Back to Tests</Link>
        <Link className="back-link" to="/">Back to TurnOn Home</Link>
      </div>
      <div id="typing-test-setup">
        <TypingTestFeature />
      </div>
    </div>
  )
}
