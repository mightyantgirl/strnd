const toastBase =
  'flex items-center fixed bottom-30 left-0 right-0 mx-auto w-fit whitespace-nowrap px-5 py-3 space-x-2 rounded-full text-xs font-medium transition-all duration-300 z-30'
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
      <img src={iconUrl[type] || iconUrl.base} alt={type} />
      <span> {message}</span>
    </div>
  )
}
