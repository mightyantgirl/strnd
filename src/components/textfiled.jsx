const baseClass = `w-full py-5 px-4 rounded-xl text-xs font-medium focus:outline-none`
const stateClass = `bg-card-bg text-primary border border-card-bg focus:border-focus placeholder:text-placeholder text-sm `

export default function TextFiled({
  value,
  placeholder,
  onChange,
  error,
  disabled,
  handleSaveMemo,
  type = 'text',
  maxLength,
}) {
  return (
    <div className="w-full mb-4 relative">
      {/* {label && (
        <label className="flex gap-2">
          <p className={labelClass}>{label}</p>
          {required && <span className={`${labelClass} text-brand`}>필수</span>}
          {!required && <span className={`${labelClass} text-placeholder`}>선택</span>}
        </label>
      )} */}
      <textarea
        style={{ height: '150px' }}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        className={`${baseClass} ${stateClass} ${error ? 'border-danger' : 'border-border'} resize-none`}></textarea>
      {error && <p className="text-xs font-medium text-danger mt-1">{error}</p>}

      <button
        className="absolute py-2 px-3 right-4 bottom-4 content-center  rounded-sm bg-tint text-brand font-semibold disabled:bg-bg disabled:text-white"
        onClick={handleSaveMemo}
        disabled={disabled}>
        저장
      </button>
    </div>
  )
}
