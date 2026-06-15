const toastBase =
  'flex items-center fixed bottom-30 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap'

const toastVariant = {
  base: 'bg-secondary text-white',
  error: 'bg-badge-rose-bg text-badge-rose-text',
  check: 'bg-tint text-brand',
}

const iconUrl = {
  error: '/img/error.svg',
  check: '/img/check.svg',
  base: '/img/notice.svg',
}

export default function Toast({ message, visible, type }) {
  return (
    <div
      className={`${toastBase} ${toastVariant[type] || toastVariant.base} ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <img className="mr-2" src={iconUrl[type] || iconUrl.base} alt={type} />
      {message}
    </div>
  )
}
