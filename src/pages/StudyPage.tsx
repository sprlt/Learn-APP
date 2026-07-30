import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import FlashCardComponent from '../components/FlashCard'
import { allCards } from '../data/allCards'
import { selectCardsForSession, calculateNextReview } from '../engine/algorithm'
import { saveCard } from '../engine/storage'
import { FlashCard, ReviewResult } from '../types'

export default function StudyPage() {
  const { subjectId, categoryId, seriesId } = useParams<{ 
    subjectId: string; 
    categoryId: string;
    seriesId: string 
  }>()
  const navigate = useNavigate()
  const [cards, setCards] = useState<FlashCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [stats, setStats] = useState({ correct: 0, review: 0, wrong: 0 })

  useEffect(() => {
    let categoryCards: FlashCard[]
    
    if (seriesId === 'all') {
      // Toutes les séries mélangées
      categoryCards = allCards.filter(c => c.category === categoryId)
    } else {
      // Une série spécifique
      const seriesNum = parseInt(seriesId || '1')
      categoryCards = allCards.filter(c => 
        c.category === categoryId && c.series === seriesNum
      )
    }
    
    const sessionCards = selectCardsForSession(categoryCards, categoryId!, 10)
    setCards(sessionCards)
  }, [categoryId, seriesId])

  const handleResult = useCallback((result: ReviewResult) => {
    const currentCard = cards[currentIndex]
    if (!currentCard) return
    const updatedCard = calculateNextReview(currentCard, result)
    saveCard(updatedCard)
    setStats(prev => ({
      correct: prev.correct + (result === 'correct' ? 1 : 0),
      review: prev.review + (result === 'review' ? 1 : 0),
      wrong: prev.wrong + (result === 'wrong' ? 1 : 0)
    }))
    if (currentIndex >= cards.length - 1) {
      setSessionComplete(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }, [cards, currentIndex])

  const handleRestart = () => {
    let categoryCards: FlashCard[]
    
    if (seriesId === 'all') {
      categoryCards = allCards.filter(c => c.category === categoryId)
    } else {
      const seriesNum = parseInt(seriesId || '1')
      categoryCards = allCards.filter(c => 
        c.category === categoryId && c.series === seriesNum
      )
    }
    
    const sessionCards = selectCardsForSession(categoryCards, categoryId!, 10)
    setCards(sessionCards)
    setCurrentIndex(0)
    setSessionComplete(false)
    setStats({ correct: 0, review: 0, wrong: 0 })
  }

  if (cards.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-learn-500'>Chargement...</p>
      </div>
    )
  }

  const seriesLabel = seriesId === 'all' ? 'Toutes les series' : 'Serie ' + seriesId

  return (
    <div className='min-h-screen'>
      <Header />
      <main className='max-w-2xl mx-auto px-6 py-8'>
        {!sessionComplete ? (
          <>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-xs text-learn-400 uppercase tracking-wider'>
                {seriesLabel}
              </span>
              <span className='text-sm text-learn-500'>
                Carte {currentIndex + 1} / {cards.length}
              </span>
            </div>
            
            <div className='mb-8'>
              <div className='h-2 bg-learn-200 rounded-full overflow-hidden'>
                <motion.div 
                  className='h-full bg-learn-600 rounded-full'
                  initial={{ width: 0 }}
                  animate={{ width: ((currentIndex) / cards.length) * 100 + '%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <FlashCardComponent 
                  card={cards[currentIndex]} 
                  onResult={handleResult}
                />
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center py-16'
          >
            <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg width='32' height='32' viewBox='0 0 20 20' fill='none'>
                <path d='M4 10L8 14L16 6' stroke='#059669' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </div>
            
            <h2 className='font-display text-2xl font-bold text-learn-900 mb-2'>
              Session terminee !
            </h2>
            <p className='text-learn-500 mb-8'>{seriesLabel}</p>

            <div className='grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8'>
              <div className='p-4 bg-emerald-50 rounded-2xl'>
                <p className='text-2xl font-bold text-emerald-600'>{stats.correct}</p>
                <p className='text-xs text-emerald-500 mt-1'>Connus</p>
              </div>
              <div className='p-4 bg-amber-50 rounded-2xl'>
                <p className='text-2xl font-bold text-amber-600'>{stats.review}</p>
                <p className='text-xs text-amber-500 mt-1'>A revoir</p>
              </div>
              <div className='p-4 bg-red-50 rounded-2xl'>
                <p className='text-2xl font-bold text-red-600'>{stats.wrong}</p>
                <p className='text-xs text-red-500 mt-1'>Difficiles</p>
              </div>
            </div>

            <div className='flex gap-3 justify-center'>
              <button
                onClick={() => navigate('/subject/' + subjectId + '/' + categoryId)}
                className='px-6 py-3 rounded-xl bg-learn-100 text-learn-700 font-medium hover:bg-learn-200 transition-colors'
              >
                Retour aux series
              </button>
              <button
                onClick={handleRestart}
                className='px-6 py-3 rounded-xl bg-learn-800 text-white font-medium hover:bg-learn-700 transition-colors'
              >
                Nouvelle session
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
