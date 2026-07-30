import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, BookOpen } from 'lucide-react'
import Header from '../components/Header'
import { subjects } from '../data/subjects'
import { getStoredData } from '../engine/storage'
import { useClickSound } from '../hooks/useClickSound'

const seriesNames: Record<string, string[]> = {
  'greek-verbs': [
    'Verbes essentiels',
    'Verbes de mouvement',
    'Verbes de communication',
    'Verbes de pensée',
    'Verbes de sentiment',
    'Verbes du quotidien',
    'Verbes de travail',
    'Verbes de nature',
    'Verbes sociaux',
    'Verbes abstraits'
  ],
  'greek-adjectives': [
    'Adjectifs de base',
    'Adjectifs de taille',
    'Adjectifs de couleur',
    'Adjectifs de personnalité',
    'Adjectifs de qualité',
    'Adjectifs de forme',
    'Adjectifs de temps',
    'Adjectifs de quantité',
    'Adjectifs de sensation',
    'Adjectifs de relation'
  ],
  'greek-nouns': [
    'Noms de la maison',
    'Noms de la famille',
    'Noms de la nourriture',
    'Noms du corps',
    'Noms des animaux',
    'Noms des métiers',
    'Noms des lieux',
    'Noms du temps',
    'Noms des objets',
    'Noms abstraits'
  ]
}

export default function SeriesPage() {
  const { subjectId, categoryId } = useParams<{ subjectId: string; categoryId: string }>()
  const navigate = useNavigate()
  const playClick = useClickSound()
  const subject = subjects.find(s => s.id === subjectId)
  const category = subject?.categories.find(c => c.id === categoryId)
  const data = getStoredData()

  if (!subject || !category) return <div>Categorie non trouvee</div>

  const seriesList = seriesNames[categoryId || ''] || []
  const seriesCount = category.seriesCount || 1

  // Calculer la progression de chaque série
  const getSeriesProgress = (seriesIndex: number) => {
    const seriesCards = data.cards.filter(c => 
      c.category === categoryId && c.series === seriesIndex + 1
    )
    if (seriesCards.length === 0) return 0
    const avgMastery = seriesCards.reduce((sum, c) => sum + c.mastery, 0) / seriesCards.length
    // Convertir le score en pourcentage (score peut être négatif, on normalise)
    // On considère que 0 = 0%, 50 = 100% comme objectif
    const percentage = Math.min(100, Math.max(0, (avgMastery / 50) * 100))
    return Math.round(percentage)
  }

  const getSeriesColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-500'
    if (percentage >= 50) return 'bg-blue-500'
    if (percentage >= 20) return 'bg-amber-500'
    return 'bg-learn-300'
  }

  const handleStudy = (seriesIndex: number) => {
    playClick()
    navigate('/study/' + subjectId + '/' + categoryId + '/' + (seriesIndex + 1))
  }

  const handleStudyAll = () => {
    playClick()
    navigate('/study/' + subjectId + '/' + categoryId + '/all')
  }

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

        {/* Bouton Toutes les séries */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className='mb-6'
        >
          <button
            onClick={handleStudyAll}
            className='w-full py-4 rounded-2xl text-white font-semibold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3'
            style={{ backgroundColor: subject.color }}
          >
            <BookOpen className='w-5 h-5' />
            Toutes les series melangees
          </button>
        </motion.div>

        {/* Liste des séries */}
        <div className='space-y-3'>
          {Array.from({ length: seriesCount }, (_, i) => {
            const progress = getSeriesProgress(i)
            const name = seriesList[i] || 'Serie ' + (i + 1)
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => handleStudy(i)}
                  className='w-full p-5 bg-white rounded-2xl card-shadow hover:card-shadow-hover transition-all border border-learn-200 hover:border-learn-300 text-left'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <div 
                        className='w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold'
                        style={{ backgroundColor: subject.color }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 className='font-semibold text-learn-800'>{name}</h3>
                        <p className='text-xs text-learn-400'>15 cartes</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='text-sm font-medium text-learn-600'>{progress}%</span>
                      <div className='w-10 h-10 rounded-full bg-learn-100 flex items-center justify-center hover:bg-learn-200 transition-colors'>
                        <Play className='w-5 h-5 text-learn-600 ml-0.5' />
                      </div>
                    </div>
                  </div>
                  
                  {/* Barre de progression */}
                  <div className='h-2.5 bg-learn-100 rounded-full overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: progress + '%' }}
                      transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
                      className={'h-full rounded-full ' + getSeriesColor(progress)}
                    />
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
