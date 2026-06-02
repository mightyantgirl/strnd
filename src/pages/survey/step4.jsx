import { useState } from 'react'

import SurveyFooter from '../../components/surveyfooter'
import SurveyHeader from '../../components/surveyheader'
import Chip from '../../components/chip'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep4({ onStart }) {
  const [selected, setSelected] = useState([])

  const CHIPS = [
    { id: 1, label: '➰ 자주 엉켜요' },
    { id: 2, label: '✂️ 커트 라인이 마음에 안들어요' },
    { id: 3, label: '⚡️ 건조해요' },
    { id: 4, label: '🎨️ 색이 마음에 안들어요' },
    { id: 5, label: '💨 볼륨이 없고 처져요' },
    { id: 6, label: '✂️️️ 기장이 애매해요' },
    { id: 7, label: '💊 숱이 너무 많거나 적어요' },
    { id: 8, label: '‍⚡ 손상이 심해요' },
    { id: 9, label: '⏰ 아침 스타일링이 힘들어요' },
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
        <div className={`${baseTextClass} pt-20 pb-6 space-y-2`}>
          <p>STEP 4</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            요즘 헤어 <br />
            고민이 있나요?
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <div>
            <div className="flex-row">
              {CHIPS.map((chip) => (
                <Chip key={chip.id} label={chip.label} selected={selected.includes(chip.id)} onClick={() => toggle(chip.id)} />
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
