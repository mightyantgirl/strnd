export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="text-center px-6">
        <div className="text-7xl mb-2">🥺</div>
        <h1 className="text-5xl font-bold mb-1">404</h1>
        <p className="text-lg font-medium mb-2">앗, 여기는 아무것도 없어요!</p>
        <p className="text-sm text-placeholder leading-relaxed mb-8">
          페이지가 사라졌거나 ✨<br />
          주소를 잘못 입력했을 수도 있어요 🙈
          <br />
          걱정 마요, 같이 돌아가요! 🐾
        </p>
        <a href="/" className="text-sm font-medium border border-border rounded-xl px-6 py-2">
          🏠 홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}
