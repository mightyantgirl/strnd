const baseClass = `w-full py-5 px-4 rounded-xl border border-bg bg-card-bg `

export default function CustomerCard({ customerId, customerPhone, elapsedDays, onClick }) {
  return (
    <button className={`${baseClass} focus:border-border`} onClick={onClick}>
      <div className="flex justify-between mb-3">
        <p className="text-base font-semibold text-secondary">{customerId}</p>
        <p className="text-xs font-medium text-placeholder"> {customerPhone}</p>
      </div>
      <div className="text-left text-xs font-medium text-disabled">{elapsedDays}</div>
    </button>
  )
}
