import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import useAuthGuard from '../../hooks/useAuthGuard'
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
import VisitCard from '../../components/visitcard'
import SurveyCard from './../../components/surveycard'
import TextFiled from './../../components/textfiled'
import Toast from './../../components/toast'
import Filter from './../../components/filter'
import QRBottomSheet from './../../components/QRBottomSheet'
import useApiFetch from '../../hooks/useApiFetch'

const baseTextClass = `text-xs text-primary font-medium`
const activeTabClass = `bg-card-bg py-2 rounded-lg text-center text-secondary font-semibold transition-all duration-200`
const inactiveTabClass = `bg-border py-2 rounded-lg text-center text-disabled font-semibold`

export default function CustomerDetail() {
  useAuthGuard()

  const [activeTab, setActiveTab] = useState('history')
  const [isActive, setIsActive] = useState(true)
  const [openSheet, setOpenSheet] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showQRSheet, setShowQRSheet] = useState(false)
  const [surveyUrl, setSurveyUrl] = useState('')

  const { customerId } = useParams() // URL 정보 받아오는 훅
  const [name, setName] = useState('')
  const [lastVisitAt, setLastVisitAt] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [visits, setVisits] = useState([])
  const [surveyData, setSurveyData] = useState(null)
  const [memo, setMemo] = useState('')
  const [originalMemo, setOriginalMemo] = useState('') // 원본 저장용

  const [toastMessage, setToastMessage] = useState('') // 토스트에 표시할 글자
  const [toastVisible, setToastVisible] = useState(false) // 보일지 말지
  const [toastType, setToastType] = useState(false)

  const isChanged = memo !== originalMemo
  const visitCount = visits.filter((visit) => visit.status === 'COMPLETED').length
  const hasSubmittedSurvey = visits.some((v) => v.status === 'SUBMITTED')

  console.log('surveyData:', surveyData)

  const [filterState, setFilterState] = useState({
    sort: 'latest',
    categories: [],
    period: 'all',
    startDate: '',
    endDate: '',
  })

  const SERVICE_CODE_MAP = { 컷: 'CUT', 펌: 'PERM', 컬러: 'COLOR', 클리닉: 'CLINIC' }

  const handleFilterApply = (values) => {
    setFilterState(values)
  }

  const toggleCategory = (cat) => {
    setFilterState((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }))
  }

  //히스토리 카드 필터 조건 함수
  const filteredVisits = useMemo(() => {
    let result = visits.filter((v) => v.status === 'COMPLETED')

    if (filterState.categories.length > 0) {
      const codes = filterState.categories.map((c) => SERVICE_CODE_MAP[c])
      result = result.filter((v) => codes.includes(v.services))
    }

    if (filterState.startDate || filterState.endDate) {
      const from = filterState.startDate ? new Date(filterState.startDate) : null
      const to = filterState.endDate ? new Date(filterState.endDate) : null
      result = result.filter((v) => {
        const d = new Date(v.visitDt)
        if (from && to) return d >= from && d <= to
        if (from) return d >= from
        if (to) return d <= to
        return true
      })
    } else if (filterState.period !== 'all') {
      const months = filterState.period === '1m' ? 1 : filterState.period === '3m' ? 3 : 6
      const now = new Date()
      const from = new Date(now.getFullYear(), now.getMonth() - months, now.getDate())
      result = result.filter((v) => new Date(v.visitDt) >= from)
    }

    return [...result].sort((a, b) => {
      const diff = new Date(b.visitDt) - new Date(a.visitDt)
      return filterState.sort === 'latest' ? diff : -diff
    })
  }, [visits, filterState])

  const navigate = useNavigate()
  const location = useLocation()
  const apiFetch = useApiFetch()

  const showToast = (message, type) => {
    setToastMessage(message) // 1. 메시지 넣기
    setToastVisible(true) // 2. 보이게 하기
    setToastType(type)

    setTimeout(() => {
      setToastVisible(false) // 3. 3초 후 다시 숨기기
    }, 3000)
  }

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, 'check')
    }
  }, [])

  //고객 상세 카드 api 요청 함수
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await apiFetch(`https://strnd-be.onrender.com/api/customers/${customerId}`)
        if (!response) return
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
        const response = await apiFetch(
          `https://strnd-be.onrender.com/api/customers/${customerId}/visits`,
        )
        if (!response) return

        const data = await response.json()

        setVisits(data)

        const submitted = data.find((v) => v.status === 'SUBMITTED')
        if (submitted) {
          const detailRes = await apiFetch(
            `https://strnd-be.onrender.com/api/visits/${submitted.visitId}`,
          )
          if (!detailRes) return
          const detail = await detailRes.json()
          setSurveyData(detail)
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error)
      }
    }
    fetchHistory()
  }, [])

  // 설문 없이 기록하기 함수
  const handleRecordWithoutSurvey = async () => {
    const response = await apiFetch('https://strnd-be.onrender.com/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: customerId, skipSurvey: true }),
    })
    if (!response) return

    const data = await response.json()

    navigate(`/customers/${customerId}/record`, { state: { visitId: data.visitId } })
  }

  //설문 기록하기 함수
  const startSurvey = async () => {
    if (hasSubmittedSurvey) {
      showToast('아직 진행중인 설문이 남았어요.', 'error')
      return
    }
    const response = await apiFetch('https://strnd-be.onrender.com/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: customerId }),
    })
    if (!response) return
    const data = await response.json()
    const isFirstVisit = visitCount === 0
    const url = `${window.location.origin}/survey/${data.visitId}?customerId=${customerId}&surveyToken=${data.surveyToken}&lastVisitDt=${encodeURIComponent(lastVisitAt ?? '')}&isFirstVisit=${isFirstVisit}`
    setSurveyUrl(url)
    setShowQRSheet(true)
  }

  // 메모 저장 함수
  const handleSaveMemo = async () => {
    await apiFetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: name, phone, gender, memo }),
    })

    setOriginalMemo(memo)
  }

  //고객 상세 status별 안내화면 분기처리 함수

  const handleDelete = async () => {
    const response = await apiFetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
      method: 'DELETE',
    })
    if (!response) return
    navigate('/home', { state: { toast: '고객이 삭제되었어요.' } })
  }

  return (
    <div style={{ height: '100dvh' }} className={`${baseTextClass} h-full flex flex-col`}>
      {/* 헤더 */}
      <PageHeader title="고객 상세" onBack={() => navigate('/home')} />

      {/* 컨텐츠 */}
      <div className="relative flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {isLoading ? (
          <div className="animate-pulse pt-12 pb-6 space-y-2">
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
            {/* 버튼 스켈레톤 */}
            <div className="mt-4 space-y-3">
              <div className="h-14 bg-border rounded-xl w-full" />
              <div className="h-4 bg-border rounded-md w-36 mx-auto" />
            </div>
            {/* 탭 스켈레톤 */}
            <div className="h-10 bg-border rounded-lg w-full mt-4" />
          </div>
        ) : (
          <div className=" top-0  fade-in pt-12 pb-5">
            <CustomerInfoCard
              name={name}
              isActive={isActive}
              visitCount={visitCount}
              lastVisitAt={lastVisitAt ? `마지막 방문 ${getElapsedTime(lastVisitAt)}` : '첫 방문'}
              phone={formatPhone(phone)}
              gender={formatGender(gender)}
              onEditClick={() =>
                navigate(`/customers/${customerId}/edit`, { state: { name, phone, gender, memo } })
              }
              onDeleteClick={() => setShowDeleteModal(true)}
            />
            <div className="mt-3">
              <Button value="설문 시작하기" height="lg" survey={true} onClick={startSurvey} />
              <div className="flex justify-center items-center py-4 px-3">
                <span
                  className="font-semibold text-placeholder text-center mr-2"
                  onClick={handleRecordWithoutSurvey}>
                  설문 없이 바로 기록하기
                </span>
                <img src="../img/right.svg" alt="" className="w-[5px]" />
              </div>
            </div>

            <>
              {/* 탭 */}
              <div className="bg-border w-full rounded-lg mb-[3px]">
                <ol className="flex gap-2 p-1">
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
                <>
                  <div className="flex items-center mb-[6px] mr-1 space-x-1 justify-between">
                    <div className="flex space-x-1 ">
                      {['컷', '펌', '컬러', '클리닉'].map((c) => (
                        <button
                          key={c}
                          onClick={() => toggleCategory(c)}
                          className="flex items-center gap-1 text-xs py-1">
                          <span
                            className={`px-3 py-1 rounded-md font-semibold transition-all ${
                              filterState.categories.includes(c)
                                ? 'bg-tint border border-brand text-brand'
                                : 'bg-border border border-border text-placeholder'
                            }`}>
                            {c}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div>
                      <button
                        onClick={() => setOpenSheet(true)}
                        className="flex items-center gap-1 text-xs text-placeholder font-medium py-1">
                        <div className="flex items-center mr-2 mb-[2px]">
                          <img src="../img/filter.svg" alt="" className="w-4" />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 -mt-[2px]">
                    {filteredVisits.length === 0 ? (
                      <div className="flex flex-col items-center mt-8">
                        <img src="../img/none.svg" alt="" />
                        <span className="text-base text-disabled font-semibold mt-3">
                          방문 기록이 없어요.
                        </span>
                      </div>
                    ) : (
                      filteredVisits.map((visit) => (
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
                      ))
                    )}
                  </div>
                </>
              )}

              {/*오늘 설문 */}
              {activeTab === 'todaySurvey' && (
                <div className="mt-2">
                  {visits.some((visit) => visit.status === 'SUBMITTED') ? (
                    <SurveyCard
                      data={surveyData}
                      onClick={() => {
                        navigate(`/customers/${customerId}/result`, {
                          state: {
                            visitId: visits.find((visit) => visit.status === 'SUBMITTED')?.visitId,
                          },
                        })
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center mt-8">
                      <img src="../img/none.svg" alt="" />
                      <span className="text-base text-disabled font-semibold mt-3">
                        작성된 설문이 아직 없어요.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* 메모 */}

              {activeTab === 'memo' && (
                <div className="mt-2">
                  <TextFiled
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    handleSaveMemo={handleSaveMemo}
                    disabled={!isChanged}
                    save={true}
                  />
                </div>
              )}
            </>
          </div>
        )}
      </div>
      {openSheet && (
        <Filter
          title="히스토리 정렬 필터"
          onClose={() => setOpenSheet(false)}
          onApply={handleFilterApply}
          hideCategory={true}
          initialValues={filterState}
        />
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
          <div className="bg-card-bg rounded-xl w-[330px] p-5 flex flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-4 pt-2">
              <img src="/img/warning.svg" alt="" className="w-6 h-6" />
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-base font-semibold text-primary">
                  정말 <span className="text-brand">삭제</span>할까요?
                </p>
                <p className="text-xs font-medium text-placeholder">
                  삭제한 고객 정보는 복구할 수 없어요
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <button
                className="flex-1 h-[45px] rounded-lg bg-disabled text-white text-sm font-semibold"
                onClick={() => setShowDeleteModal(false)}>
                취소
              </button>
              <button
                className="flex-1 h-[45px] rounded-lg bg-brand text-white text-sm font-semibold"
                onClick={handleDelete}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {showQRSheet && <QRBottomSheet surveyUrl={surveyUrl} onClose={() => setShowQRSheet(false)} />}
      <Toast message={toastMessage} visible={toastVisible} type={toastType} />
    </div>
  )
}
