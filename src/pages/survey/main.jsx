import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SurveyFooter from './../../components/surveyfooter'
import BottomSheet from './../../components/bottomSheet'

import { getElapsedDay, formatList } from '../../utils/dateUtils'

const baseTextClass = `text-xs text-placeholder font-medium`

export default function SurveyMain() {
  const { visitId } = useParams()
  const [searchParams] = useSearchParams()

  const [checkActive, setCheckActive] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [lastTreatmentMenu, setLastTreatmentMenu] = useState(null)

  const navigate = useNavigate()
  const surveyToken = searchParams.get('surveyToken')
  const lastVisitAt = searchParams.get('lastVisitDt') ?? ''
  const isFirstVisit = searchParams.get('isFirstVisit') === 'true'

  const isToday = lastVisitAt?.startsWith(new Date().toISOString().slice(0, 10))

  //surveyToken
  useEffect(() => {
    if (!surveyToken) {
      navigate(`/survey/${visitId}/done`, { replace: true })
    }
  }, [surveyToken])

  //설문 페이지 정보 조회 api 요청 함수
  useEffect(() => {
    if (!surveyToken) return
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`https://strnd-be.onrender.com/api/survey/${surveyToken}`)
        const data = await response.json()

        setLastTreatmentMenu(data.lastTreatmentMenu)
        setCustomerName(data.customerName)
      } catch (error) {
        console.error('데이터 로딩 실패:', error)
      }
    }
    fetchSurvey()
  }, [])

  return (
    <div className="flex flex-col" style={{ height: '100dvh' }}>
      {/* 헤더 */}

      {/* 컨텐츠 - 메인타이틀 */}
      <div
        className={`${baseTextClass} flex-1 overflow-y-auto py-22`}
        style={{ touchAction: 'pan-y' }}>
        <h1 className="text-2xl font-bold text-primary mb-4">
          안녕하세요, <span className="text-brand">{customerName} </span>님!
          <br />
          <p>
            {isFirstVisit ? (
              '방문해주셔서 감사합니다.'
            ) : isToday ? (
              '오늘 다시 방문해주셨네요.'
            ) : (
              <>
                <span className="text-brand">{getElapsedDay(lastVisitAt)}</span> 만에
                방문해주셨네요.
              </>
            )}
          </p>
        </h1>
        <p>
          {isFirstVisit
            ? '좋은 기억 만드실 수 있도록 최선을 다하겠습니다.'
            : lastTreatmentMenu
              ? `마지막으로 받은 시술은 ${formatList(lastTreatmentMenu)} 입니다.`
              : '좋은 기억 만드실 수 있도록 최선을 다하겠습니다.'}
        </p>
      </div>

      {/* 푸터 */}

      <div className="flex items-center gap-2 pl-1 mb-2">
        <button onClick={() => setOpenSheet(!openSheet)}>
          <span className="text-xs text-placeholder font-semibold underline">
            개인정보제공 동의
          </span>
        </button>
      </div>
      {openSheet && (
        <BottomSheet
          isOpen={openSheet}
          onClose={() => setOpenSheet(false)}
          onConfirm={(consentData) => {
            setCheckActive(true)
            setOpenSheet(false)
            navigate(`/survey/${visitId}/steps?surveyToken=${surveyToken}`, {
              state: {
                consentRequiredYn: consentData.consentRequiredYn,
                consentOptionalYn: consentData.consentOptionalYn,
                isFirstVisit,
              },
            })
          }}
        />
      )}

      <SurveyFooter
        value="시작하기"
        onNext={() => {
          checkActive
            ? navigate(`/survey/${visitId}/steps?surveyToken=${surveyToken}`, {
                state: {
                  consentRequiredYn: checkActive.consentRequiredYn,
                  consentOptionalYn: checkActive.consentOptionalYn,
                  isFirstVisit,
                },
              })
            : setOpenSheet(!openSheet, { state: { surveyToken } })
        }}
      />
    </div>
  )
}
