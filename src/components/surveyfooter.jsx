import Button from './button'

const baseTextClass = `text-xs text-placeholder font-medium`

export default function SurveyFooter({ onNext, disabled, children, value }) {
  return (
    <div className="shrink-0  bg-bg pt-2 pb-6 flex flex-col items-center -mx-5 px-5">
      {children && <span className={`${baseTextClass} mb-2`}>{children}</span>}
      <Button variant="primary" value={value} height="md" onClick={onNext} disabled={disabled} />
    </div>
  )
}
