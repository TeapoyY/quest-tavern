import { useState } from 'react'
import { Quest } from '../types'

interface AddQuestFormProps {
  onAdd: (quest: { title: string; description: string; gold: number; difficulty: string }) => void
  onCancel: () => void
}

export default function AddQuestForm({ onAdd, onCancel }: AddQuestFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gold, setGold] = useState(20)
  const [difficulty, setDifficulty] = useState<string>('normal')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), description, gold, difficulty })
    setTitle('')
    setDescription('')
    setGold(20)
    setDifficulty('normal')
  }

  return (
    <form className="add-quest-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="委托标题（例如：采购酒桶）"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
          maxLength={60}
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="描述（可选）"
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={200}
        />
      </div>
      <div className="form-row">
        <input
          type="number"
          placeholder="金币奖励"
          value={gold}
          onChange={e => setGold(Number(e.target.value))}
          min={5}
          max={500}
          style={{ maxWidth: '100px' }}
        />
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="simple">简单</option>
          <option value="normal">普通</option>
          <option value="hard">困难</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>取消</button>
        <button type="submit" className="btn-primary">确认发布</button>
      </div>
    </form>
  )
}