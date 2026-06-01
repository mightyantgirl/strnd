export default function SurveyHeader({ currentStep, totalStep, onBack }) {
  const progress = (currentStep / totalStep) * 100

  return (
    <div className="w-full bg-bg fixed pr-10 pl-1 pb-6">
      <div className="flex gap-5 pr-5 mt-6 items-center">
        <button onClick={onBack}>
          <img src="/img/back.svg" alt="뒤로가기" />
        </button>

        {/* 프로그래스바 */}
        <div className="flex-1 h-1 bg-border rounded-full">
          <div className="h-1 bg-brand rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
