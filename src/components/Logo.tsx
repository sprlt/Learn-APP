import { Link } from 'react-router-dom'
import { useClickSound } from '../hooks/useClickSound'

export default function Logo() {
  const playClick = useClickSound()

  return (
    <Link
      to='/'
      className='font-display text-3xl font-bold tracking-wider text-learn-800 hover:text-learn-600 transition-colors'
      onClick={playClick}
    >
      LEARN
    </Link>
  )
}
