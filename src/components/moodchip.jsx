//step 2 원하는 무드 체크 칩 컴포넌트

const baseClass = `
  w-full  py-5 px-6 mr-2 mb-3 rounded-xl text-base font-semibold
  transition-all cursor-pointer border 
`

const defaultClass = 'bg-card-bg text-primary border-bg' // 미선택
const selectedClass = 'bg-tint text-primary border-brand' // 선택

export default function MoodChip({ emoji, label, selected = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${baseClass}
            ${selected ? selectedClass : defaultClass}
            `}>
      <div className="flex flex-row justify-left gap-3">
        <p>{emoji}</p>
        <p>{label}</p>
      </div>
    </button>
  )
}

//
