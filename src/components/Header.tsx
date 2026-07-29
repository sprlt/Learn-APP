import { Link } from 'react-router-dom'
import { BarChart3 } from 'lucide-react'
import Logo from './Logo'
import { useClickSound } from '../hooks/useClickSound'

export default function Header() {
  const playClick = useClickSound()

  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-learn-200'>
      <div className='max-w-4xl mx-auto px-6 h-16 flex items-center justify-between'>
        <Logo />
        <nav className='flex items-center gap-4'>
          <Link
            to='/progress'
            onClick={playClick}
            className='p-2 rounded-xl hover:bg-learn-100 transition-colors'
            aria-label='Progression'
          >
            <BarChart3 className='w-5 h-5 text-learn-600' />
          </Link>
        </nav>
      </div>
    </header>
  )
}
