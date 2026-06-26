//visitCard 내부 badge 컴포넌트

const baseClass = 'px-2 py-1 rounded-sm text-label text-xxs font-semibold w-fit '
const variantClass = {
  green: 'bg-badge-green-bg text-badge-green-text',
  blue: 'bg-badge-blue-bg text-badge-blue-text',
  purple: 'bg-badge-purple-bg text-badge-purple-text',
  orange: 'bg-badge-orange-bg text-badge-orange-text',
  rose: 'bg-badge-rose-bg text-badge-rose-text',
  grey: 'bg-bg text-placeholder',
}

export default function Badge({ color, label, service }) {
  const serviceMap = {
    CUT: { color: 'green', label: '컷' },
    COLOR: { color: 'blue', label: '컬러' },
    PERM: { color: 'purple', label: '펌' },
    CLINIC: { color: 'orange', label: '클리닉' },
  }

  // service 있으면 map에서 꺼내고, 없으면 props 그대로 써
  const finalColor = serviceMap[service]?.color ?? color
  const finalLabel = serviceMap[service]?.label ?? label

  return <span className={`${baseClass} ${variantClass[finalColor]}`}>{finalLabel}</span>
}
