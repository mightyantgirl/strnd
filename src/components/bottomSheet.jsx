import { useState } from 'react'

import Button from '../components/button'

export default function BottomSheet({ isOpen, onClose, onConfirm }) {
  const [checkActive, setCheckActive] = useState(false)

  const [startY, setStartY] = useState(0)

  // 터치 시작 위치 저장
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY)
  }

  // 터치 끝났을 때 얼마나 내렸는지 계산
  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY
    const diff = endY - startY // 양수면 아래로 드래그

    if (diff > 80) {
      // 80px 이상 내리면 닫힘
      onClose()
    }
  }
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black/10 z-5" onClick={onClose} />

      <div className="flex-col fixed bg-card-bg bottom-0 left-0 w-full px-5 py-4 rounded-tl-xl rounded-tr-xl  z-10">
        <div
          className="flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          <div className="bg-border rounded-full w-13" style={{ height: '6px' }}></div>
        </div>
        <div className="py-6 flex items-center justify-between ">
          <p className="text-base font-semibold text-primary">개인정보 수집 동의</p>
        </div>

        <div className=" w-full space-y-5 mb-10">
          <div className="flex justify-between bg-tint px-3 py-4 rounded-xl">
            <span className="text-lg font-medium text-primary">약관 전체 동의</span>
            <button onClick={() => setCheckActive(!checkActive)}>
              <img
                src={checkActive ? '../img/check.svg' : '../img/check-disable.svg'}
                alt="개인정보동의 체크"
              />
            </button>
          </div>

          <ol className="space-y-1  text-base text-placeholder">
            <li className="flex justify-between px-2">
              <span>(필수) 항목 동의</span>
              <span>
                <button className="underline">보기</button>
              </span>
            </li>
            <li className="flex justify-between px-2">
              <span>(선택) 항목 동의</span>
              <span>
                <button className="underline">보기</button>
              </span>
            </li>
            <li className="flex justify-between px-2">
              <span>(선택) 민감 정보 동의</span>
              <span>
                <button className="underline">보기</button>
              </span>
            </li>
          </ol>
        </div>

        <Button
          className=" mb-2"
          value="확인"
          onClick={() => {
            checkActive ? onConfirm() : console.log('동의 안하셨어요')
          }}
        />
      </div>
    </div>
  )
}
