import { useRef } from 'react'

const grammarTabs = [
  { id: 'lessons', label: 'Lessons' },
  { id: 'practice', label: 'Practice' },
]

export default function GrammarTabs({ activeTab, onChange }) {
  const tabRefs = useRef([])

  const moveFocus = (currentIndex, direction) => {
    const nextIndex = direction === 'first'
      ? 0
      : direction === 'last'
        ? grammarTabs.length - 1
        : (currentIndex + direction + grammarTabs.length) % grammarTabs.length
    const nextTab = grammarTabs[nextIndex]
    tabRefs.current[nextIndex]?.focus()
    onChange(nextTab.id)
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveFocus(index, 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveFocus(index, -1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveFocus(index, 'first')
    } else if (event.key === 'End') {
      event.preventDefault()
      moveFocus(index, 'last')
    }
  }

  return (
    <section className="grammar-learning-tabs-section" aria-label="Grammar learning options">
      <div className="grammar-learning-tabs" role="tablist" aria-label="Lessons and practice">
        {grammarTabs.map((tab, index) => (
          <button
            aria-controls={`grammar-panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            className="grammar-learning-tab"
            id={`grammar-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => { tabRefs.current[index] = element }}
            role="tab"
            tabIndex={activeTab === tab.id ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  )
}
