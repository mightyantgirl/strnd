import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useMemo } from 'react'

import Input from './../../components/input'
import CustomerCard from './../../components/customercard'
import PageFooter from './../../components/pagefooter'
import Filter from './../../components/filter'

import { getElapsedTime, formatPhone } from '../../utils/dateUtils'
import useAuthGuard from '../../hooks/useAuthGuard'
import useApiFetch from '../../hooks/useApiFetch'

const baseTextClass = `text-base text-placeholder font-medium`
const PAGE_SIZE = 20

export default function Home() {
  useAuthGuard()

  const [recentCards, setRecentCards] = useState([])
  const [searchCards, setSearchCards] = useState([])
  const [allCustomers, setAllCustomers] = useState([])
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE)
  const [isViewAll, setIsViewAll] = useState(false)
  const [isLoadingAll, setIsLoadingAll] = useState(false)
  const [openHomeFilter, setOpenHomeFilter] = useState(false)
  const [homeFilter, setHomeFilter] = useState({
    sort: 'latest',
    period: 'all',
    startDate: '',
    endDate: '',
  })

  const [monthlyCount, setMonthlyCount] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const apiFetch = useApiFetch()

  const loaderRef = useRef(null)

  const designerName =
    localStorage.getItem('designerName') || sessionStorage.getItem('designerName')

  useEffect(() => {
    setIsViewAll(false)

    //최근 5명 불러오기
    const fetchHome = async () => {
      try {
        const response = await apiFetch('https://strnd-be.onrender.com/api/home?limit=5')
        if (!response) return

        const data = await response.json()

        setRecentCards(data.customers ?? [])
        setMonthlyCount(data.monthlyVisitCount)
      } catch (error) {
        console.error('홈 데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchHome()
  }, [location])

  useEffect(() => {
    if (!searchKeyword) return

    const fetchSearch = async () => {
      try {
        const response = await apiFetch(
          `https://strnd-be.onrender.com/api/customers?keyword=${searchKeyword}`,
        )
        if (!response) return
        const data = await response.json()
        setSearchCards(data)
      } catch (error) {
        console.error('검색 실패:', error)
      }
    }
    fetchSearch()
  }, [searchKeyword])

  // 전체 고객 불러오기
  const handleViewAll = async () => {
    setIsLoadingAll(true)
    try {
      const response = await apiFetch('https://strnd-be.onrender.com/api/home')
      if (!response) return

      const data = await response.json()

      setAllCustomers(data.customers ?? [])
      setDisplayedCount(PAGE_SIZE)
      setIsViewAll(true)
    } catch (error) {
      console.error('전체 고객 로딩 실패:', error)
    } finally {
      setIsLoadingAll(false)
    }
  }

  //20명씩로드 무한스크롤
  useEffect(() => {
    if (!isViewAll) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < allCustomers.length) {
          setDisplayedCount((prev) => prev + PAGE_SIZE)
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [isViewAll, displayedCount, allCustomers.length])

  const filteredAllCustomers = useMemo(() => {
    let result = [...allCustomers]

    if (homeFilter.startDate || homeFilter.endDate) {
      const from = homeFilter.startDate ? new Date(homeFilter.startDate) : null
      const to = homeFilter.endDate ? new Date(homeFilter.endDate) : null
      result = result.filter((c) => {
        const d = new Date(c.lastVisitDt)
        if (from && to) return d >= from && d <= to
        if (from) return d >= from
        if (to) return d <= to
        return true
      })
    } else if (homeFilter.period !== 'all') {
      const months = homeFilter.period === '1m' ? 1 : homeFilter.period === '3m' ? 3 : 6
      const now = new Date()
      const from = new Date(now.getFullYear(), now.getMonth() - months, now.getDate())
      result = result.filter((c) => new Date(c.lastVisitDt) >= from)
    }

    return result.sort((a, b) => {
      const diff = new Date(b.lastVisitDt) - new Date(a.lastVisitDt)
      return homeFilter.sort === 'latest' ? diff : -diff
    })
  }, [allCustomers, homeFilter])

  const displayedCustomers = filteredAllCustomers.slice(0, displayedCount)
  const hasMore = displayedCount < filteredAllCustomers.length

  return (
    <div style={{ height: '100dvh' }} className="flex flex-col">
      <div className="w-full bg-bg fixed pr-9 pb-4 z-10">
        <div className="flex gap-5 mt-4 items-center justify-between ml-1">
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

      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="pt-20 pb-6 mb-15 space-y-8">
              <div className="space-y-4">
                <div className="h-7 bg-border rounded-lg w-48" />
                <div className="h-7 bg-border rounded-lg w-36" />
                <div className="h-4 bg-border rounded-md w-40" />
              </div>
              <div className="h-11 bg-border rounded-xl w-full" />
            </div>
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
            <div className={`${baseTextClass} pt-18 pb-8 mb-15`}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold text-primary mb-4 ml-1  ">
                    안녕하세요, <span className="text-brand">{designerName}</span> 님! <br />
                    <span>오늘도 좋은 하루 되세요.</span>
                  </h1>
                  <p className="text-placeholder ml-1">이번 달 총 {monthlyCount}명 방문했어요</p>
                </div>
                <Input
                  search={true}
                  value={searchKeyword}
                  className="border border-brand"
                  placeholder="고객 이름 검색"
                  filter={true}
                  onFilterClick={() => setOpenHomeFilter(true)}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>

            {/* 섹션 헤더 */}
            <div className="flex justify-between items-center text-placeholder">
              <span className={`${baseTextClass} font-semibold mb-3 ml-2`}>
                {searchKeyword ? '검색 결과' : isViewAll ? '전체 고객' : '최근 방문 고객'}
              </span>
            </div>

            {/* 카드 리스트 */}
            <div className="space-y-2">
              {searchKeyword ? (
                <>
                  {!searchCards.length ? (
                    <p className="text-placeholder text-base text-center py-10">
                      검색 결과가 없습니다.
                    </p>
                  ) : (
                    searchCards.map((card) => (
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
                </>
              ) : isViewAll ? (
                <>
                  {!displayedCustomers.length ? (
                    <p className="text-placeholder text-base text-center py-10">고객이 없습니다.</p>
                  ) : (
                    displayedCustomers.map((card) => (
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
                  <div ref={loaderRef} className="py-4 text-center">
                    {hasMore && <span className="text-placeholder text-xs">불러오는 중...</span>}
                  </div>
                </>
              ) : (
                <>
                  {!recentCards.length ? (
                    <p className="text-placeholder text-base text-center py-10">
                      방문 고객이 없습니다.
                    </p>
                  ) : (
                    recentCards.map((card) => (
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <PageFooter onNext={() => navigate('/customers/new')} value="+ 신규 고객 등록" />
      {openHomeFilter && (
        <Filter
          title="고객 필터"
          onClose={() => setOpenHomeFilter(false)}
          onApply={(values) => {
            setHomeFilter({
              sort: values.sort,
              period: values.period,
              startDate: values.startDate,
              endDate: values.endDate,
            })
            setDisplayedCount(PAGE_SIZE)
            if (values.viewAll && !isViewAll) {
              handleViewAll()
            } else if (!values.viewAll && isViewAll) {
              setIsViewAll(false)
            }
          }}
          initialValues={{ ...homeFilter, categories: [], viewAll: isViewAll }}
          hideCategory={true}
          showViewToggle={true}
        />
      )}
    </div>
  )
}
