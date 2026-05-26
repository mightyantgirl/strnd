import { useState } from 'react'

import Button from './components/Button'
import Chip from './components/Chip'
import MoodChip from './components/moodchip'
import Input from './components/input'
import { StyleCard } from './components/stylecard'

const CHIPS = [
  { id: 1, label: '➰ 자주 엉켜요' },
  { id: 2, label: '✂️ 커트 라인이 마음에 안들어요' },
  { id: 3, label: '⚡️ 건조해요' },
]

const MOODCHIPS = [
  { id: 1, emoji: '🌿', label: '자연스럽고 편안한' },
  { id: 2, emoji: '✂️', label: '깔끔하고 단정한' },
  { id: 3, emoji: '✨', label: '트렌디하고 감각적인' },
  { id: 4, emoji: '🔥', label: '개성있고 독특한' },
  { id: 5, emoji: '🌙', label: '세련되고 고급스러운' },
]

const STYLECARDS = [{ id: 1, imageUrl: '', name: '' }]

export default function App() {
  const [selected, setSelected] = useState([])

  const toggle = (id) => {
    setSelected(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // 있으면 제거
          : [...prev, id], // 없으면 추가
    )
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4 px-8">
      <Button variant="primary">다음</Button>
      <Button variant="secondary">취소</Button>
      <Button variant="primary" disabled>
        비활성화
      </Button>

      <div className="flex-row">
        {CHIPS.map((chip) => (
          <Chip key={chip.id} label={chip.label} selected={selected.includes(chip.id)} onClick={() => toggle(chip.id)} />
        ))}
      </div>

      <div className="flex-col">
        {MOODCHIPS.map((chip) => (
          <MoodChip key={chip.id} emoji={chip.emoji} label={chip.label} selected={selected.includes(chip.id)} onClick={() => toggle(chip.id)} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StyleCard imageUrl="https://picsum.photos/300" name="C컬 레이어드" selected={selected.includes(1)} onClick={() => toggle(1)} />
        <StyleCard imageUrl="https://picsum.photos/301" name="S컬 레이어드" selected={selected.includes(2)} onClick={() => toggle(2)} />
      </div>
    </div>
  )
}
