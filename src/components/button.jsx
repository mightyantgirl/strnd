//공용 버튼 컴포넌트

const variantClass = {
  primary: 'bg-brand text-white disabled:bg-disabled',
  secondary: 'bg-tint text-brand focus:bg-tint disabled:border-disabled disabled:text-disabled',
  ghost: 'bg-disabled text-white hover:text-primary disabled:text-disabled',
}

const heightClass = {
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
}

export default function Button({
  variant = 'primary',
  value = '',
  children,
  onClick,
  disabled = false,
  className = '',
  height = 'md',
  survey = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full rounded-lg text-base font-semibold
        transition-all cursor-pointer
        disabled:cursor-not-allowed
        ${variantClass[variant]}
        ${className}
        ${heightClass[height]}
      `}>
      {survey ? (
        <p className="flex justify-between px-4">
          {children ?? value}
          <img src="/img/next.svg" />
        </p>
      ) : (
        <p className="px-4">{children ?? value}</p>
      )}
    </button>
  )
}
