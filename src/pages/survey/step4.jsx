import { useNavigate } from 'react-router-dom'

import SurveyHeader from '../../components/surveyheader'
import StyleCard from '../../components/stylecard'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep4({ surveyData, onUpdate }) {
  const navigate = useNavigate()

  const STYLECARDS = [
    { id: 1, imageUrl: './img/hair_01.png', label: 'C컬 레이어드' },
    { id: 2, imageUrl: './img/hair_02.png', label: 'S컬 레이어드' },
    { id: 3, imageUrl: './img/hair_03.png', label: '히피펌' },
    { id: 4, imageUrl: './img/hair_04.png', label: '숏컷' },
    { id: 5, imageUrl: './img/hair_05.png', label: '원랭스 컷' },
    { id: 6, imageUrl: './img/hair_06.png', label: '어쩌구펌' },
    { id: 7, imageUrl: './img/hair_07.png', label: '어쩌구펌' },
    { id: 8, imageUrl: './img/hair_08.png', label: '어쩌구펌' },
    { id: 9, imageUrl: './img/hair_09.png', label: '어쩌구펌' },
    { id: 10, imageUrl: './img/hair_10.png', label: '어쩌구펌' },
  ]

  const toggle = (id) => {
    const next = surveyData.styleImageIds.includes(id)
      ? surveyData.styleImageIds.filter((item) => item !== id)
      : [...surveyData.styleImageIds, id]
    onUpdate('styleImageIds', next)
  }

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <p>STEP 4</p>
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
                key={card.id}
                imageUrl={card.imageUrl}
                label={card.label}
                selected={surveyData.styleImageIds.includes(card.id)}
                onClick={() => toggle(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
