//공통 인풋박스 컴포넌트

const baseClass = `w-full py-5 px-4 rounded-xl text-xs font-medium focus:outline-none`
const labelClass = `mb-2 text-xs font-semibold leading-none`
const stateClass = `bg-card-bg text-primary border border-card-bg focus:border-focus placeholder:text-placeholder text-sm `

export default function Input({ label, value, onChange, placeholder, error, required }) {
  return (
    <div className="w-full mb-5">
      {label && (
        <label className="flex gap-2">
          <p className={labelClass}>{label}</p>
          {required && <span className={`${labelClass} text-brand`}>필수</span>}
          {!required && <span className={`${labelClass} text-placeholder`}>선택</span>}
        </label>
      )}
      <input
        style={{ height: '52px' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClass} ${stateClass} ${error ? 'border-danger' : 'border-border'}`}></input>
      {error && <p className="text-tiny text-danger">{error}</p>}
    </div>
  )
}
