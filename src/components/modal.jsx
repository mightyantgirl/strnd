import Button from './button'

const baseClass = `w-full py-5 px-4 rounded-xl  bg-card-bg `
const baseTextClass = `text-xs text-placeholder font-medium`

export default function Modal({ isOpen, title, description, confirmLabel, confirmVariant, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className={`${baseClass} ${baseTextClass} space-y-5 m-5`}>
        <div className="flex-column justify-items-center">
          <img className="mb-3" src="/img/warning.svg" alt="" />
          <h1 className="text-lg font-semibold text-primary mb-3">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex jutify-center gap-3">
          <Button variant="ghost" value="취소" height="md" onClick={onCancel} />
          <Button variant="primary" value="확인" height="md" onClick={onConfirm} />
        </div>
      </div>
    </div>
  )
}
