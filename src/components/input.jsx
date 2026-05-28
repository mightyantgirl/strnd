//공통 인풋박스 컴포넌트

const baseClass = `
w-full py-5 px-4 rounded-xl text-xs font-medium focus:outline-none
`

const stateClass = `bg-card-bg text-primary border border-card-bg focus:border-focus placeholder:text-placeholder text-sm `

export default function Input({ label, value, onChange, placeholder, error }) {
  return (
    <div className="w-full mb-5">
      <label>
        <p className="mb-2 text-sm font-semibold">{label}</p>
      </label>
      <input
        style={{ lineHeight: '1' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClass} ${stateClass} ${error ? 'border-danger' : 'border-border'}`}></input>
      {error && <p className="text-tiny text-danger">{error}</p>}
    </div>
  )
}
