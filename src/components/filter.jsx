import { useState } from 'react'
import Button from '../components/button'

const SORT_OPTIONS = [
  { label: '최신 순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
]

const CATEGORY_OPTIONS = ['컷', '펌', '컬러', '클리닉', '상담']

const PERIOD_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '1개월', value: '1m' },
  { label: '3개월', value: '3m' },
  { label: '6개월', value: '6m' },
]

const activeChip = 'bg-tint border border-brand text-brand font-bold'
const inactiveChip = 'bg-bg border border-transparent text-disabled font-medium'
const baseChip = 'px-3 py-2 rounded-sm text-xs cursor-pointer transition-all shrink-0'

export default function Filter({ onClose, onApply }) {
  const [sort, setSort] = useState('latest')
  const [categories, setCategories] = useState([])
  const [period, setPeriod] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e) => setStartY(e.touches[0].clientY)
  const handleTouchEnd = (e) => {
    if (e.changedTouches[0].clientY - startY > 80) onClose()
  }

  const toggleCategory = (cat) => {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black/10 z-10" onClick={onClose} />

      <div className="fixed bg-card-bg bottom-0 left-0 w-full px-5   py-4  pt-3  rounded-tl-xl rounded-tr-xl z-10">
        {/* 드래그 핸들 */}
        <div
          className="flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          <div className="bg-border rounded-full w-13 h-[6px]" />
        </div>

        {/* 타이틀 */}
        <div className="py-5 mb-2 flex items-center justify-between ">
          <p className="text-base font-semibold text-primary">히스토리 정렬 필터</p>
        </div>
        <div className="flex flex-col space-y-8">
          {/* 기본 정렬 */}
          <div className="flex flex-col gap-[16px]">
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

          {/* 서비스 카테고리 */}
          <div className="flex flex-col gap-[16px]">
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

          {/* 조회 기간 */}
          <div className="flex flex-col gap-[16px]">
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
            <div className="flex gap-5 mt-[23px]">
              <div className="flex-1 flex items-center justify-between bg-card-bg border border-border rounded-lg px-3 h-10">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 text-xs text-placeholder bg-transparent outline-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                  placeholder="0000-00-00"
                />
                <img src="/img/bottom.svg" alt="" className="w-[13px] h-[14px] shrink-0" />
              </div>
              <div className="flex-1 flex items-center justify-between bg-card-bg border border-border rounded-lg px-3 h-10">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 text-xs text-placeholder bg-transparent outline-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                  placeholder="0000-00-00"
                />
                <img src="/img/bottom.svg" alt="" className="w-[13px] h-[14px] shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* 적용 버튼 */}
        <div className="mt-[40px]">
          <Button
            value="적용"
            onClick={() => onApply?.({ sort, categories, period, startDate, endDate })}
          />
        </div>
      </div>
    </div>
  )
}
