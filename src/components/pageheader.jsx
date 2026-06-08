export default function PageHeader({ onBack, title }) {
  return (
    <div className="w-full bg-bg fixed pr-10 pl-1 pb-3 z-10">
      <div className="flex gap-5 pr-5 mt-6 items-center">
        <button onClick={onBack} className="px-3 py-3">
          <img src="/img/back.svg" alt="뒤로가기" />
        </button>

        {/* 프로그래스바 */}
        <div className="text-lg text-primary font-semibold">
          <span>{title}</span>
        </div>
      </div>
    </div>
  )
}
