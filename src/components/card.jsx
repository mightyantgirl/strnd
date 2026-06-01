import Badge from './badge'

const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `
const baseTextClass = `text-xs text-placeholder font-medium`

export function VisitCard({ date, elapsedDays, TREATMENT_DETAIL, TREATMENT_PRODUCT, TREATMENT_NOTE }) {
  return (
    <button className={`${baseClass} focus:border-border`}>
      <div className={`${baseTextClass} flex justify-between mb-2 font-semi`}>
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-full w-2 h-2" /> <p className="font-semibold">{date}</p>
        </div>
        <p>{elapsedDays}</p>
      </div>
      <div className="flex items-center gap-2 mb-4 text-base text-secondary font-semibold">
        <Badge label="펌" color="blue" />
        <p>여성 커트 + 프리미엄 클리닉</p>
      </div>
      <div className="text-left">
        <ul className={`${baseTextClass} space-y-1`}>
          <li>{TREATMENT_DETAIL}</li>
          <li>{TREATMENT_PRODUCT}</li>
          <li>{TREATMENT_NOTE}</li>
        </ul>
      </div>
    </button>
  )
}
