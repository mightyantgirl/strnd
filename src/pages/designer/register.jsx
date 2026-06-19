import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageFooter from './../../components/pagefooter'
import PageHeader from './../../components/pageheader'
import Input from './../../components/input'

const baseTextClass = `text-xs text-primary font-bold`

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [pinConfirm, setPinConfirm] = useState('')

  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [pinError, setPinError] = useState('')
  const [pinConfirmError, setPinConfirmError] = useState('')

  const navigate = useNavigate()

  //유효성 검사 함수
  const handleRegister = async () => {
    let valid = true
    const phoneRegex = /^010\d{4}\d{4}$/

    if (!name) {
      setNameError('이름을 입력해주세요.')
      valid = false
    } else {
      setNameError('')
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError('올바른 연락처를 입력해주세요.')
      valid = false
    } else {
      setPhoneError('')
    }
    if (pin.length !== 4) {
      setPinError('PIN은 4자리 숫자입니다.')
      valid = false
    } else {
      setPinError('')
    }
    if (pin !== pinConfirm) {
      valid = false
      setPinConfirmError('PIN이 일치하지 않아요.')
    } else {
      setPinConfirmError('')
    }

    if (!valid) return

    try {
      const response = await fetch('https://strnd-be.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: phone.replace(/-/g, ''),
          pinCode: pin,
          pinConfirm,
        }),
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('designerName', data.designerName)

        navigate('/home')
      } else {
        console.log('실패', data.message)
      }
    } catch (error) {
      console.error('에러', error)
    }
  }

  //   화면단
  return (
    <div style={{ height: '100dvh' }} className="h-full flex flex-col">
      {/* 헤더 */}
      <PageHeader title="회원가입" onBack={() => navigate(-1)} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <h1 className="text-2xl font-bold text-primary mb-4">
            시작해볼까요? <br />
            기본 정보를 입력해주세요.
          </h1>
        </div>

        {/* 컨텐츠 - 인풋 영역 */}
        <div className="flex-1 overflow-y-auto space-y-6">
          <Input
            label="이름"
            value={name}
            required={true}
            placeholder="1자 이상"
            type="text"
            error={nameError}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="연락처"
            value={phone}
            required={true}
            placeholder="10~11자 입력"
            type="text"
            inputMode="numeric"
            maxLength={11}
            error={phoneError}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="PIN 설정"
            value={pin}
            required={true}
            placeholder="4자리 숫자"
            type="password"
            inputMode="numeric"
            maxLength={4}
            error={pinError}
            onChange={(e) => setPin(e.target.value)}
          />
          <Input
            label="PIN 확인"
            value={pinConfirm}
            required={true}
            placeholder="4자리 숫자"
            type="password"
            inputMode="numeric"
            maxLength={4}
            error={pinConfirmError}
            onChange={(e) => setPinConfirm(e.target.value)}
          />
        </div>
      </div>

      {/* 푸터 */}
      <PageFooter onNext={handleRegister} value="가입" />
    </div>
  )
}
