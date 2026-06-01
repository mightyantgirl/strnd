import Button from './button'

const baseTextClass = `text-xs text-placeholder font-medium`

export default function SurveyFooter({ onNext, disabled, children }) {
  return (
    <div className="w-full flex flex-col items-center pb-4 pt-4">
      <span className={`${baseTextClass} mb-4`}>{children}</span>
      <Button variant="primary" value="다음" height="md" onClick={onNext} disabled={disabled} />
    </div>
  )
}
