//공용 버튼 컴포넌트

const variantClass = {
  primary: 'bg-brand text-white focus:bg-shade disabled:bg-disabled',
  secondary: 'bg-bg text-brand border border-brand focus:bg-tint disabled:border-disabled disabled:text-disabled',
  //   ghost: 'bg-disabled text-white hover:text-primary disabled:text-disabled',
}

export default function Button({ variant = 'primary', children, onClick, disabled = false, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-5 rounded-lg text-lg font-semibold
        transition-all cursor-pointer
        disabled:cursor-not-allowed
        ${variantClass[variant]}
        ${className}
      `}>
      {children}
    </button>
  )
}
