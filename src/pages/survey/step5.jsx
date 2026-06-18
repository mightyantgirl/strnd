import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SurveyFooter from './../../components/surveyfooter'
import SurveyHeader from './../../components/surveyheader'
import TextFiled from './../../components/textfiled'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep5({ onStart }) {
  const navigate = useNavigate()
  const { visitId } = useParams()

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <SurveyHeader onBack={() => navigate(-1)} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <p>STEP 5</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            참고하고 싶은
            <br />
            스타일이 있나요?
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <TextFiled placeholder="듣고 싶은 노래가 있어요, 시술 중 잠들어도 괜찮아요 😊" />
        </div>
      </div>

      {/* 푸터 */}
      <SurveyFooter children="복수 선택이 가능합니다." value="제출하기" onNext={onStart} />
    </div>
  )
}
