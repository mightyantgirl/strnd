import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageFooter from './../../components/pagefooter'
import PageHeader from './../../components/pageheader'
import Toast from './../../components/toast'
import Input from './../../components/input'

const baseTextClass = `text-xs text-primary font-medium`

export default function NewCustomer() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [memo, setMemo] = useState('')

  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const [toastMessage, setToastMessage] = useState('') // 토스트에 표시할 글자
  const [toastVisible, setToastVisible] = useState(false) // 보일지 말지

  const navigate = useNavigate()

  const showToast = (message) => {
    setToastMessage(message) // 1. 메시지 넣기
    setToastVisible(true) // 2. 보이게 하기

    setTimeout(() => {
      setToastVisible(false) // 3. 3초 후 다시 숨기기
    }, 3000)
  }

  //유효성 검사
  const handleSubmit = async () => {
    let valid = true
    const phoneRegex = /^010\d{4}\d{4}$/

    if (!name) {
      valid = false
      setNameError('이름을 입력해주세요.')
    } else {
      setNameError('')
    }

    if (!phoneRegex.test(phone)) {
      valid = false
      setPhoneError('올바른 연락처를 입력해주세요.')
    } else {
      setPhoneError('')
    }

    if (!valid) return

    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const response = await fetch('https://strnd-be.onrender.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerName: name,
        phone: phone,
        gender: null,
        memo: memo,
      }),
    })
    const data = await response.json()
    // console.log('응답:', data)

    if (response.ok) {
      navigate(`/customers/${data.customerId}`, {
        state: { refresh: true, toast: '신규 고객이 등록되었어요.' },
      })
    } else {
      showToast(data.message)
      return
    }
  }

  return (
    <div style={{ height: '100dvh' }} className="h-full flex flex-col">
      {/* 헤더 */}
      <PageHeader title="신규 회원 등록" onBack={() => navigate(-1)} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <h1 className="text-2xl font-bold text-primary mb-4">
            새로운 고객의
            <br />
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
            type="number"
            maxLength={11}
            inputMode="numeric"
            error={phoneError}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="메모"
            value={memo}
            required={false}
            placeholder=""
            type="text"
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>

      <Toast message={toastMessage} visible={toastVisible} type="base" />
      {/* 푸터 */}
      <PageFooter onNext={handleSubmit} value="등록" />
    </div>
  )
}
