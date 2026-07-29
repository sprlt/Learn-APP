import { FlashCard, SessionStats } from '../types'

const STORAGE_KEY = 'learn_app_data'

interface StoredData {
  cards: FlashCard[]
  stats: Record<string, SessionStats>
  lastSession: string | null
}

export function getStoredData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { cards: [], stats: {}, lastSession: null }
    return JSON.parse(raw, (key, value) => {
      if (key === 'lastReviewed' || key === 'nextReview' || key === 'startTime') {
        return value ? new Date(value) : null
      }
      return value
    })
  } catch {
    return { cards: [], stats: {}, lastSession: null }
  }
}

export function saveCard(card: FlashCard): void {
  const data = getStoredData()
  const existing = data.cards.findIndex(c => c.id === card.id)
  if (existing >= 0) {
    data.cards[existing] = card
  } else {
    data.cards.push(card)
  }
  saveData(data)
}

export function saveStats(subjectId: string, stats: SessionStats): void {
  const data = getStoredData()
  data.stats[subjectId] = stats
  saveData(data)
}

function saveData(data: StoredData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
