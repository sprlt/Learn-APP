import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play } from 'lucide-react'
import Header from '../components/Header'
import { subjects } from '../data/subjects'
import { useClickSound } from '../hooks/useClickSound'

export default function CategoryPage() {
  const { subjectId, categoryId } = useParams<{ subjectId: string; categoryId: string }>()
  const playClick = useClickSound()
  const subject = subjects.find(s => s.id === subjectId)
  const category = subject?.categories.find(c => c.id === categoryId)
  if (!subject || !category) return <div>Categorie non trouvee</div>

  return (
    <div className='min-h-screen'>
      <Header />
      <main className='max-w-2xl mx-auto px-6 py-8'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mb-8'>
          <Link to={'/subject/' + subjectId} onClick={playClick} className='inline-flex items-center gap-2 text-learn-500 hover:text-learn-700 transition-colors mb-4'>
            <ArrowLeft className='w-4 h-4' />
            <span className='text-sm'>{subject.name}</span>
          </Link>
          <h1 className='font-display text-3xl font-bold text-learn-900'>
            {category.name}
          </h1>
          <p className='text-learn-500 mt-2'>{category.description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to={'/study/' + subjectId + '/' + categoryId} onClick={playClick}
            className='flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-semibold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]'
            style={{ backgroundColor: subject.color }}>
            <Play className='w-5 h-5' />
            Commencer la session
          </Link>
          <p className='text-center text-sm text-learn-400 mt-4'>
            10 cartes selectionnees parmi {category.cardCount}
          </p>
        </motion.div>
      </main>
    </div>
  )
}
