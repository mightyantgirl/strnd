//공통 인풋박스 컴포넌트

const baseClass = `w-full py-5 px-4 rounded-xl text-base font-medium focus:outline-none`
const labelClass = `mb-2 text-base font-semibold leading-none`
const stateClass = `bg-card-bg text-primary focus:border-focus border border-card-bg placeholder:text-placeholder text-sm `

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  subtext,
  search,
  required,
  filter,
  onFilterClick,
  onKeyDown,
  type = 'text',
  maxLength,
  inputMode,
  className = '',
}) {
  return (
    <div className="w-full relative">
      {label && (
        <label className="flex gap-2 ml-1">
          <p className={labelClass}>{label}</p>
          {required && <span className={`${labelClass} text-brand`}>필수</span>}
          {!required && <span className={`${labelClass} text-placeholder`}>선택</span>}
        </label>
      )}

      <input
        style={{ height: '52px' }}
        placeholder={placeholder}
        value={value}
        type={type}
        onKeyDown={onKeyDown}
        inputMode={inputMode}
        subtext={subtext}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        className={`${baseClass} ${stateClass} ${error ? 'border-danger' : 'border-border'} ${className} ${search ? 'pl-12' : ''}`}></input>
      {subtext && !error && (
        <p className="text-xs font-medium text-placeholder mt-2 pl-1">{subtext}</p>
      )}
      {error && <p className="text-xs font-medium text-danger mt-1 pl-1">{error}</p>}
      {search && (
        <img src="./img/search.svg" alt="" className="absolute left-5 top-1/2 -translate-y-1/2 " />
      )}
      {filter && (
        <img
          src="./img/filter.svg"
          alt="필터"
          onClick={onFilterClick}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] cursor-pointer"
        />
      )}
    </div>
  )
}
