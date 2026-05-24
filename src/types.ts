export interface Quest {
  id: string
  title: string
  description: string
  gold: number
  difficulty: 'simple' | 'normal' | 'hard'
  status: 'available' | 'in_progress' | 'completed'
  createdAt: number
}

export interface ShopItem {
  id: string
  name: string
  category: 'decoration' | 'equipment'
  slot?: 'weapon' | 'armor' | 'accessory'
  price: number
  description: string
  emoji: string
}

export interface PlayerState {
  gold: number
  completedQuests: string[]
  ownedItems: string[]
  equippedItems: string[]
  totalGoldEarned: number
}