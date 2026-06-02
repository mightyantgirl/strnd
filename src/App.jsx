// App.jsx 내용을 이렇게 바꾸면
import SurveyMain from './pages/survey/main'
import SurveyStep0 from './pages/survey/step0'
import SurveyStep1 from './pages/survey/step1'
import SurveyStep2 from './pages/survey/step2'
import SurveyStep4 from './pages/survey/step4'

export default function App() {
  return (
    <div className="bg-bg px-5 flex flex-col" style={{ height: '100dvh' }}>
      {/* intro 신규/재방문 */}
      {/* <SurveyMain name="수진" isFirstVisit={false} lastVisitDays={42} lastVisitService="프리미엄 클리닉" onStart={() => {}} /> */}

      {/* step0 */}
      {/* <SurveyStep0 /> */}

      {/* step1 */}
      {/* <SurveyStep1 /> */}

      {/* step2 */}
      {/* <SurveyStep2 /> */}

      {/* step4 */}
      <SurveyStep4 />
    </div>
  )
}
