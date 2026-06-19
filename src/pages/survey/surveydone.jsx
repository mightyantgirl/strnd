import { useNavigate } from 'react-router-dom'

import SurveyFooter from '../../components/surveyfooter'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyDone() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      {/* <SurveyHeader /> */}

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          {/* <p>STEP 5</p> */}
          <h1 className="text-2xl font-bold text-primary mb-4">
            작성 완료!
            <br />
            멋진 스타일 만들어드릴게요
          </h1>
        </div>
      </div>

      {/* 푸터 */}
      <SurveyFooter value="메인으로 돌아가기" onNext={() => navigate('/home')} />
    </div>
  )
}
