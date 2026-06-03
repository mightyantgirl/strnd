import { useState } from 'react'
import Input from './../../components/input'
import Button from './../../components/button'
import Modal from './../../components/modal'

const baseTextClass = `text-xs  font-semibold`

export default function Login() {
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [autoLogin, setAutoLogin] = useState(false)

  const [phoneError, setPhoneError] = useState('')
  const [pinError, setPinError] = useState('')

  //유효성 통과 시 모달 여닫힘
  const [modalOpen, setModalOpen] = useState(false)

  // 유효성 검사 함수
  const validate = () => {
    let valid = true

    // 연락처 검사
    const phoneRegex = /^010\d{4}\d{4}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError('올바른 연락처를 입력해주세요')
      valid = false
    } else {
      setPhoneError('')
    }

    // PIN 검사
    if (pin.length !== 4 || isNaN(pin)) {
      setPinError('PIN은 4자리 숫자예요')
      valid = false
    } else {
      setPinError('')
    }

    return valid
  }

  //버튼 클릭 유효성 체크
  const handleLogin = () => {
    if (!validate()) return
    setModalOpen(true)

    console.log('phone:', phone)
    console.log('pin:', pin)
    console.log('autoLogin:', autoLogin)
  }

  return (
    <div className="relative" style={{ height: '100dvh' }}>
      {/* 컨텐츠 - 메인타이틀 */}
      <div className={`${baseTextClass} flex-1 overflow-y-auto py-22`} style={{ touchAction: 'pan-y' }}>
        <h1 className="text-2xl font-medium text-primary mb-4">
          한 올 한 올, <br />
          당신의 결을 기록합니다.
        </h1>
        <img src="./img/strnd.svg" alt="서비스 로고" />
      </div>

      {/* 로그인 인풋 */}
      <div className="absolute bottom-4 left-0 right-0 w-full space-y-8">
        <div>
          <div>
            <Input value={phone} placeholder="연락처" onChange={(e) => setPhone(e.target.value)} error={phoneError} />
            <Input value={pin} placeholder="PIN 번호" onChange={(e) => setPin(e.target.value)} error={pinError} />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAutoLogin(!autoLogin)}>
              <img src={autoLogin ? './img/check.svg' : './img/check-disable.svg'} alt="자동로그인 체크" />
            </button>
            <span className="text-xs text-secondary font-semibold">자동로그인</span>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <Button variant="primary" value="로그인" height="md" disabled={!phone || !pin} onClick={handleLogin} />
        <div className="flex justify-center gap-8">
          <span className={`${baseTextClass} text-placeholder`}>처음 오셨나요?</span>
          <span className={`${baseTextClass} underline pointer`} onClick={() => {}}>
            회원가입
          </span>
        </div>
      </div>
      <Modal isOpen={modalOpen} title="로그인 성공" confirmLabel="확인" confirmVariant="primary" onConfirm={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
    </div>
  )
}
