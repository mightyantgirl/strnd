import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getElapsedTime,
  formatPhone,
  formatGender,
  truncateList,
  formatDate,
} from '../../utils/dateUtils'

import PageHeader from './../../components/pageheader'
import Button from './../../components/button'
import CustomerInfoCard from './../../components/customerinfocard'
import VisitCard from './../../components/card'
import SurveyCard from './../../components/surveycard'
import TextFiled from './../../components/textfiled'

const baseTextClass = `text-xs text-primary font-medium`
const activeTabClass = `bg-card-bg py-2 rounded-lg text-center text-secondary font-semibold transition-all duration-200`
const inactiveTabClass = `bg-border py-2 rounded-lg text-center text-disabled font-semibold`

export default function CustomerDetail() {
  const [activeTab, setActiveTab] = useState('history')
  const [isActive, setIsActive] = useState(true)

  const { customerId } = useParams() // URL 정보 받아오는 훅
  const [name, setName] = useState('')
  const [lastVisitAt, setLastVisitAt] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // const [visitCount, setVisitCount] = useState('')

  const [visits, setVisits] = useState([])
  const [memo, setMemo] = useState('')
  const [originalMemo, setOriginalMemo] = useState('') // 원본 저장용

  const isChanged = memo !== originalMemo

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
        setPhone(data.phone)
        setGender(data.gender)
        setMemo(data.memo)
        setOriginalMemo(data.memo)

        setIsActive(data.isActive)
      } catch (error) {
        console.error('데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCustomer()
  }, [])
  // 히스토리 조회 api 요청함수
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
        // console.log('히스토리 데이터:', data)

        setVisits(data) //완료 상태만 뿌려지게
      } catch (error) {
        console.error('데이터 로딩 실패:', error)
      }
    }
    fetchHistory()
  }, [])

  const handleSaveMemo = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const response = await fetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerName: name, // 기존 값 그대로
        phone: phone, // 기존 값 그대로
        gender: gender, // 기존 값 그대로
        memo: memo, // 수정된 메모
      }),
    })

    setOriginalMemo(memo)
  }

  //   const handleDelete = async () => {
  //   const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  //   await fetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
  //     method: 'DELETE',
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   navigate('/home')
  // }

  const navigate = useNavigate()

  return (
    <div style={{ height: '100dvh' }} className={`${baseTextClass} h-full flex flex-col`}>
      {/* 헤더 */}
      <PageHeader title="고객 상세" onBack={() => navigate('/home')} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {isLoading ? (
          <div className="animate-pulse pt-18 pb-6 space-y-2">
            {/* CustomerInfoCard 스켈레톤 */}
            <div className="w-full py-5 px-4 rounded-xl bg-card-bg">
              <div className="flex justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 bg-border rounded-md w-20" />
                  <div className="h-5 bg-border rounded-full w-24" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 bg-border rounded-md w-10" />
                  <div className="h-3 bg-border rounded-md w-24" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-border rounded-md w-8" />
                  <div className="h-3 bg-border rounded-md w-28" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fade-in pt-15 pb-6 space-y-2">
            <CustomerInfoCard
              name={name}
              isActive={isActive}
              lastVisitAt={`마지막 방문 ${getElapsedTime(lastVisitAt)}`}
              phone={formatPhone(phone)}
              gender={formatGender(gender)}
            />
          </div>
        )}

        <Button value="설문 시작하기" height="lg" survey={true} onClick={() => {}} />
        <p
          className="underline font-semibold text-placeholder py-5 px-4 text-center"
          onClick={() => {}}>
          설문 없이 바로 기록하기
        </p>

        <div>
          {/* 탭 */}
          <div className="bg-border w-full rounded-lg mb-3">
            <ol className="flex gap-2 p-1 ">
              <li
                onClick={() => {
                  setActiveTab('history')
                }}
                style={{ width: '28dvh' }}
                className={activeTab === 'history' ? activeTabClass : inactiveTabClass}>
                히스토리
              </li>
              <li
                onClick={() => {
                  setActiveTab('todaySurvey')
                }}
                style={{ width: '28dvh' }}
                className={activeTab === 'todaySurvey' ? activeTabClass : inactiveTabClass}>
                오늘 설문
              </li>
              <li
                onClick={() => {
                  setActiveTab('memo')
                }}
                style={{ width: '28dvh' }}
                className={activeTab === 'memo' ? activeTabClass : inactiveTabClass}>
                메모
              </li>
            </ol>
          </div>

          {/* 히스토리 */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {visits
                .filter((visit) => visit.status === 'COMPLETED') // COMPLETED만 필터
                .map((visit) => (
                  <VisitCard
                    service={visit.services}
                    key={visit.visitId}
                    visitId={visit.visitId}
                    date={formatDate(visit.visitDt)}
                    elapsedDays={getElapsedTime(visit.visitDt)}
                    treatmentMenu={truncateList(visit.treatmentMenu)}
                    treatmentDetail={visit.treatmentDetail}
                    treatmentProduct={visit.treatmentProduct}
                    treatmentNote={visit.treatmentNote}
                  />
                ))}
            </div>
          )}

          {/* 설문 */}
          {activeTab === 'todaySurvey' && (
            <div>
              {visits.some((visit) => visit.status === 'SUBMITTED') ? (
                <SurveyCard
                  visitId={visits.find((visit) => visit.status !== 'COMPLETED')?.visitId}
                />
              ) : (
                <div className="flex flex-col items-center mt-8">
                  <img src="../img/none.svg" alt="" />
                  <span className="text-wbase text-disabled font-semibold mt-3">
                    작성된 설문이 아직 없어요.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 메모 */}

          {activeTab === 'memo' && (
            <div>
              <div>
                <TextFiled
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  handleSaveMemo={handleSaveMemo}
                  disabled={!isChanged}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
