import { useReducer } from 'react'
import { Quest } from '../types'
import { SEED_QUESTS } from '../data/seedQuests'

type QuestAction =
  | { type: 'ADD'; quest: Quest }
  | { type: 'UPDATE'; id: string; updates: Partial<Quest> }
  | { type: 'DELETE'; id: string }
  | { type: 'ACCEPT'; id: string }
  | { type: 'COMPLETE'; id: string }
  | { type: 'LOAD'; quests: Quest[] }

function questReducer(state: Quest[], action: QuestAction): Quest[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.quest]
    case 'UPDATE':
      return state.map(q => q.id === action.id ? { ...q, ...action.updates } : q)
    case 'DELETE':
      return state.filter(q => q.id !== action.id)
    case 'ACCEPT':
      return state.map(q => q.id === action.id ? { ...q, status: 'in_progress' } : q)
    case 'COMPLETE':
      return state.map(q => q.id === action.id ? { ...q, status: 'completed' } : q)
    case 'LOAD':
      return action.quests
    default:
      return state
  }
}

export function useQuests(initialQuests: Quest[] = SEED_QUESTS) {
  const [quests, dispatch] = useReducer(questReducer, initialQuests)

  const addQuest = (quest: Quest) => dispatch({ type: 'ADD', quest })
  const updateQuest = (id: string, updates: Partial<Quest>) => dispatch({ type: 'UPDATE', id, updates })
  const deleteQuest = (id: string) => dispatch({ type: 'DELETE', id })
  const acceptQuest = (id: string) => dispatch({ type: 'ACCEPT', id })
  const completeQuest = (id: string) => dispatch({ type: 'COMPLETE', id })
  const loadQuests = (quests: Quest[]) => dispatch({ type: 'LOAD', quests })

  return { quests, addQuest, updateQuest, deleteQuest, acceptQuest, completeQuest, loadQuests }
}