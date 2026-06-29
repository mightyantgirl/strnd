import { useState, useEffect } from 'react'
import Button from '../components/button'
import Toast from '../components/toast'

const SORT_OPTIONS = [
  { label: '최신 순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
]

const CATEGORY_OPTIONS = ['컷', '펌', '컬러', '클리닉']

const PERIOD_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '1개월', value: '1m' },
  { label: '3개월', value: '3m' },
  { label: '6개월', value: '6m' },
]

const activeChip = 'bg-tint border border-brand text-brand font-bold'
const inactiveChip = 'bg-bg border border-transparent text-disabled font-medium'
const baseChip = 'px-3 py-2 rounded-sm text-xs cursor-pointer transition-all shrink-0'

export default function Filter({ onClose, onApply, initialValues, hideCategory, title, showViewToggle }) {
  const [sort, setSort] = useState(initialValues?.sort ?? 'latest')
  const [categories, setCategories] = useState(initialValues?.categories ?? [])
  const [period, setPeriod] = useState(initialValues?.period ?? 'all')
  const [startDate, setStartDate] = useState(initialValues?.startDate ?? '')
  const [endDate, setEndDate] = useState(initialValues?.endDate ?? '')
  const [viewAll, setViewAll] = useState(initialValues?.viewAll ?? false)

  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const [mounted, setMounted] = useState(false)
  const [startY, setStartY] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleClose = () => {
    setMounted(false)
    setTimeout(onClose, 300)
  }

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    const diff = e.touches[0].clientY - startY
    if (diff > 0) setDragY(diff)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (dragY > 80) {
      handleClose()
    } else {
      setDragY(0)
    }
  }

  const toggleCategory = (cat) => {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const handleReset = () => {
    setSort('latest')
    setCategories([])
    setPeriod('all')
    setStartDate('')
    setEndDate('')
    setViewAll(false)
    onApply?.({ sort: 'latest', categories: [], period: 'all', startDate: '', endDate: '', viewAll: false })
    handleClose()
  }

  const overlayOpacity = mounted ? Math.max(0, 1 - dragY / 300) : 0

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black/50 z-10"
        style={{
          opacity: overlayOpacity,
          transition: isDragging ? 'none' : 'opacity 0.3s ease',
        }}
        onClick={handleClose}
      />

      <div
        className="fixed bg-card-bg bottom-0 left-0 w-full px-5 py-4 rounded-tl-xl rounded-tr-xl z-10"
        style={{
          transform: mounted ? `translateY(${dragY}px)` : 'translateY(100%)',
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
        {/* 드래그 핸들 */}
        <div
          className="flex justify-center"
          style={{ touchAction: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className="bg-border rounded-full w-13 h-[6px]" />
        </div>

        {/* 타이틀 */}
        <div className="py-5 mb-2 flex items-center justify-between">
          <span className="text-base font-semibold text-primary">{title}</span>
          <span className="text-base font-semibold text-placeholder"></span>

          <button onClick={handleReset}>
            <div className="flex items-center justify-between">
              <img src="/img/retrun.svg" alt="필터 초기화" className="w-3 h-3 mr-2" />
              <span className="text-base font-semibold text-placeholder mr-1">초기화</span>
            </div>
          </button>
        </div>

        <div className="flex flex-col space-y-6">
          {/* 보기 방식 */}
          {showViewToggle && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-primary">보기 방식</p>
              <div className="flex gap-2">
                <button
                  className={`${baseChip} ${!viewAll ? activeChip : inactiveChip}`}
                  onClick={() => setViewAll(false)}>
                  최근 방문순
                </button>
                <button
                  className={`${baseChip} ${viewAll ? activeChip : inactiveChip}`}
                  onClick={() => setViewAll(true)}>
                  전체보기
                </button>
              </div>
            </div>
          )}

          {/* 기본 정렬 */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-primary">기본 정렬</p>
            <div className="flex gap-2">
              {SORT_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`${baseChip} ${sort === value ? activeChip : inactiveChip}`}
                  onClick={() => setSort(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 서비스 카테고리
          {!hideCategory && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-primary">서비스 카테고리</p>
              <div className="flex gap-2 flex-wrap">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    className={`${baseChip} ${categories.includes(cat) ? activeChip : inactiveChip}`}
                    onClick={() => toggleCategory(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* 조회 기간 */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-primary">조회 기간</p>
            <div className="flex gap-2">
              {PERIOD_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`${baseChip} ${period === value ? activeChip : inactiveChip}`}
                  onClick={() => setPeriod(value)}>
                  {label}
                </button>
              ))}
            </div>
            {/* 날짜 range */}
            <div className="flex gap-5">
              <input
                type="date"
                value={startDate}
                placeholder="0000.00.00"
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 text-xs text-placeholder bg-card-bg border border-border rounded-lg px-3 h-10 outline-none"
              />
              <input
                type="date"
                placeholder="0000.00.00"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 text-xs text-placeholder bg-card-bg border border-border rounded-lg px-3 h-10 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 적용 버튼 */}
        <div className="mt-[40px]">
          <Button
            value="적용"
            onClick={() => {
              if (startDate && endDate && startDate > endDate) {
                showToast('시작일이 종료일보다 늦을 수 없어요.')
                return
              }
              onApply?.({ sort, categories, period, startDate, endDate, viewAll })
              handleClose()
            }}
          />
        </div>
      </div>
      <Toast message={toastMessage} visible={toastVisible} type="error" />
    </div>
  )
}
