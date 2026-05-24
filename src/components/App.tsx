import { useState, useEffect } from 'react'
import { usePlayer } from '../hooks/usePlayer'
import { useQuests } from '../hooks/useQuests'
import { SHOP_ITEMS } from '../data/shopItems'
import { SEED_QUESTS } from '../data/seedQuests'
import { Quest } from '../types'
import Header from './Header'
import QuestBoard from './QuestBoard'
import TavernShop from './TavernShop'
import CharacterPanel from './CharacterPanel'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

export default function App() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [player, setPlayer] = useState({
    gold: 50,
    completedQuests: [] as string[],
    ownedItems: [] as string[],
    equippedItems: [] as string[],
    totalGoldEarned: 0,
  })

  const [shopTab, setShopTab] = useState<'decoration' | 'equipment'>('decoration')
  const [characterOpen, setCharacterOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedQuests = localStorage.getItem('quest-tavern-quests')
      const savedPlayer = localStorage.getItem('quest-tavern-player')
      if (savedQuests) {
        setQuests(JSON.parse(savedQuests))
      } else {
        setQuests(SEED_QUESTS)
      }
      if (savedPlayer) {
        setPlayer(JSON.parse(savedPlayer))
      }
    } catch {
      setQuests(SEED_QUESTS)
    }
  }, [])

  // Persist on change
  useEffect(() => {
    if (quests.length > 0) {
      localStorage.setItem('quest-tavern-quests', JSON.stringify(quests))
    }
    localStorage.setItem('quest-tavern-player', JSON.stringify(player))
  }, [quests, player])

  const acceptQuest = (id: string) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, status: 'in_progress' } : q))
  }

  const completeQuest = (id: string) => {
    const quest = quests.find(q => q.id === id)
    if (!quest) return
    const goldEarned = quest.gold
    setQuests(prev => prev.map(q => q.id === id ? { ...q, status: 'completed' } : q))
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold + goldEarned,
      totalGoldEarned: prev.totalGoldEarned + goldEarned,
      completedQuests: prev.completedQuests.includes(id) ? prev.completedQuests : [...prev.completedQuests, id],
    }))
  }

  const addQuest = (questData: Omit<Quest, 'id' | 'status' | 'createdAt'>) => {
    const newQuest: Quest = {
      ...questData,
      id: generateId(),
      status: 'available',
      createdAt: Date.now(),
    }
    setQuests(prev => [...prev, newQuest])
  }

  const deleteQuest = (id: string) => {
    setQuests(prev => prev.filter(q => q.id !== id))
  }

  const buyItem = (itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId)
    if (!item || player.gold < item.price) return
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold - item.price,
      ownedItems: prev.ownedItems.includes(itemId) ? prev.ownedItems : [...prev.ownedItems, itemId],
      equippedItems: prev.equippedItems.includes(itemId) ? prev.equippedItems : [...prev.equippedItems, itemId],
    }))
  }

  const toggleEquip = (itemId: string) => {
    if (!player.ownedItems.includes(itemId)) return
    setPlayer(prev => ({
      ...prev,
      equippedItems: prev.equippedItems.includes(itemId)
        ? prev.equippedItems.filter(id => id !== itemId)
        : [...prev.equippedItems, itemId],
    }))
  }

  const completedCount = player.completedQuests.length
  const totalCount = quests.length

  return (
    <div className="app">
      <Header
        gold={player.gold}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      <div className="main-content">
        <QuestBoard
          quests={quests}
          onAccept={acceptQuest}
          onComplete={completeQuest}
          onAdd={addQuest}
          onDelete={deleteQuest}
        />
        <TavernShop
          shopTab={shopTab}
          onTabChange={setShopTab}
          gold={player.gold}
          ownedItems={player.ownedItems}
          equippedItems={player.equippedItems}
          onBuy={buyItem}
          onToggleEquip={toggleEquip}
        />
      </div>

      <button
        className="character-drawer-toggle"
        onClick={() => setCharacterOpen(o => !o)}
      >
        <span>🎒</span>
        <span>冒险者档案</span>
        <span style={{ opacity: 0.6, fontSize: '0.8em' }}>{player.equippedItems.length > 0 ? `· ${player.equippedItems.length} 件装备` : ''}</span>
      </button>

      <CharacterPanel
        open={characterOpen}
        onClose={() => setCharacterOpen(false)}
        equippedItems={player.equippedItems}
        ownedItems={player.ownedItems}
        onToggleEquip={toggleEquip}
        totalGoldEarned={player.totalGoldEarned}
        completedCount={completedCount}
      />
    </div>
  )
}