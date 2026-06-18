import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SurveyFooter from './../../components/surveyfooter'
import SurveyHeader from './../../components/surveyheader'
import CheckChip from './../../components/checkchip'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep1() {
  const [service, setService] = useState('')
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
          <p>STEP 1</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            오늘 원하는 시술을 <br />
            선택해주세요.
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <div>
            <div className="w-full flex text-lg">
              <CheckChip
                label="컷"
                selected={service === '컷'}
                onClick={() => {
                  setService('컷')
                }}
              />
              <CheckChip
                label="펌"
                selected={service === '펌'}
                onClick={() => {
                  setService('펌')
                }}
              />
            </div>
            <div className="w-full flex text-lg">
              <CheckChip
                label="컬러"
                selected={service === '컬러'}
                onClick={() => {
                  setService('컬러')
                }}
              />
              <CheckChip
                label="클리닉"
                selected={service === '클리닉'}
                onClick={() => {
                  setService('클리닉')
                }}
              />
            </div>
            <div className="w-full flex text-lg">
              <CheckChip
                label="🔎 정확한 상담이 필요해요"
                selected={service === '상담'}
                onClick={() => {
                  setService('상담')
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <SurveyFooter value="다음" onNext={() => navigate(`/survey/${visitId}/step2`)} />
    </div>
  )
}
