import { Quest } from '../types'

interface QuestCardProps {
  quest: Quest
  index: number
  onAccept: () => void
  onComplete: () => void
  onDelete: () => void
}

const DIFFICULTY_TAG: Record<string, string> = {
  simple: '简单',
  normal: '普通',
  hard: '困难',
}

const CoinSvg = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10" fill="#c9963a" stroke="#8b6914" strokeWidth="1.5" />
    <text x="12" y="16" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#6b4a00" fontFamily="serif">G</text>
  </svg>
)

export default function QuestCard({ quest, index, onAccept, onComplete, onDelete }: QuestCardProps) {
  const isCompleted = quest.status === 'completed'
  const isInProgress = quest.status === 'in_progress'
  const isAvailable = quest.status === 'available'

  return (
    <div
      className={`quest-card ${quest.status === 'in_progress' ? 'in-progress' : ''} ${isCompleted ? 'completed' : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* APPROVED stamp */}
      <div className="stamp">✓ 已完成</div>

      <div className="quest-card-header">
        <span className="quest-title">{quest.title}</span>
        {isCompleted && (
          <button className="icon-btn danger" onClick={e => { e.stopPropagation(); onDelete() }} title="删除记录">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {quest.description && (
        <p className="quest-desc">{quest.description}</p>
      )}

      <div className="quest-footer">
        <div className="quest-tags">
          <span className={`tag tag-difficulty ${quest.difficulty}`}>
            {DIFFICULTY_TAG[quest.difficulty]}
          </span>
          <span className="tag tag-gold">
            <CoinSvg /> {quest.gold}
          </span>
        </div>

        {isAvailable && (
          <button
            className="quest-accept-btn"
            onClick={e => { e.stopPropagation(); onAccept() }}
          >
            ⚔️ 接受委托
          </button>
        )}

        {isInProgress && (
          <button
            className="quest-accept-btn complete-btn"
            onClick={e => { e.stopPropagation(); onComplete() }}
          >
            ✅ 完成委托
          </button>
        )}
      </div>
    </div>
  )
}