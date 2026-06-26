import { useState } from 'react'
import Badge from './badge'
import useApiFetch from '../hooks/useApiFetch'

const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `
const baseTextClass = `text-base text-placeholder font-medium`

export default function VisitCard({
  date,
  elapsedDays,
  treatmentMenu,
  treatmentDetail,
  treatmentProduct,
  treatmentNote,
  visitId,
  service,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [detailData, setDetailData] = useState(null)
  const apiFetch = useApiFetch()

  const handleOpen = async () => {
    setIsOpen(!isOpen)

    if (!isOpen && !detailData) {
      const response = await apiFetch(`https://strnd-be.onrender.com/api/visits/${visitId}`)
      if (!response) return
      const data = await response.json()
      setDetailData(data)
    }
  }
  return (
    <button className={`${baseClass} focus:border-border`} onClick={handleOpen}>
      <div className={`${baseTextClass} flex justify-between mb-2 font-semi`}>
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-full w-2 h-2" />
          <p className="font-semibold text-xs">{date}</p>
        </div>
        <p className="text-xs">{elapsedDays}</p>
      </div>
      <div className="flex items-center gap-2 mb-4 text-base text-secondary font-semibold">
        <Badge service={service} />
        <p>{treatmentMenu}</p>
      </div>
      <div className="text-left">
        <ul className={`${baseTextClass} space-y-2`}>
          <li>
            <div className="flex-col space-y-1">
              <p className="font-semibold text-xs">시술 내용</p>
              <p className="text-secondary text-xs">{treatmentDetail}</p>
            </div>
          </li>
          <li>
            {treatmentProduct && (
              <div className="flex-col space-y-1">
                <p className="font-semibold text-xs">사용 약제</p>
                <p className="text-secondary text-xs"> {treatmentProduct}</p>
              </div>
            )}
          </li>
          <li>
            {treatmentNote && (
              <div className="flex-col space-y-1">
                <p className="font-semibold text-xs">시술 메모</p>
                <p className="text-secondary text-xs"> {treatmentNote}</p>
              </div>
            )}
          </li>
        </ul>
      </div>
      {/* 클릭 시 노출 */}
      {isOpen && detailData && (
        <div className="text-left px-3 py-3 rounded-md mt-3" style={{ backgroundColor: '#f3f3f0' }}>
          {detailData.visitRoute && (
            <div className="flex items-center mb-3">
              <img src="/img/mini_check.svg" className="mr-2"></img>
              <span className="font-semibold text-brand text-xs">설문 내용</span>
            </div>
          )}
          {detailData.visitRoute && (
            <ul className={`${baseTextClass} space-y-2`}>
              <li>
                {detailData.visitRoute && (
                  <div className="flex-col">
                    <p className="font-semibold text-xs mb-1">방문 경로</p>
                    <p className="text-secondary  text-xs">{detailData.visitRoute}</p>
                  </div>
                )}
              </li>
              <li>
                {detailData.refDesigner && (
                  <div className="flex-col">
                    <p className="font-semibold text-xs mb-1">소개 유무</p>
                    <p className="text-secondary  text-xs"> {detailData.refDesigner}</p>
                  </div>
                )}
              </li>
              <li>
                {detailData.moods && (
                  <div className="flex-col">
                    <p className="font-semibold text-xs mb-1">선호 무드</p>
                    <p className="text-secondary text-xs">{detailData.moods?.join(', ')}</p>
                  </div>
                )}
              </li>
              <li>
                {detailData.hairConcerns && (
                  <div className="flex-col">
                    <p className="font-semibold text-xs mb-1">헤어 고민</p>
                    <p className="text-secondary  text-xs">{detailData.hairConcerns?.join(', ')}</p>
                  </div>
                )}
              </li>
              <li>
                {detailData.requestMemo && (
                  <div className="flex-col">
                    <p className="font-semibold text-xs mb-1">요청 사항</p>
                    <p className="text-secondary  text-xs"> {detailData.requestMemo}</p>
                  </div>
                )}
              </li>
            </ul>
          )}
        </div>
      )}
    </button>
  )
}
