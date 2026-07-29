import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { FlashCard as FlashCardType } from '../types'
import { useClickSound } from '../hooks/useClickSound'

interface Props {
  card: FlashCardType
  onResult: (result: 'wrong' | 'review' | 'correct') => void
}

export default function FlashCardComponent({ card, onResult }: Props) {
  const [flipped, setFlipped] = useState(false)
  const playClick = useClickSound()

  const handleFlip = () => {
    playClick()
    setFlipped(true)
  }

  const handleResult = (result: 'wrong' | 'review' | 'correct') => {
    playClick()
    onResult(result)
    setFlipped(false)
  }

  const speakGreek = (e: React.MouseEvent) => {
    e.stopPropagation()
    if ('speechSynthesis' in window && card.question) {
      const utterance = new SpeechSynthesisUtterance(card.question)
      utterance.lang = 'el-GR'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='flex justify-center mb-6'>
        <div className='flex gap-1.5'>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={'w-2 h-2 rounded-full ' + (i < card.mastery ? 'bg-emerald-500' : 'bg-learn-300')}
            />
          ))}
        </div>
      </div>

      <div className={'flip-card ' + (flipped ? 'flipped' : '')}>
        <div className='flip-card-inner relative h-80'>
          <div className='flip-card-front absolute inset-0 bg-white rounded-2xl card-shadow p-8 flex flex-col items-center justify-center cursor-pointer'
               onClick={handleFlip}>
            <span className='text-xs uppercase tracking-widest text-learn-400 mb-4'>
              Question
            </span>
            <div className='text-center'>
              {card.article && (
                <span className='text-lg text-learn-500 mr-2'>{card.article}</span>
              )}
              <h2 className='text-4xl font-semibold text-learn-800'>
                {card.question}
              </h2>
            </div>
            <p className='text-sm text-learn-400 mt-8'>
              Appuyez pour reveler
            </p>
          </div>

          <div className='flip-card-back absolute inset-0 bg-white rounded-2xl card-shadow p-8 flex flex-col items-center justify-center'>
            <span className='text-xs uppercase tracking-widest text-learn-400 mb-4'>
              Reponse
            </span>
            <h2 className='text-3xl font-semibold text-learn-800 text-center'>
              {card.answer}
            </h2>
            {card.greekWord && (
              <div className='mt-6 text-center'>
                <div className='flex items-center justify-center gap-2'>
                  <p className='text-xl text-learn-600 font-medium'>
                    {card.greekWord}
                  </p>
                  <button
                    onClick={speakGreek}
                    className='p-2 rounded-full hover:bg-learn-100 transition-colors'
                    title='Ecouter la prononciation'
                  >
                    <Volume2 className='w-5 h-5 text-learn-500' />
                  </button>
                </div>
                {card.singular && (
                  <p className='text-base text-learn-500 mt-3 font-medium'>
                    Sg. {card.singular}
                  </p>
                )}
                {card.plural && (
                  <p className='text-base text-learn-500 font-medium'>
                    Pl. {card.plural}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex gap-3 mt-6'
        >
          <button
            onClick={() => handleResult('wrong')}
            className='flex-1 py-3.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2'
          >
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path d='M5 5L15 15M15 5L5 15' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
            </svg>
            <span className='hidden sm:inline'>Incorrect</span>
          </button>
          <button
            onClick={() => handleResult('review')}
            className='flex-1 py-3.5 rounded-xl bg-amber-50 text-amber-600 font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-2'
          >
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path d='M10 4V10L13 13' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
              <circle cx='10' cy='10' r='7' stroke='currentColor' strokeWidth='2'/>
            </svg>
            <span className='hidden sm:inline'>A revoir</span>
          </button>
          <button
            onClick={() => handleResult('correct')}
            className='flex-1 py-3.5 rounded-xl bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2'
          >
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path d='M4 10L8 14L16 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
            <span className='hidden sm:inline'>Connu</span>
          </button>
        </motion.div>
      )}

      {!flipped && <div className='h-14 mt-6' />}
    </div>
  )
}
