import Button from './button'
import { formatDate, formatStatus, formatService, formatList } from '../utils/dateUtils'

const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `
const baseTextClass = `text-base text-placeholder font-medium text-xs`
const baseListClass = `py-3 text-xs`

export default function SurveyCard({ onClick, data }) {
  if (!data) return null

  const { visitDt, status, visitRoute, refDesigner, services, moods, hairConcerns, requestMemo } =
    data

  return (
    <div className={baseClass}>
      <div className={`${baseTextClass} flex justify-between  mb-1 font-semi`}>
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-full w-2 h-2" />
          <p className="font-semibold">{formatDate(visitDt)}</p>
        </div>
        <p className="text-xs">{formatStatus(status)}</p>
      </div>
      <>
        <ul>
          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled mb-1">방문 경로</p>
              <p className="text-secondary">{visitRoute}</p>
            </div>
          </li>
          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled mb-1">디자이너 소개 유무</p>
              <p className="text-secondary">{refDesigner}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">서비스 카테고리</p>
              <p className="text-secondary">{formatService(services)}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">선호 무드</p>
              <p className="text-secondary">{formatList(moods)}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">헤어 고민</p>
              <p className="text-secondary">{formatList(hairConcerns)}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">요청사항</p>
              <p className="text-secondary">{requestMemo}</p>
            </div>
          </li>
        </ul>
      </>
      <Button
        variant="secondary"
        value="시술 내용 기록하기"
        height="sm"
        className="text-xs mt-2"
        onClick={onClick}
      />
    </div>
  )
}
