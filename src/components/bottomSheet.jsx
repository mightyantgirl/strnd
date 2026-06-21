import { useState } from 'react'

import Button from '../components/button'
import Toast from '../components/toast'

export default function BottomSheet({ onClose, onConfirm }) {
  const [checkActive, setCheckActive] = useState({
    consentALL: false,
    consentRequired: false, // (필수) 항목 동의
    consentOptionalYn: false, // (선택) 항목 동의
  })

  const [toastMessage, setToastMessage] = useState('') // 토스트에 표시할 글자
  const [toastVisible, setToastVisible] = useState(false) // 보일지 말지

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)

    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }

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

  // 전체 동의 버튼 클릭
  const handleAllConsent = () => {
    const newValue = !checkActive.consentALL
    setCheckActive({
      consentALL: newValue,
      consentRequiredYn: newValue,
      consentOptionalYn: newValue,
    })
  }

  // 개별 동의
  const handleConsent = (key) => {
    const updated = { ...checkActive, [key]: !checkActive[key] }

    // 필수 + 선택 + 민감 다 체크되면 전체동의도 true
    updated.consentALL = updated.consentRequiredYn && updated.consentOptionalYn

    setCheckActive(updated)
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
            <button onClick={() => handleAllConsent()}>
              <img
                src={checkActive.consentALL ? '../img/check.svg' : '../img/check-disable.svg'}
                alt="개인정보동의 체크"
              />
            </button>
          </div>

          <ol className="space-y-1  text-base text-placeholder">
            <li className="flex justify-between px-2">
              <div
                onClick={() => handleConsent('consentRequired')}
                className="flex items-center gap-2">
                <img
                  src={
                    checkActive.consentRequiredYn
                      ? '/img/mini_check.svg'
                      : '/img/mini_check_disabled.svg'
                  }
                  alt=""
                  className="w-3"
                />
                <span>(필수) 항목 동의</span>
              </div>
              <span>
                <button className="underline">보기</button>
              </span>
            </li>
            <li className="flex justify-between px-2">
              <div
                onClick={() => handleConsent('consentOptionalYn')}
                className="flex items-center gap-2">
                <img
                  src={
                    checkActive.consentOptionalYn
                      ? '/img/mini_check.svg'
                      : '/img/mini_check_disabled.svg'
                  }
                  alt=""
                  className="w-3"
                />
                <span>(선택) 항목 동의</span>
              </div>
              <span>
                <button className="underline">보기</button>
              </span>
            </li>
          </ol>
        </div>

        <Button
          className="mb-2"
          value="확인"
          onClick={() => {
            checkActive.consentRequiredYn
              ? onConfirm({
                  consentRequiredYn: checkActive.consentRequiredYn,
                  consentOptionalYn: checkActive.consentOptionalYn,
                })
              : showToast('필수 동의가 필요해요')
          }}
        />
      </div>

      <Toast message={toastMessage} visible={toastVisible} type="base" />
    </div>
  )
}
