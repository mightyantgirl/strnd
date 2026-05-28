import { useState, useEffect } from 'react'

const baseClass = `
  w-full py-5 px-4 rounded-xl border border-bg bg-card-bg text-xs text-left font-medium items-center focus:outline-border
`
const labelClass = `mb-2 text-sm font-semibold leading-none`

export default function Dropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)

  // 외부 클릭 시 닫힘
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.dropdown')) setIsOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <div className="dropdown relative w-full">
      <p className={labelClass}>서비스 카테고리</p>
      {/* 선택창 */}
      <button onClick={() => setIsOpen(!isOpen)} className={baseClass}>
        <div className="flex justify-between items-center">
          <span className={selectedLabel ? 'text-primary leading-none' : 'text-placeholder leading-none'}>{selectedLabel || placeholder}</span>
          {isOpen ? (
            <img className="block mr-2" style={{ width: '10px', height: '5px' }} src="/img/top.svg" />
          ) : (
            <img className="block mr-2" style={{ width: '10px', height: '5px' }} src="/img/bottom.svg" />
          )}
        </div>
        {isOpen && (
          <div
            className="
                        bg-card-bg rounded-xl
                        overflow-hidden z-10">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full py-2 mt-3 text-left text-xs text-primary
                         focus:bg-tint transition-all">
                {option.label}
              </button>
            ))}
          </div>
        )}
      </button>
    </div>
  )
}
