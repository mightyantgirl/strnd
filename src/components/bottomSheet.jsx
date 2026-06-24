import { useState } from 'react'

import Button from '../components/button'
import Toast from '../components/toast'

export default function BottomSheet({ onClose, onConfirm }) {
  const [requiredDetail, setRequiredDetail] = useState(false)
  const [optionalDetail, setOptionalDetail] = useState(false)
  const [checkActive, setCheckActive] = useState({
    consentALL: false,
    consentRequiredYn: false, // (필수) 항목 동의
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
            <li>
              <div className="flex justify-between px-2">
                <div
                  onClick={() => handleConsent('consentRequiredYn')}
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
                  <button onClick={() => setRequiredDetail(!requiredDetail)} className="underline">
                    보기
                  </button>
                </span>
              </div>
              {/* 필수 동의 내용 */}
              {requiredDetail && (
                <div className="bg-bg w-full h-60 mt-3 px-3 py-4 rounded-lg overflow-auto space-y-1">
                  <h1 className="font-semibold">필수 동의</h1>
                  <h3 className="font-semibold">개인정보 수집·이용 동의 (필수)</h3>
                  <p className="mb-2">
                    [상호]는 고객님의 소중한 개인정보를 보호하기 위해 「개인정보보호법」을 준수하며,
                    아래와 같이 개인정보 수집·이용에 대한 동의를 구합니다.
                  </p>
                  <ol className="space-y-2 list-decimal ml-4">
                    <li>
                      수집·이용 목적
                      <ul className="ml-4 mt-1 list-disc">
                        <li>미용 시술 상담 및 맞춤 서비스 제공 </li>
                        <li>시술 이력 관리 및 재방문 고객 응대</li>
                      </ul>
                    </li>
                    <li>
                      수집하는 개인정보 항목
                      <ul className="ml-4 mt-1 list-disc">
                        <li> 이름, 연락처</li>
                      </ul>
                    </li>
                    <li>
                      보유·이용 기간
                      <ul className="ml-4 mt-1 list-disc">
                        <li>동의일로부터 3년 </li>
                        <li>
                          단, 아래의 경우 즉시 파기합니다.
                          <span>고객님이 동의를 철회한 경우 서비스 이용 관계가 종료된 경우</span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      동의 거부 권리 및 거부 시 불이익
                      <ul className="ml-4 mt-1 list-disc">
                        <li>고객님은 개인정보 수집·이용에 대한 동의를 거부하실 수 있습니다.</li>
                        <li>단, 필수 항목에 동의하지 않으실 경우 서비스 이용이 제한됩니다.</li>
                      </ul>
                    </li>
                    <li>
                      제3자 제공
                      <ul className="ml-4 mt-1 list-disc">
                        <li>수집된 개인정보는 제3자에게 제공되지 않습니다.</li>
                      </ul>
                    </li>
                    <li>
                      동의 철회 방법
                      <ul className="ml-4 mt-1 list-disc">
                        <li>담당 디자이너에게 언제든지 구두 또는 연락처를 통해 철회 가능합니다.</li>
                      </ul>
                    </li>
                    <li>
                      개인정보 처리자
                      <ul className="ml-4 mt-1 list-disc">
                        <li>상호: [헤어샵 상호] </li>
                        <li>대표자: [대표자명] </li>
                        <li>연락처: [전화번호]</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              )}
            </li>
            <li className=" mt-3">
              <div className="flex justify-between px-2">
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
                  <button onClick={() => setOptionalDetail(!optionalDetail)} className="underline">
                    보기
                  </button>
                </span>
              </div>
              {optionalDetail && (
                <div className="bg-bg w-full h-60 mt-3 px-3 py-4 rounded-lg overflow-auto space-y-1">
                  <h1 className="font-semibold">선택 동의</h1>
                  <h3 className="font-semibold mb-2">
                    개인정보(민감정보 포함) 수집·이용 동의 (선택)
                  </h3>

                  <ol className="space-y-2 list-decimal ml-4">
                    <li>
                      수집·이용 목적
                      <ul className="ml-4 mt-1 list-disc">
                        <li>맞춤 시술을 위한 고객 상태 파악</li>
                        <li>안전한 시술을 위한 참고 자료</li>
                      </ul>
                    </li>
                    <li>
                      수집하는 개인정보 항목
                      <ul className="ml-4 mt-1 list-disc">
                        <li> 모발·두피 상태, 시술 희망 스타일 등 설문 응답 내용</li>
                        <li>알러지 여부 (민감정보)</li>
                      </ul>
                    </li>
                    <li>
                      보유·이용 기간
                      <ul className="ml-4 mt-1 list-disc">
                        <li>동의일로부터 3년 </li>
                        <li>
                          단, 아래의 경우 즉시 파기합니다.
                          <span>고객님이 동의를 철회한 경우 </span>
                          <span>서비스 이용 관계가 종료된 경우</span>
                        </li>
                      </ul>
                    </li>
                    <li>
                      동의 거부 권리 및 거부 시 불이익
                      <ul className="ml-4 mt-1 list-disc">
                        <li>동의하지 않으셔도 기본 서비스(이름·연락처 기반) 이용은 가능합니다.</li>
                        <li>단, 동의하지 않으실 경우 맞춤 시술 상담이 제한될 수 있습니다.</li>
                      </ul>
                    </li>
                    <li>
                      제3자 제공
                      <ul className="ml-4 mt-1 list-disc">
                        <li>수집된 개인정보는 제3자에게 제공되지 않습니다.</li>
                      </ul>
                    </li>
                    <li>
                      동의 철회 방법
                      <ul className="ml-4 mt-1 list-disc">
                        <li>담당 디자이너에게 언제든지 구두 또는 연락처를 통해 철회 가능합니다.</li>
                      </ul>
                    </li>
                    <li>
                      개인정보 처리자
                      <ul className="ml-4 mt-1 list-disc">
                        <li>상호: [헤어샵 상호] </li>
                        <li>대표자: [대표자명] </li>
                        <li>연락처: [전화번호]</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              )}
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
