import SurveyFooter from './../../components/surveyfooter'

const baseTextClass = `text-xs text-placeholder font-medium`

export default function SurveyMain({ name, isFirstVisit, onStart, lastVisitDays, lastVisitService }) {
  return (
    <div>
      {/* 헤더 */}

      {/* 컨텐츠 - 메인타이틀 */}
      <div className={`${baseTextClass} flex-1 overflow-y-auto py-22`} style={{ touchAction: 'pan-y' }}>
        <h1 className="text-2xl font-bold text-primary mb-4">
          안녕하세요, <span className="text-brand">{name} </span>님!
          <br />
          {isFirstVisit ? '방문해주셔서 감사합니다.' : `${lastVisitDays}일 만에 방문해주셨네요.`}
        </h1>
        <p>{isFirstVisit ? '좋은 기억 만드실 수 있도록 최선을 다하겠습니다.' : `마지막으로 받은 시술은 ${lastVisitService} 입니다.`}</p>
      </div>

      {/* 푸터 */}
      <SurveyFooter onNext={onStart} />
    </div>
  )
}
