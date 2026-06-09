import { useState } from 'react'

import SurveyFooter from './../../components/surveyfooter'
import SurveyHeader from './../../components/surveyheader'
import MoodChip from './../../components/moodchip'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep2({ onStart }) {
  const [selected, setSelected] = useState([])

  const MOODCHIPS = [
    { id: 1, emoji: '🌿', label: '자연스럽고 편안한' },
    { id: 2, emoji: '✂️', label: '깔끔하고 단정한' },
    { id: 3, emoji: '✨', label: '트렌디하고 감각적인' },
    { id: 4, emoji: '🔥', label: '개성있고 독특한' },
    { id: 5, emoji: '🌙', label: '세련되고 고급스러운' },
  ]

  const toggle = (id) => {
    setSelected(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // 있으면 제거
          : [...prev, id], // 없으면 추가
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <SurveyHeader />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <p>STEP 2</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            선호하는 무드를
            <br />
            선택해주세요
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <div>
            <div className="flex-col">
              {MOODCHIPS.map((chip) => (
                <MoodChip
                  key={chip.id}
                  emoji={chip.emoji}
                  label={chip.label}
                  selected={selected.includes(chip.id)}
                  onClick={() => toggle(chip.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <SurveyFooter children="복수 선택이 가능합니다." onNext={onStart} />
    </div>
  )
}
