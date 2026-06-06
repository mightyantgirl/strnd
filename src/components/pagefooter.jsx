import Button from './button'

const baseTextClass = `text-xs text-placeholder font-medium`

export default function PageFooter({ onNext, disabled, children, value }) {
  return (
    <div className="shrink-0 bg-bg pt-4 flex flex-col items-center">
      {children && <span className={`${baseTextClass} mb-4`}>{children}</span>}
      <Button variant="primary" value={value} height="md" onClick={onNext} disabled={disabled} />
    </div>
  )
}
