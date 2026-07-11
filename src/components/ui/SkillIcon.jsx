import {
  BookOpenText,
  BriefcaseBusiness,
  Calculator,
  FileText,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Keyboard,
  Languages,
  MessageSquareText,
  SearchCheck,
  Users,
} from 'lucide-react'

const icons = {
  general: GraduationCap,
  work: BriefcaseBusiness,
  grammar: Languages,
  vocabulary: BookOpenText,
  reading: FileText,
  listening: Headphones,
  writing: MessageSquareText,
  typing: Keyboard,
  resources: SearchCheck,
  calculator: Calculator,
  community: Users,
  offers: BriefcaseBusiness,
  interview: HeartHandshake,
}

export default function SkillIcon({ skill, size = 22 }) {
  const Icon = icons[skill] || BookOpenText
  return <span className="skill-icon" aria-hidden="true"><Icon size={size} strokeWidth={2} /></span>
}
