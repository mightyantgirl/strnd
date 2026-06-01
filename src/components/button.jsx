//공용 버튼 컴포넌트

const variantClass = {
  primary: 'bg-brand text-white focus:bg-shade disabled:bg-disabled',
  secondary: 'bg-tint text-brand focus:bg-tint disabled:border-disabled disabled:text-disabled',
  //   ghost: 'bg-disabled text-white hover:text-primary disabled:text-disabled',
}

export default function Button({ variant = 'primary', value, onClick, disabled = false, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 rounded-lg text-base font-semibold
        transition-all cursor-pointer
        disabled:cursor-not-allowed
        ${variantClass[variant]}
        ${className}
      `}>
      {value}
    </button>
  )
}
