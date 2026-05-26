//step 3 원하는 스타일 체크 카드 컴포넌트
//260524 디자인 디테일 수정중

export function StyleCard({ imageUrl, name, selected, onClick }) {
  return (
    <div className="relative rounded-xl overflow-hidden" onClick={onClick}>
      <img src={imageUrl} className="w-full aspect-square object-cover" />

      {selected && <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent border border-brand"></div>}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white font-semibold shadow-sm">{name}</div>
    </div>
  )
}
