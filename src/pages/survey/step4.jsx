import { useState, useEffect } from 'react'

import StyleCard from '../../components/stylecard'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep4({ surveyData, onUpdate }) {
  const [styleCards, setStyleCards] = useState([])

  useEffect(() => {
    const fetchStyleImages = async () => {
      try {
        const response = await fetch('https://strnd-be.onrender.com/api/style-images')
        const data = await response.json()

        const filtered = data.filter(
          (item) => item.gender === surveyData.gender && item.serviceId === surveyData.serviceId,
        )
        setStyleCards(filtered)
      } catch (error) {
        console.error('스타일 이미지 로딩 실패:', error)
      }
    }
    fetchStyleImages()
  }, [])

  const toggle = (id) => {
    const next = surveyData.styleImageIds.includes(id)
      ? surveyData.styleImageIds.filter((item) => item !== id)
      : [...surveyData.styleImageIds, id]
    onUpdate('styleImageIds', next)
  }

  return (
    <div>
      <div className="relative">
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} top-0 pt-18 pb-8 space-y-2`}>
          <p>STEP 4</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            참고하고 싶은
            <br />
            스타일이 있나요?
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          {styleCards.length === 0 ? (
            <p className="text-placeholder text-base text-center py-10">
              참고할 스타일 이미지가 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {styleCards.map((card) => (
                <StyleCard
                  key={card.imageId}
                  imageUrl={card.imageUrl}
                  label={card.imageAlt}
                  selected={surveyData.styleImageIds.includes(card.imageId)}
                  onClick={() => toggle(card.imageId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
