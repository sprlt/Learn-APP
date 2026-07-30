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

  const speakGreek = (text: string) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'el-GR'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  // Déterminer quel type de carte
  const isNouns = card.category === 'greek-nouns'
  const isAdjectives = card.category === 'greek-adjectives'
  const isVerbs = card.category === 'greek-verbs'

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
          {/* RECTO - Question */}
          <div className='flip-card-front absolute inset-0 bg-white rounded-2xl card-shadow p-8 flex flex-col items-center justify-center cursor-pointer'
               onClick={handleFlip}>
            <span className='text-xs uppercase tracking-widest text-learn-400 mb-4'>
              Question
            </span>
            <div className='text-center'>
              {card.article && (
                <span className='text-lg text-learn-500 mr-2'>{card.article}</span>
              )}
              <div className='flex items-center justify-center gap-2'>
                <h2 className='text-4xl font-semibold text-learn-800'>
                  {card.question}
                </h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    speakGreek(card.question)
                  }}
                  className='p-2 rounded-full hover:bg-learn-100 transition-colors'
                  title='Ecouter la prononciation'
                >
                  <Volume2 className='w-5 h-5 text-learn-400 hover:text-learn-600' />
                </button>
              </div>
            </div>
            <p className='text-sm text-learn-400 mt-8'>
              Appuyez pour reveler
            </p>
          </div>

          {/* VERSO - Reponse */}
          <div className='flip-card-back absolute inset-0 bg-white rounded-2xl card-shadow p-8 flex flex-col items-center justify-center'>
            <span className='text-xs uppercase tracking-widest text-learn-400 mb-4'>
              Reponse
            </span>
            <h2 className='text-3xl font-semibold text-learn-800 text-center mb-4'>
              {card.answer}
            </h2>
            
            {/* ADJECTIFS - Masculin / Féminin / Neutre */}
            {isAdjectives && (
              <div className='mt-2 text-center space-y-2'>
                {card.masculine && (
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-sm text-learn-400'>M.</span>
                    <p className='text-lg text-learn-600 font-medium'>{card.masculine}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakGreek(card.masculine || '') }}
                      className='p-1 rounded-full hover:bg-learn-100 transition-colors'
                    >
                      <Volume2 className='w-3.5 h-3.5 text-learn-400 hover:text-learn-600' />
                    </button>
                  </div>
                )}
                {card.feminine && (
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-sm text-learn-400'>F.</span>
                    <p className='text-lg text-learn-600 font-medium'>{card.feminine}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakGreek(card.feminine || '') }}
                      className='p-1 rounded-full hover:bg-learn-100 transition-colors'
                    >
                      <Volume2 className='w-3.5 h-3.5 text-learn-400 hover:text-learn-600' />
                    </button>
                  </div>
                )}
                {card.neuter && (
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-sm text-learn-400'>N.</span>
                    <p className='text-lg text-learn-600 font-medium'>{card.neuter}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakGreek(card.neuter || '') }}
                      className='p-1 rounded-full hover:bg-learn-100 transition-colors'
                    >
                      <Volume2 className='w-3.5 h-3.5 text-learn-400 hover:text-learn-600' />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* NOMS COMMUNS - Singulier / Pluriel */}
            {isNouns && (
              <div className='mt-2 text-center space-y-2'>
                <div className='flex items-center justify-center gap-2'>
                  {card.article && <span className='text-lg text-learn-500'>{card.article}</span>}
                  <p className='text-xl text-learn-600 font-medium'>{card.greekWord || card.question}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakGreek(card.greekWord || card.question) }}
                    className='p-1.5 rounded-full hover:bg-learn-100 transition-colors'
                  >
                    <Volume2 className='w-4 h-4 text-learn-400 hover:text-learn-600' />
                  </button>
                </div>
                {card.singular && (
                  <div className='flex items-center justify-center gap-2'>
                    <p className='text-base text-learn-500 font-medium'>Sg. {card.singular}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakGreek(card.singular || '') }}
                      className='p-1 rounded-full hover:bg-learn-100 transition-colors'
                    >
                      <Volume2 className='w-3.5 h-3.5 text-learn-400 hover:text-learn-600' />
                    </button>
                  </div>
                )}
                {card.plural && (
                  <div className='flex items-center justify-center gap-2'>
                    <p className='text-base text-learn-500 font-medium'>Pl. {card.plural}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakGreek(card.plural || '') }}
                      className='p-1 rounded-full hover:bg-learn-100 transition-colors'
                    >
                      <Volume2 className='w-3.5 h-3.5 text-learn-400 hover:text-learn-600' />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VERBES - Juste le mot grec */}
            {isVerbs && (
              <div className='mt-2 text-center'>
                <div className='flex items-center justify-center gap-2'>
                  <p className='text-xl text-learn-600 font-medium'>{card.greekWord || card.question}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakGreek(card.greekWord || card.question) }}
                    className='p-1.5 rounded-full hover:bg-learn-100 transition-colors'
                  >
                    <Volume2 className='w-4 h-4 text-learn-400 hover:text-learn-600' />
                  </button>
                </div>
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
