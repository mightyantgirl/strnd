//step 4 스타일 고민 체크 칩 컴포넌트

const baseClass = `
  w-fit py-2 px-4 mr-2 mb-3 rounded-full text-base font-semibold
  transition-all cursor-pointer border 
`

const defaultClass = 'bg-card-bg text-primary border-bg' // 미선택
const selectedClass = 'bg-tint text-primary border-brand' // 선택

export default function Chip({ label, selected = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${baseClass}
            ${selected ? selectedClass : defaultClass}
            `}>
      {label}
    </button>
  )
}

//
