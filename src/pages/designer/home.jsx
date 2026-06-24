import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Input from './../../components/input'
import CustomerCard from './../../components/customercard'
import PageFooter from './../../components/pagefooter'

import { getElapsedTime, formatPhone } from '../../utils/dateUtils'
import useAuthGuard from '../../hooks/useAuthGuard'

const baseTextClass = `text-base text-primary font-medium`

export default function Home() {
  useAuthGuard()

  const [recentCards, setRecentCards] = useState([]) // 홈 API 데이터
  const [searchCards, setSearchCards] = useState([]) // 검색 API 데이터

  const [monthlyCount, setMonthlyCount] = useState(0) // 이번 달 방문자 수
  const [searchKeyword, setSearchKeyword] = useState('') // 검색어
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // 디자이너 이름 정보 변수
  const designerName =
    localStorage.getItem('designerName') || sessionStorage.getItem('designerName')

  // 실시간 검색 필터링
  const displayCards = searchKeyword ? searchCards : recentCards

  //고객 카드 데이터 함수 페이지 열릴 때 API 호출
  useEffect(() => {
    const fetchHome = async () => {
      try {
        //로그인 단계에서 저장된 토큰 꺼내기
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        const response = await fetch('https://strnd-be.onrender.com/api/home', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        //인증 만료 시 로그인 화면 이동
        if (response.status === 401) {
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          navigate('/login')
          return
        }

        const data = await response.json()

        setRecentCards(data.recentCustomers)
        setMonthlyCount(data.monthlyVisitCount)
      } catch (error) {
        console.error('홈 데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchHome()
  }, [location]) // location 바뀔때마다 다시 호출

  // 검색 될 때 마다 검색 api 호출
  useEffect(() => {
    if (!searchKeyword) return

    const fetchSearch = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        const response = await fetch(
          `https://strnd-be.onrender.com/api/customers?keyword=${searchKeyword}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        const data = await response.json()
        setSearchCards(data)
      } catch (error) {
        console.error('검색 실패:', error)
      }
    }
    fetchSearch()
  }, [searchKeyword]) // 검색어 바뀔때마다

  return (
    <div style={{ height: '100dvh' }} className="flex flex-col">
      <div className="w-full bg-bg fixed pr-9 pb-6 z-10">
        <div className="flex gap-5 mt-4 items-center justify-between">
          <img src="/img/strnd.svg" className="w-22" alt="로고" />

          <button
            className="text-placeholder text-base font-semibold mr-2"
            type="button"
            alt="로그아웃"
            onClick={() => {
              sessionStorage.removeItem('token')
              localStorage.removeItem('token')
              navigate('/login')
            }}>
            logout
          </button>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {isLoading ? (
          <div className="animate-pulse">
            {/* 타이틀 스켈레톤 */}
            <div className="pt-20 pb-6 mb-15 space-y-8">
              <div className="space-y-4">
                <div className="h-7 bg-border rounded-lg w-48" />
                <div className="h-7 bg-border rounded-lg w-36" />
                <div className="h-4 bg-border rounded-md w-40" />
              </div>
              <div className="h-11 bg-border rounded-xl w-full" />
            </div>
            {/* 카드 스켈레톤 */}
            <div className="h-4 bg-border rounded-md w-16 mb-3" />
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-full py-5 px-4 rounded-xl bg-card-bg">
                  <div className="flex justify-between mb-3">
                    <div className="h-4 bg-border rounded-md w-20" />
                    <div className="h-4 bg-border rounded-md w-14" />
                  </div>
                  <div className="h-3 bg-border rounded-md w-28" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="fade-in">
            {/* 컨텐츠 - 메인타이틀 */}
            <div className={`${baseTextClass} pt-18 pb-8 mb-15`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold text-primary mb-4">
                    안녕하세요, <span className="text-brand">{designerName}</span> 님! <br />
                    <span>오늘도 좋은 하루 되세요.</span>
                  </h1>
                  <p className="text-placeholder">이번 달 총 {monthlyCount}명 방문했어요</p>
                </div>
                {/*검색 인풋*/}
                <Input
                  search={true}
                  value={searchKeyword}
                  className="border border-brand"
                  placeholder="고객 이름 검색"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>

            {/* 컨텐츠 - 검색 내역 */}
            {/* 최근 방문 고객 최대 5명 */}
            {!searchKeyword ? (
              <p className={`${baseTextClass} font-semibold mb-3`}>최근 방문 고객</p>
            ) : (
              <p className={`${baseTextClass} font-semibold mb-3`}>검색 결과</p>
            )}
            <div className="space-y-2">
              {!displayCards.length ? (
                <p className="text-placeholder text-base text-center py-10">
                  {searchKeyword ? '검색 결과가 없습니다.' : '방문 고객이 없습니다.'}
                </p>
              ) : (
                displayCards.map((card) => (
                  <CustomerCard
                    key={card.customerId}
                    isActive={card.isActive}
                    customerId={card.customerId}
                    customerName={card.customerName}
                    Phone={formatPhone(card.phone)}
                    elapsedDays={getElapsedTime(card.lastVisitDt)}
                    onClick={() => navigate(`/customers/${card.customerId}`)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {/* 푸터 */}
      <PageFooter onNext={() => navigate('/customers/new')} value="+ 신규 고객 등록" />
    </div>
  )
}
