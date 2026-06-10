import { useState } from 'react'

import Badge from './badge'

const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `
const baseTextClass = `text-xs text-placeholder font-medium`

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

  const handleOpen = async () => {
    setIsOpen(!isOpen)

    if (!isOpen && !detailData) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const response = await fetch(`https://strnd-be.onrender.com/api/visits/${visitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setDetailData(data)
    }
  }
  return (
    <button className={`${baseClass} focus:border-border`} onClick={handleOpen}>
      <div className={`${baseTextClass} flex justify-between mb-2 font-semi`}>
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-full w-2 h-2" /> <p className="font-semibold">{date}</p>
        </div>
        <p>{elapsedDays}</p>
      </div>
      <div className="flex items-center gap-2 mb-4 text-base text-secondary font-semibold">
        <Badge service={service} />
        <p>{treatmentMenu}</p>
      </div>
      <div className="text-left">
        <ul className={`${baseTextClass} space-y-1`}>
          <li>{treatmentDetail}</li>
          <li>{treatmentProduct}</li>
          <li>{treatmentNote}</li>
        </ul>
      </div>
      {/* 클릭 시 노출 */}
      {isOpen && detailData && (
        <div className="text-left mt-3 ">
          <p className="font-semibold mb-1 text-secondary">설문 내용</p>
          <ul className={`${baseTextClass} space-y-1`}>
            <li>방문 경로 : {detailData.visitRoute}</li>
            <li>디자이너 소개 유무 : {detailData.refDesigner}</li>
            <li>선호 무드 : {detailData.moods?.join(', ')}</li>
            <li>헤어 고민 : {detailData.hairConcerns}</li>
            <li>요청 사항 : {detailData.requestMemo}</li>
          </ul>
        </div>
      )}
    </button>
  )
}
