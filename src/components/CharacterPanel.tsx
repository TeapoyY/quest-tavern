interface CharacterPanelProps {
  open: boolean
  onClose: () => void
  equippedItems: string[]
  ownedItems: string[]
  onToggleEquip: (itemId: string) => void
  totalGoldEarned: number
  completedCount: number
}

const SLOT_LABELS: Record<string, string> = {
  weapon: '武器',
  armor: '护甲',
  accessory: '饰品',
}

const SLOT_EMOJIS: Record<string, string> = {
  weapon: '⚔️',
  armor: '🛡️',
  accessory: '💍',
}

export default function CharacterPanel({
  open,
  onClose,
  equippedItems,
  ownedItems,
  onToggleEquip,
  totalGoldEarned,
  completedCount,
}: CharacterPanelProps) {
  const slots = ['weapon', 'armor', 'accessory'] as const

  return (
    <>
      <div className={`overlay ${open ? 'visible' : ''}`} onClick={onClose} />
      <div className={`character-panel ${open ? 'open' : ''}`}>
        <div className="character-panel-handle" />
        <div className="character-panel-content">
          <div className="character-avatar-area">
            <div className="character-avatar">
              {equippedItems.length > 0 ? '🧙' : '🧑'}
            </div>
            <div className="character-slots">
              {slots.map(slot => {
                const equipped = ownedItems.find(id => {
                  // For simplicity, we check by slot — real impl would store slot per item
                  return equippedItems.includes(id)
                })
                return (
                  <div key={slot} style={{ textAlign: 'center' }}>
                    <div
                      className={`equip-slot ${equipped ? 'filled' : ''}`}
                      title={equipped ? '已装备 — 点击卸下' : '未装备'}
                      onClick={() => {
                        if (equipped) onToggleEquip(equipped)
                      }}
                    >
                      {equipped ? '✓' : SLOT_EMOJIS[slot]}
                    </div>
                    <div className="slot-label">{SLOT_LABELS[slot]}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="character-info">
            <h3>冒险者档案</h3>
            <div className="character-stats">
              <div className="stat-item">
                <div className="stat-label">累计获得金币</div>
                <div className="stat-value">{totalGoldEarned.toLocaleString()}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">完成委托数</div>
                <div className="stat-value">{completedCount}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">拥有物品</div>
                <div className="stat-value">{ownedItems.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">当前装备</div>
                <div className="stat-value">{equippedItems.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}