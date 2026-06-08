//공통 인풋박스 컴포넌트

const baseClass = `w-full py-5 px-4 rounded-xl text-base font-medium focus:outline-none`
const labelClass = `mb-2 text-base font-semibold leading-none`
const stateClass = `bg-card-bg text-primary border focus:border-focus placeholder:text-placeholder text-sm `

export default function Input({ label, value, onChange, placeholder, error, search, required, type = 'text', maxLength, inputMode, className = '' }) {
  return (
    <div className="w-full relative">
      {label && (
        <label className="flex gap-2">
          <p className={labelClass}>{label}</p>
          {required && <span className={`${labelClass} text-brand`}>필수</span>}
          {!required && <span className={`${labelClass} text-placeholder`}>선택</span>}
        </label>
      )}

      <input style={{ height: '52px' }} placeholder={placeholder} value={value} type={type} inputMode={inputMode} maxLength={maxLength} onChange={onChange} className={`${baseClass} ${stateClass} ${error ? 'border-danger' : 'border-border'} ${className}`}></input>
      {error && <p className="text-xs font-medium text-danger mt-1">{error}</p>}
      {search && <img src="./img/search.svg" alt="" className="absolute right-5 top-1/2 -translate-y-1/2 " />}
    </div>
  )
}
