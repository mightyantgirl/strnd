import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import useAuthGuard from '../../hooks/useAuthGuard'
import useApiFetch from '../../hooks/useApiFetch'

import PageHeader from './../../components/pageheader'
import PageFooter from './../../components/pagefooter'
import Input from './../../components/input'
import Toast from './../../components/toast'

const baseTextClass = `text-xs text-primary font-medium`
const activeChip = 'bg-tint border border-brand text-brand font-semibold'
const inactiveChip = 'bg-card-bg border border-border text-placeholder font-medium'
const baseChip = 'flex-1 py-3 rounded-xl text-sm text-center cursor-pointer transition-all'

const GENDER_OPTIONS = [
  { label: '여성', value: 'FEMALE' },
  { label: '남성', value: 'MALE' },
]

export default function EditCustomer() {
  useAuthGuard()

  const { customerId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const apiFetch = useApiFetch()

  const [name, setName] = useState(location.state?.name ?? '')
  const [phone, setPhone] = useState(location.state?.phone ?? '')
  const [gender, setGender] = useState(location.state?.gender ?? '')
  const memo = location.state?.memo ?? ''

  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [genderError, setGenderError] = useState('')

  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const handleSubmit = async () => {
    let valid = true
    const phoneRegex = /^010\d{8}$/

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

    if (!gender) {
      setGenderError('성별을 선택해주세요.')
      valid = false
    } else {
      setGenderError('')
    }

    if (!valid) return

    // 중복 연락처 사전 검증
    const searchRes = await apiFetch(
      `https://strnd-be.onrender.com/api/customers?keyword=${phone}`,
    )
    if (!searchRes) return
    const searchData = await searchRes.json()
    const currentDesignerId = localStorage.getItem('designerId')
    const duplicate = searchData.find(
      (c) =>
        c.phone === phone &&
        String(c.customerId) !== String(customerId) &&
        String(c.designerId) === String(currentDesignerId),
    )
    if (duplicate) {
      setPhoneError('이미 등록된 연락처예요.')
      return
    }

    const response = await apiFetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: name, phone, gender, memo }),
    })

    if (response.ok) {
      navigate(`/customers/${customerId}`, { state: { toast: '고객 정보가 수정되었어요.' } })
    } else {
      const data = await response.json()
      if (response.status === 409) {
        setPhoneError(data.message ?? '이미 등록된 연락처예요.')
      } else {
        showToast(data.message ?? '수정에 실패했어요.')
      }
    }
  }

  return (
    <div style={{ height: '100dvh' }} className="h-full flex flex-col">
      <PageHeader title={name} onBack={() => navigate(-1)} />

      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <h1 className="text-2xl font-bold text-primary mb-4">
            고객 정보를
            <br />
            수정해주세요.
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          <Input
            label="이름"
            value={name}
            required={true}
            placeholder="이름 입력"
            type="text"
            error={nameError}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="연락처"
            value={phone}
            required={true}
            placeholder="010-0000-0000"
            type="text"
            inputMode="numeric"
            maxLength={11}
            error={phoneError}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* 성별 라디오 버튼 */}
          <div className="w-full">
            <label className="flex gap-2 mb-2">
              <p className="text-base font-semibold leading-none">성별</p>
              <span className="text-base font-semibold leading-none text-brand">필수</span>
            </label>
            <div className="flex gap-3">
              {GENDER_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`${baseChip} ${gender === value ? activeChip : inactiveChip}`}
                  onClick={() => { setGender(value); setGenderError('') }}>
                  {label}
                </button>
              ))}
            </div>
            {genderError && (
              <p className="text-xs font-medium text-danger mt-1 pl-2">{genderError}</p>
            )}
          </div>
        </div>
      </div>

      <Toast message={toastMessage} visible={toastVisible} type="base" />
      <PageFooter onNext={handleSubmit} value="저장하기" />
    </div>
  )
}
