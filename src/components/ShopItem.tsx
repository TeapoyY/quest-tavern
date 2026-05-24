import { ShopItem } from '../types'

interface ShopItemCardProps {
  item: ShopItem
  gold: number
  isOwned: boolean
  isEquipped: boolean
  onBuy: () => void
  onToggleEquip: () => void
}

const CoinSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10" fill="#c9963a" stroke="#8b6914" strokeWidth="1.5" />
    <text x="12" y="16" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#6b4a00" fontFamily="serif">G</text>
  </svg>
)

export default function ShopItemCard({ item, gold, isOwned, isEquipped, onBuy, onToggleEquip }: ShopItemCardProps) {
  const canAfford = gold >= item.price

  return (
    <div className={`shop-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}`}>
      <div className="shop-item-emoji">{item.emoji}</div>
      <div className="shop-item-info">
        <div className="shop-item-name">{item.name}</div>
        <div className="shop-item-desc">{item.description}</div>
      </div>
      <div className="shop-item-right">
        <div className={`shop-item-price ${!canAfford && !isOwned ? 'cannot-afford' : ''}`}>
          <CoinSvg /> {item.price}
        </div>

        {isOwned ? (
          <button
            className={isEquipped ? 'badge-equipped' : 'badge-owned'}
            onClick={onToggleEquip}
            style={{
              background: isEquipped ? 'rgba(201,150,58,0.2)' : 'rgba(90,154,90,0.15)',
              border: `1px solid ${isEquipped ? 'rgba(201,150,58,0.5)' : 'rgba(90,154,90,0.4)'}`,
              color: isEquipped ? '#8b6914' : '#3a6b2a',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Crimson Text, serif',
            }}
          >
            {isEquipped ? '✦ 已装备' : '已拥有'}
          </button>
        ) : (
          <button
            className="btn-buy"
            onClick={onBuy}
            disabled={!canAfford}
            style={{ opacity: canAfford ? 1 : 0.45 }}
          >
            {canAfford ? '购买' : '金币不足'}
          </button>
        )}
      </div>
    </div>
  )
}