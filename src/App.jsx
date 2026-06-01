// App.jsx 내용을 이렇게 바꾸면
import SurveyMain from './pages/survey/main'
import SurveyStep0 from './pages/survey/step0'

export default function App() {
  return (
    <div className="bg-bg ml-5 mr-5 ">
      {/* intro 신규/재방문 */}
      {/* <SurveyMain name="수진" isFirstVisit={false} lastVisitDays={42} lastVisitService="프리미엄 클리닉" onStart={() => {}} /> */}

      {/* step0 */}
      <SurveyStep0 />
    </div>
  )
}
