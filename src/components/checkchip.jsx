//step 0,1 공통 체크 칩 컴포넌트

const baseClass = `
  w-full  py-5 px-6 mr-2 mb-3 rounded-xl text-base font-semibold
  transition-all cursor-pointer border 
`

const defaultClass = 'bg-card-bg text-primary border-bg' // 미선택
const selectedClass = 'bg-tint text-primary border-brand' // 선택

export default function CheckChip({ label, selected = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${baseClass}
            ${selected ? selectedClass : defaultClass}
            `}>
      <div className="px-4 py-6">
        <p>{label}</p>
      </div>
    </button>
  )
}
