import { motion } from 'framer-motion'
import Header from '../components/Header'
import SubjectCard from '../components/SubjectCard'
import { subjects } from '../data/subjects'

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      <Header />
      <main className='max-w-4xl mx-auto px-6 py-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-16'
        >
          <h1 className='font-display text-5xl md:text-6xl font-bold text-learn-900 mb-6'>
            LEARN
          </h1>
          <blockquote className='text-lg text-learn-500 italic max-w-lg mx-auto leading-relaxed'>
            An investment in knowledge pays the best interest.
          </blockquote>
          <p className='text-sm text-learn-400 mt-2'>— Benjamin Franklin</p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {subjects.map((subject, index) => (
            <SubjectCard key={subject.id} subject={subject} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}
