import CheckChip from './../../components/checkchip'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep1({ surveyData, onUpdate }) {
  return (
    <div>
      <div>
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
                selected={surveyData.serviceId === 1}
                onClick={() => onUpdate('serviceId', 1)}
              />
              <CheckChip
                label="펌"
                selected={surveyData.serviceId === 2}
                onClick={() => onUpdate('serviceId', 2)}
              />
            </div>
            <div className="w-full flex text-lg">
              <CheckChip
                label="컬러"
                selected={surveyData.serviceId === 3}
                onClick={() => onUpdate('serviceId', 3)}
              />
              <CheckChip
                label="클리닉"
                selected={surveyData.serviceId === 4}
                onClick={() => onUpdate('serviceId', 4)}
              />
            </div>
            <div className="w-full flex text-lg">
              <CheckChip
                label="🔎 정확한 상담이 필요해요"
                selected={surveyData.serviceId === 5}
                onClick={() => onUpdate('serviceId', 5)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
