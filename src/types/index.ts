export interface FlashCard {
  id: string
  question: string
  answer: string
  subject: string
  category: string
  series?: number
  difficulty: number
  mastery: number
  lastReviewed: Date | null
  nextReview: Date
  article?: string
  singular?: string
  plural?: string
  greekWord?: string
}

export interface Category {
  id: string
  name: string
  description: string
  cardCount: number
  seriesCount?: number
}

export interface Subject {
  id: string
  name: string
  description: string
  icon: string
  categories: Category[]
  color: string
}

export type ReviewResult = 'wrong' | 'review' | 'correct'

export interface SessionStats {
  totalCards: number
  correctCount: number
  reviewCount: number
  wrongCount: number
  streak: number
  startTime: Date
}
