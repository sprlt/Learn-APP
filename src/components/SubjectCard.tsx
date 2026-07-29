import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Globe, Clock, Scale, Brain, TrendingUp } from 'lucide-react'
import { Subject } from '../types'
import { useClickSound } from '../hooks/useClickSound'

const iconMap: Record<string, React.ElementType> = {
  Greek: () => <span className='text-2xl'>Ω</span>,
  Globe,
  Clock,
  Scale,
  Brain,
  TrendingUp,
  BookOpen,
}

interface Props {
  subject: Subject
  index: number
}

export default function SubjectCard({ subject, index }: Props) {
  const playClick = useClickSound()
  const Icon = iconMap[subject.icon] || BookOpen

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link
        to={'/subject/' + subject.id}
        onClick={playClick}
        className='group block p-6 bg-white rounded-2xl card-shadow hover:card-shadow-hover transition-all duration-300 border border-learn-200 hover:border-learn-300'
      >
        <div className='flex items-start gap-4'>
          <div 
            className='w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold'
            style={{ backgroundColor: subject.color }}
          >
            <Icon />
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-lg text-learn-800 group-hover:text-learn-700'>
              {subject.name}
            </h3>
            <p className='text-sm text-learn-500 mt-1 leading-relaxed'>
              {subject.description}
            </p>
            {subject.categories.length > 0 && (
              <p className='text-xs text-learn-400 mt-3'>
                {subject.categories.length} categorie{subject.categories.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
