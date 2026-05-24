import { useState } from 'react'
import { ShopItem } from '../types'
import ShopItemCard from './ShopItem'

interface TavernShopProps {
  shopTab: 'decoration' | 'equipment'
  onTabChange: (tab: 'decoration' | 'equipment') => void
  allItems: ShopItem[]
  gold: number
  ownedItems: string[]
  equippedItems: string[]
  onBuy: (itemId: string) => void
  onToggleEquip: (itemId: string) => void
}

export default function TavernShop({
  shopTab,
  onTabChange,
  allItems,
  gold,
  ownedItems,
  equippedItems,
  onBuy,
  onToggleEquip,
}: TavernShopProps) {
  const filteredItems = allItems.filter(item => item.category === shopTab)

  return (
    <div className="panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span>🏪</span> 酒馆商店
        </h2>
      </div>

      <div className="shop-tabs">
        <button
          className={`shop-tab ${shopTab === 'decoration' ? 'active' : ''}`}
          onClick={() => onTabChange('decoration')}
        >
          🪑 装饰
        </button>
        <button
          className={`shop-tab ${shopTab === 'equipment' ? 'active' : ''}`}
          onClick={() => onTabChange('equipment')}
        >
          ⚔️ 装备
        </button>
      </div>

      <div className="panel-body">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <p>老板说这类商品暂时缺货…</p>
          </div>
        ) : (
          <div className="shop-list">
            {filteredItems.map(item => (
              <ShopItemCard
                key={item.id}
                item={item}
                gold={gold}
                isOwned={ownedItems.includes(item.id)}
                isEquipped={equippedItems.includes(item.id)}
                onBuy={() => onBuy(item.id)}
                onToggleEquip={() => onToggleEquip(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}