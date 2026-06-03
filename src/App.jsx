// App.jsx 내용을 이렇게 바꾸면
import Login from './pages/designer/login'

import SurveyMain from './pages/survey/main'
import SurveyStep0 from './pages/survey/step0'
import SurveyStep1 from './pages/survey/step1'
import SurveyStep2 from './pages/survey/step2'
import SurveyStep3 from './pages/survey/step3'
import SurveyStep4 from './pages/survey/step4'
import SurveyStep5 from './pages/survey/step5'
import SurveyDone from './pages/survey/surveydone'

export default function App() {
  return (
    <div className="bg-bg px-5 flex flex-col" style={{ height: '100dvh' }}>
      {/* 1. 로그인 */}
      <Login />

      {/* intro 신규/재방문 */}
      {/* <SurveyMain name="수진" isFirstVisit={false} lastVisitDays={42} lastVisitService="프리미엄 클리닉" onStart={() => {}} /> */}

      {/* step0 */}
      {/* <SurveyStep0 /> */}

      {/* step1 */}
      {/* <SurveyStep1 /> */}

      {/* step2 */}
      {/* <SurveyStep2 /> */}

      {/* step3 */}
      {/* <SurveyStep3 /> */}

      {/* step4 */}
      {/* <SurveyStep4 /> */}

      {/* step5 */}
      {/* <SurveyStep5 /> */}

      {/* done */}
      {/* <SurveyDone /> */}
    </div>
  )
}
