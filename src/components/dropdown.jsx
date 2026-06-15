import { useState, useEffect } from 'react'

const baseClass = ` w-full py-5 px-4 rounded-xl bg-card-bg text-base text-left font-medium items-center border border-card-bg focus:outline-border placeholder:text-base`
const labelClass = `flex mb-2 text-base font-semibold leading-none`

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  error,
  required,
  label,
}) {
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
      {label && (
        <label className="flex gap-2">
          <p className={labelClass}>{label}</p>
          {required && <span className={`${labelClass} text-brand`}>필수</span>}
          {!required && <span className={`${labelClass} text-placeholder`}>선택</span>}
        </label>
      )}
      {/* 선택창 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${baseClass} ${error ? 'border-danger' : 'border-card-bg'}`}>
        <div className="flex justify-between items-center">
          <span
            className={` ${selectedLabel ? 'text-primary leading-none' : 'text-placeholder  leading-none'}`}>
            {selectedLabel || placeholder}
          </span>
          {isOpen ? (
            <img
              className="block mr-2"
              style={{ width: '10px', height: '5px' }}
              src="/img/top.svg"
            />
          ) : (
            <img
              className="block mr-2"
              style={{ width: '10px', height: '5px' }}
              src="/img/bottom.svg"
            />
          )}
        </div>
      </button>
      {error && <p className="text-xs font-medium text-danger mt-1 pl-2">{error}</p>}

      {/* 드랍다운 클릭 시 열리는 화면 */}
      {isOpen && (
        <div
          className="w-full left-0 absolute
                        bg-card-bg rounded-xl
                        overflow-hidden z-10 top-14 py-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="w-full py-3 px-4 mt-3  text-left text-base text-primary
                         focus:bg-tint transition-all">
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
