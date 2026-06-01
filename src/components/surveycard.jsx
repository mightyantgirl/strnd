// 설문카드 컴포넌트 리팩토링 필요 (반복)

import Button from './button'

const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `
const baseTextClass = `text-base text-placeholder font-medium text-xs`
const baseListClass = `py-3 text-xs`

export function SurveyCard({ date, status, VISIT_ROUTE, REF_DESIGNER, SERVICES, MOODS, HAIR_CONCERNS, REQUEST_MEMO, images, onRecord }) {
  return (
    <div className={baseClass}>
      <div className={`${baseTextClass} flex justify-between  mb-1 font-semi`}>
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-full w-2 h-2" /> <p className="font-semibold">{date}</p>
        </div>
        <p className="text-xs">{status}</p>
      </div>
      <div>
        <ul>
          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled mb-1">방문 경로</p>
              <p className="text-secondary">{VISIT_ROUTE}</p>
            </div>
          </li>
          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled mb-1">디자이너 소개 유무</p>
              <p className="text-secondary">{REF_DESIGNER}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">서비스 카테고리</p>
              <p className="text-secondary">{SERVICES}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">선호 무드</p>
              <p className="text-secondary">{MOODS}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">헤어 고민</p>
              <p className="text-secondary">{HAIR_CONCERNS}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">요청사항</p>
              <p className="text-secondary">{REQUEST_MEMO}</p>
            </div>
          </li>
        </ul>
      </div>
      <div></div>
      <Button variant="secondary" value="시술 내용 기록하기" height="sm" className="text-xs" onClick={() => {}} />
    </div>
  )
}
