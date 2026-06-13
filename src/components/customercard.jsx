const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `

export default function CustomerCard({
  key,
  customerId,
  customerName,
  isActive,
  Phone,
  elapsedDays,
  onClick,
}) {
  return (
    <button
      className={`${baseClass}  ${isActive === false ? 'opacity-50' : ''} focus:border-border`}
      onClick={onClick}>
      <div className="flex justify-between mb-3">
        <div className="flex items-center justify-center">
          {isActive === false && (
            <span className="text-xs font-bold text-secondary mr-2">비활성</span>
          )}
          <span className="text-base font-semibold text-secondary">{customerName}</span>
        </div>
        <span className="text-xs font-medium text-placeholder">{elapsedDays} </span>
      </div>
      <div className="text-left text-xs font-medium text-disabled">{Phone}</div>
    </button>
  )
}
