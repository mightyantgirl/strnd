const baseClass = `w-full py-5 px-4 rounded-xl text-xs font-medium focus:outline-none`
const labelClass = `mb-2 text-xs font-semibold leading-none`
const stateClass = `bg-card-bg text-primary border border-card-bg focus:border-focus placeholder:text-placeholder text-sm `

export default function TextFiled({ label, value, onChange, placeholder, error, required, type = 'text', maxLength }) {
  return (
    <div className="w-full mb-4">
      {/* {label && (
        <label className="flex gap-2">
          <p className={labelClass}>{label}</p>
          {required && <span className={`${labelClass} text-brand`}>필수</span>}
          {!required && <span className={`${labelClass} text-placeholder`}>선택</span>}
        </label>
      )} */}
      <textarea style={{ height: '150px' }} placeholder={placeholder} value={value} maxLength={maxLength} onChange={onChange} className={`${baseClass} ${stateClass} ${error ? 'border-danger' : 'border-border'} resize-none`}></textarea>
      {error && <p className="text-xs font-medium text-danger mt-1">{error}</p>}
    </div>
  )
}
