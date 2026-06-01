//visitCard 내부 badge 컴포넌트

const baseClass = 'px-2 py-1 rounded-sm text-label font-semibold w-fit '
const variantClass = {
  green: 'bg-badge-green-bg text-badge-green-text',
  blue: 'bg-badge-blue-bg text-badge-blue-text',
  purple: 'bg-badge-purple-bg text-badge-purple-text',
  orange: 'bg-badge-orange-bg text-badge-orange-text',
  rose: 'bg-badge-rose-bg text-badge-rose-text',
}

export default function Badge({ color = '', label }) {
  return <div className={`${baseClass} ${variantClass[color]}`}>{label}</div>
}
