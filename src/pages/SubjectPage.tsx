import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock } from 'lucide-react'
import Header from '../components/Header'
import { subjects } from '../data/subjects'
import { useClickSound } from '../hooks/useClickSound'

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const playClick = useClickSound()
  const subject = subjects.find(s => s.id === subjectId)
  if (!subject) return <div>Matiere non trouvee</div>

  return (
    <div className='min-h-screen'>
      <Header />
      <main className='max-w-4xl mx-auto px-6 py-8'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mb-8'>
          <Link to='/' onClick={playClick} className='inline-flex items-center gap-2 text-learn-500 hover:text-learn-700 transition-colors mb-4'>
            <ArrowLeft className='w-4 h-4' />
            <span className='text-sm'>Retour</span>
          </Link>
          <h1 className='font-display text-3xl font-bold text-learn-900'>{subject.name}</h1>
          <p className='text-learn-500 mt-2'>{subject.description}</p>
        </motion.div>

        {subject.categories.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {subject.categories.map((category, index) => (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link to={'/study/' + subject.id + '/' + category.id} onClick={playClick}
                  className='block p-6 bg-white rounded-2xl card-shadow hover:card-shadow-hover transition-all border border-learn-200 hover:border-learn-300'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='font-semibold text-lg text-learn-800'>{category.name}</h3>
                      <p className='text-sm text-learn-500 mt-1'>{category.description}</p>
                      <p className='text-xs text-learn-400 mt-3'>{category.cardCount} cartes</p>
                    </div>
                    <div className='w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-semibold' style={{ backgroundColor: subject.color }}>
                      {category.cardCount}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <Lock className='w-12 h-12 text-learn-300 mx-auto mb-4' />
            <p className='text-learn-500'>Cette matiere sera bientot disponible</p>
          </div>
        )}
      </main>
    </div>
  )
}
