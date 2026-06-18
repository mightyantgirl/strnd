import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SurveyFooter from './../../components/surveyfooter'
import BottomSheet from './../../components/bottomSheet'

import { getElapsedDay } from '../../utils/dateUtils'

const baseTextClass = `text-xs text-placeholder font-medium`

export default function SurveyMain() {
  const { visitId } = useParams()
  const [searchParams] = useSearchParams()
  const customerId = searchParams.get('customerId')

  const [checkActive, setCheckActive] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)

  const [name, setName] = useState('')
  const [lastVisitAt, setLastVisitAt] = useState('')
  const [lastVisitService, setLastVisitService] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  //고객 상세 카드 api 요청 함수
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        const response = await fetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        setName(data.customerName)
        setLastVisitAt(data.lastVisitDt)
      } catch (error) {
        console.error('데이터 로딩 실패:', error)
      }
    }
    fetchCustomer()
  }, [])

  //고객 히스토리 카드 api 요청 함수
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        const response = await fetch(
          `https://strnd-be.onrender.com/api/customers/${customerId}/visits`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const data = await response.json()

        setLastVisitService(data[0]?.treatmentMenu)
      } catch (error) {
        console.error('히스토리 로딩 실패:', error)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="flex flex-col" style={{ height: '100dvh' }}>
      {/* 헤더 */}

      {/* 컨텐츠 - 메인타이틀 */}
      <div
        className={`${baseTextClass} flex-1 overflow-y-auto py-22`}
        style={{ touchAction: 'pan-y' }}>
        <h1 className="text-2xl font-bold text-primary mb-4">
          안녕하세요, <span className="text-brand">{name} </span>님!
          <br />
          <p>
            {!lastVisitAt ? (
              '방문해주셔서 감사합니다.'
            ) : (
              <>
                <span className="text-brand">{getElapsedDay(lastVisitAt)}</span> 만에
                방문해주셨네요.
              </>
            )}
          </p>
        </h1>
        <p>
          {!lastVisitAt
            ? '좋은 기억 만드실 수 있도록 최선을 다하겠습니다.'
            : `마지막으로 받은 시술은 ${lastVisitService} 입니다.`}
        </p>
      </div>

      {/* 푸터 */}

      <div className="flex items-center gap-2 pl-1 mb-4">
        <button onClick={() => setOpenSheet(!openSheet)}>
          <img
            src={checkActive ? '/img/check.svg' : '/img/check-disable.svg'}
            alt="개인정보동의 체크"
          />
        </button>
        <span className="text-xs text-secondary font-semibold">개인정보제공 동의</span>
      </div>
      {openSheet && (
        <BottomSheet
          isOpen={openSheet}
          onClose={() => setOpenSheet(false)}
          onConfirm={() => {
            setCheckActive(true) // 체크 활성화
            setOpenSheet(false) // 모달 닫기
          }}
        />
      )}

      <SurveyFooter
        value="시작하기"
        onNext={() => {
          checkActive ? navigate(`/survey/${visitId}/step0`) : console.log('동의 안하셨어요')
        }}
      />
    </div>
  )
}
