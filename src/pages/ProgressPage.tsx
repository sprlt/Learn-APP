import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import Header from '../components/Header'
import { getStoredData } from '../engine/storage'
import { useClickSound } from '../hooks/useClickSound'

export default function ProgressPage() {
  const playClick = useClickSound()
  const data = getStoredData()

  const totalCards = data.cards.length
  const masteredCards = data.cards.filter(c => c.mastery >= 4).length
  const averageMastery = totalCards > 0 
    ? (data.cards.reduce((sum, c) => sum + c.mastery, 0) / totalCards).toFixed(1)
    : '0'

  return (
    <div className='min-h-screen'>
      <Header />
      <main className='max-w-4xl mx-auto px-6 py-8'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to='/' onClick={playClick} className='inline-flex items-center gap-2 text-learn-500 hover:text-learn-700 transition-colors mb-4'>
            <ArrowLeft className='w-4 h-4' />
            <span className='text-sm'>Retour</span>
          </Link>

          <h1 className='font-display text-3xl font-bold text-learn-900 mb-8'>
            Progression
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
            <div className='p-6 bg-white rounded-2xl card-shadow'>
              <TrendingUp className='w-6 h-6 text-learn-400 mb-3' />
              <p className='text-3xl font-bold text-learn-800'>{totalCards}</p>
              <p className='text-sm text-learn-500 mt-1'>Cartes etudiees</p>
            </div>
            <div className='p-6 bg-white rounded-2xl card-shadow'>
              <div className='w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mb-3'>
                <div className='w-3 h-3 rounded-full bg-emerald-500' />
              </div>
              <p className='text-3xl font-bold text-learn-800'>{masteredCards}</p>
              <p className='text-sm text-learn-500 mt-1'>Cartes maitrisees</p>
            </div>
            <div className='p-6 bg-white rounded-2xl card-shadow'>
              <div className='w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mb-3'>
                <span className='text-xs font-bold text-blue-600'>{averageMastery}</span>
              </div>
              <p className='text-3xl font-bold text-learn-800'>{averageMastery}<span className='text-lg text-learn-400'>/5</span></p>
              <p className='text-sm text-learn-500 mt-1'>Maitrise moyenne</p>
            </div>
          </div>

          {totalCards > 0 && (
            <div className='bg-white rounded-2xl card-shadow p-6'>
              <h3 className='font-semibold text-learn-800 mb-4'>Niveau de maitrise</h3>
              <div className='space-y-3'>
                {[0, 1, 2, 3, 4, 5].map(level => {
                  const count = data.cards.filter(c => c.mastery === level).length
                  const percentage = totalCards > 0 ? (count / totalCards) * 100 : 0
                  const labels = ['A apprendre', 'Debutant', 'En progres', 'Intermediaire', 'Avance', 'Maitrise']
                  return (
                    <div key={level} className='flex items-center gap-4'>
                      <span className='text-sm text-learn-500 w-28'>{labels[level]}</span>
                      <div className='flex-1 h-3 bg-learn-100 rounded-full overflow-hidden'>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: percentage + '%' }}
                          transition={{ duration: 0.5, delay: level * 0.1 }}
                          className={'h-full rounded-full ' + (
                            level === 5 ? 'bg-emerald-500' :
                            level >= 3 ? 'bg-blue-500' :
                            level >= 1 ? 'bg-amber-500' : 'bg-learn-300'
                          )}
                        />
                      </div>
                      <span className='text-sm text-learn-500 w-8 text-right'>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {totalCards === 0 && (
            <div className='text-center py-16'>
              <p className='text-learn-500'>Commencez une session pour voir vos progres</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
