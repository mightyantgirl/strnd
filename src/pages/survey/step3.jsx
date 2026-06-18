import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SurveyFooter from './../../components/surveyfooter'
import SurveyHeader from './../../components/surveyheader'
import StyleCard from '../../components/stylecard'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep3({ onStart }) {
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()
  const { visitId } = useParams()

  const STYLECARDS = [
    { id: 1, imageUrl: './img/hair_01.png', label: 'C컬 레이어드' },
    { id: 2, imageUrl: './img/hair_02.png', label: 'S컬 레이어드' },
    { id: 3, imageUrl: './img/hair_03.png', label: '히피펌' },
    { id: 4, imageUrl: './img/hair_04.png', label: '숏컷' },
    { id: 5, imageUrl: './img/hair_05.png', label: '원랭스 컷' },
    { id: 6, imageUrl: './img/hair_06.png', label: '어쩌구펌' },
    { id: 6, imageUrl: './img/hair_06.png', label: '어쩌구펌' },
    { id: 6, imageUrl: './img/hair_06.png', label: '어쩌구펌' },
    { id: 6, imageUrl: './img/hair_06.png', label: '어쩌구펌' },
    { id: 6, imageUrl: './img/hair_06.png', label: '어쩌구펌' },
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
      <SurveyHeader onBack={() => navigate(-1)} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <p>STEP 3</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            참고하고 싶은
            <br />
            스타일이 있나요?
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            {STYLECARDS.map((card) => (
              <StyleCard
                imageUrl={card.imageUrl}
                label={card.label}
                selected={selected.includes(card.id)}
                onClick={() => toggle(card.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <SurveyFooter
        value="다음"
        children="복수 선택이 가능합니다."
        onNext={() => navigate(`/survey/${visitId}/step4`)}
      />
    </div>
  )
}
