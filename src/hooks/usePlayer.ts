import { useReducer } from 'react'
import { PlayerState } from '../types'

type PlayerAction =
  | { type: 'EARN_GOLD'; amount: number }
  | { type: 'SPEND_GOLD'; amount: number }
  | { type: 'COMPLETE_QUEST'; questId: string }
  | { type: 'BUY_ITEM'; itemId: string }
  | { type: 'EQUIP_ITEM'; itemId: string }
  | { type: 'UNEQUIP_ITEM'; itemId: string }
  | { type: 'LOAD'; state: PlayerState }

const DEFAULT_PLAYER: PlayerState = {
  gold: 50,
  completedQuests: [],
  ownedItems: [],
  equippedItems: [],
  totalGoldEarned: 0,
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'EARN_GOLD':
      return {
        ...state,
        gold: state.gold + action.amount,
        totalGoldEarned: state.totalGoldEarned + action.amount,
      }
    case 'SPEND_GOLD':
      return {
        ...state,
        gold: state.gold - action.amount,
      }
    case 'COMPLETE_QUEST':
      return {
        ...state,
        completedQuests: state.completedQuests.includes(action.questId)
          ? state.completedQuests
          : [...state.completedQuests, action.questId],
      }
    case 'BUY_ITEM':
      return {
        ...state,
        ownedItems: state.ownedItems.includes(action.itemId)
          ? state.ownedItems
          : [...state.ownedItems, action.itemId],
      }
    case 'EQUIP_ITEM':
      return {
        ...state,
        equippedItems: state.equippedItems.includes(action.itemId)
          ? state.equippedItems
          : [...state.equippedItems, action.itemId],
      }
    case 'UNEQUIP_ITEM':
      return {
        ...state,
        equippedItems: state.equippedItems.filter(id => id !== action.itemId),
      }
    case 'LOAD':
      return action.state
    default:
      return state
  }
}

export function usePlayer(initialState: PlayerState = DEFAULT_PLAYER) {
  const [player, dispatch] = useReducer(playerReducer, initialState)

  const earnGold = (amount: number) => dispatch({ type: 'EARN_GOLD', amount })
  const spendGold = (amount: number) => dispatch({ type: 'SPEND_GOLD', amount })
  const completeQuest = (questId: string) => dispatch({ type: 'COMPLETE_QUEST', questId })
  const buyItem = (itemId: string) => dispatch({ type: 'BUY_ITEM', itemId })
  const equipItem = (itemId: string) => dispatch({ type: 'EQUIP_ITEM', itemId })
  const unequipItem = (itemId: string) => dispatch({ type: 'UNEQUIP_ITEM', itemId })
  const loadPlayer = (state: PlayerState) => dispatch({ type: 'LOAD', state })

  return { player, earnGold, spendGold, completeQuest, buyItem, equipItem, unequipItem, loadPlayer }
}