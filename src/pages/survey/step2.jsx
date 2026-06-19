import { useNavigate } from 'react-router-dom'

import SurveyHeader from './../../components/surveyheader'
import MoodChip from './../../components/moodchip'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep2({ surveyData, onUpdate }) {
  const navigate = useNavigate()

  const MOODCHIPS = [
    { id: 1, emoji: '🌿', label: '자연스럽고 편안한' },
    { id: 2, emoji: '✂️', label: '깔끔하고 단정한' },
    { id: 3, emoji: '✨', label: '트렌디하고 감각적인' },
    { id: 4, emoji: '🔥', label: '개성있고 독특한' },
    { id: 5, emoji: '🌙', label: '세련되고 고급스러운' },
  ]

  const toggle = (label) => {
    const next = surveyData.moods.includes(label)
      ? surveyData.moods.filter((item) => item !== label)
      : [...surveyData.moods, label]
    onUpdate('moods', next)
  }

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <SurveyHeader onBack={() => navigate(-1)} />

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
          <>
            <div className="flex-col">
              {MOODCHIPS.map((chip) => (
                <MoodChip
                  key={chip.id}
                  emoji={chip.emoji}
                  label={chip.label}
                  selected={surveyData.moods.includes(chip.label)}
                  onClick={() => toggle(chip.label)}
                />
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  )
}
