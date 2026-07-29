import { FlashCard, ReviewResult } from '../types'

const MINUTES = 60 * 1000
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS

export function calculateNextReview(
  card: FlashCard,
  result: ReviewResult
): FlashCard {
  const now = new Date()
  let newMastery = card.mastery
  let interval: number

  switch (result) {
    case 'wrong':
      newMastery = Math.max(0, card.mastery - 1)
      interval = 1 * MINUTES
      break
    case 'review':
      newMastery = card.mastery
      interval = 10 * MINUTES
      break
    case 'correct':
      newMastery = Math.min(5, card.mastery + 1)
      interval = getIntervalForMastery(newMastery)
      break
  }

  return {
    ...card,
    mastery: newMastery,
    lastReviewed: now,
    nextReview: new Date(now.getTime() + interval)
  }
}

function getIntervalForMastery(mastery: number): number {
  switch (mastery) {
    case 0: return 10 * MINUTES
    case 1: return 1 * DAYS
    case 2: return 3 * DAYS
    case 3: return 7 * DAYS
    case 4: return 14 * DAYS
    case 5: return 30 * DAYS
    default: return 1 * DAYS
  }
}

export function selectCardsForSession(
  cards: FlashCard[],
  categoryId: string,
  count: number = 10
): FlashCard[] {
  const now = new Date()
  const categoryCards = cards.filter(c => 
    c.category === categoryId && c.nextReview <= now
  )
  
  categoryCards.sort((a, b) => {
    if (a.mastery !== b.mastery) return a.mastery - b.mastery
    if (!a.lastReviewed) return -1
    if (!b.lastReviewed) return 1
    return a.lastReviewed.getTime() - b.lastReviewed.getTime()
  })

  const pool = cards.filter(c => c.category === categoryId)
  const selected = categoryCards.slice(0, count)
  
  if (selected.length < count) {
    const usedIds = new Set(selected.map(c => c.id))
    const remaining = pool.filter(c => !usedIds.has(c.id))
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[remaining[i], remaining[j]] = [remaining[j], remaining[i]]
    }
    selected.push(...remaining.slice(0, count - selected.length))
  }

  return selected.slice(0, count)
}
