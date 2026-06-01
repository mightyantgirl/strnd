const baseClass = `py-3 px-2 rounded-xl  bg-card-bg border border-border`

export default function ContextMenu({ isOpen, onClose, items, className = '' }) {
  if (!isOpen) return null

  return (
    <div className={`${baseClass} space-y-3 flex-colunm text-xs text-placeholder font-medium absolute top-11 right-2`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick()
            onClose()
          }}
          className=" w-full flex items-center gap-3 py-2 px-4">
          {item.label}
          <p className="w-2"></p>
          {item.icon && <img src={item.icon} alt="" />}
        </button>
      ))}
    </div>
  )
}
