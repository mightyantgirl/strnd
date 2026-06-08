import { useNavigate } from 'react-router-dom'

import Input from './../../components/input'
// import CustomerCard from './../../components/customercard'
import PageFooter from './../../components/pagefooter'

const baseTextClass = `text-xs text-primary font-bold`

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ height: '100dvh' }} className="flex flex-col">
      <div className="w-full bg-bg fixed pr-9 pb-6 z-10">
        <div className="flex gap-5 mt-6 items-center justify-between">
          <img src="/img/strnd.svg" className="w-22" alt="로고" />
          {/* <img src="/img/Subtract.svg" alt="설정" /> */}
          <button
            className="text-placeholder text-base font-semibold"
            type="button"
            alt="로그아웃"
            onClick={() => {
              sessionStorage.removeItem('token')
              localStorage.removeItem('token')
              navigate('/login')
            }}>
            logout
          </button>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-20 pb-6 space-y-2`}>
          <h1 className="text-2xl font-bold text-primary mb-4">
            안녕하세요, {} 님! <br />
            오늘도 좋은 하루 되세요.
          </h1>
          <p className="text-placeholder">이번 달 총 {}명 방문했어요</p>
        </div>

        {/* 컨텐츠 - 검색 인풋*/}
        <Input placeholder="고객 이름 검색" />

        {/* 컨텐츠 - 검색 내역 */}
        {/* <CustomerCard /> */}
      </div>
      {/* 푸터 */}
      <PageFooter onNext={() => navigate('/register')} value="+ 신규 고객 등록" />
    </div>
  )
}
