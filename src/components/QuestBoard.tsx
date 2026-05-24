import { useState } from 'react'
import { Quest } from '../types'
import QuestCard from './QuestCard'
import AddQuestForm from './AddQuestForm'

interface QuestBoardProps {
  quests: Quest[]
  onAccept: (id: string) => void
  onComplete: (id: string) => void
  onAdd: (quest: Omit<Quest, 'id' | 'status' | 'createdAt'>) => void
  onDelete: (id: string) => void
}

const DIFFICULTY_LABEL: Record<string, string> = {
  simple: '简单',
  normal: '普通',
  hard: '困难',
}

export default function QuestBoard({ quests, onAccept, onComplete, onAdd, onDelete }: QuestBoardProps) {
  const [showForm, setShowForm] = useState(false)

  const handleAdd = (data: { title: string; description: string; gold: number; difficulty: string }) => {
    onAdd({
      title: data.title,
      description: data.description,
      gold: data.gold,
      difficulty: data.difficulty as Quest['difficulty'],
    })
    setShowForm(false)
  }

  return (
    <div className="panel quest-board">
      <div className="panel-header">
        <h2 className="panel-title">
          <span>📜</span> 委托版
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>
          {quests.filter(q => q.status !== 'completed').length} 项进行中
        </span>
      </div>

      <div className="panel-body">
        {quests.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🍺</div>
            <p>酒馆暂时没有委托…</p>
            <p>或许你是第一个揭榜的勇者？</p>
          </div>
        )}

        <div className="quest-list">
          {quests.map((quest, i) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={i}
              onAccept={() => onAccept(quest.id)}
              onComplete={() => onComplete(quest.id)}
              onDelete={() => onDelete(quest.id)}
            />
          ))}
        </div>

        {showForm ? (
          <AddQuestForm
            onAdd={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <button
            className="add-quest-btn"
            onClick={() => setShowForm(true)}
            style={{ marginTop: '12px' }}
          >
            <span>＋</span> 接受新委托
          </button>
        )}
      </div>
    </div>
  )
}