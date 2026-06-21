// 설문카드 컴포넌트 리팩토링 필요 (반복)

import { useState, useEffect } from 'react'
import Button from './button'
import { formatDate, formatStatus, formatService, formatList } from '../utils/dateUtils'

const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `
const baseTextClass = `text-base text-placeholder font-medium text-xs`
const baseListClass = `py-3 text-xs`

export default function SurveyCard({
  visitDt,
  status,
  visitRoute,
  refDesigner,
  services,
  moods,
  hairConcerns,
  requestMemo,
  styleImageIds,
  onRecord,
  onClick,
  visitId,
}) {
  const [survey, setSurvey] = useState('')

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        const response = await fetch(`https://strnd-be.onrender.com/api/visits/${visitId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            //로그인 증명서 헤더에 담기
            //토큰으로 인증
            //없을 시 401 반환
          },
        })

        const data = await response.json()

        setSurvey(data)
      } catch (error) {
        console.error('에러:', error)
      }
    }
    fetchSurvey()
  }, [])

  return (
    <div className={baseClass}>
      <div className={`${baseTextClass} flex justify-between  mb-1 font-semi`}>
        <div className="flex items-center gap-3">
          <div className="bg-brand rounded-full w-2 h-2" />
          <p className="font-semibold">{formatDate(survey.visitDt)}</p>
        </div>
        <p className="text-xs">{formatStatus(survey.status)}</p>
      </div>
      <>
        <ul>
          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled mb-1">방문 경로</p>
              <p className="text-secondary">{survey.visitRoute}</p>
            </div>
          </li>
          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled mb-1">소개 유무</p>
              <p className="text-secondary">{survey.refDesigner}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">서비스 카테고리</p>
              <p className="text-secondary">{formatService(survey.services)}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">선호 무드</p>
              <p className="text-secondary">{formatList(survey.moods)}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">헤어 고민</p>
              <p className="text-secondary">{formatList(survey.hairConcerns)}</p>
            </div>
          </li>

          <li>
            <div className={baseListClass}>
              <p className="font-bold text-disabled  mb-1">요청사항</p>
              <p className="text-secondary">{survey.requestMemo}</p>
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
