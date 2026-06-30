import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'

import SurveyFooter from '../../components/surveyfooter'
import SurveyHeader from '../../components/surveyheader'
import Step0 from './step0'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'
import Toast from '../../components/toast'

export default function SurveySteps() {
  const [currentStep, setCurrentStep] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()
  const { visitId } = useParams()
  const [searchParams] = useSearchParams()

  const [toastMessage, setToastMessage] = useState('') // 토스트에 표시할 글자
  const [toastVisible, setToastVisible] = useState(false) // 보일지 말지
  const [toastType, setToastType] = useState('')

  const showToast = (message, type) => {
    setToastMessage(message)
    setToastVisible(true)
    setToastType(type)

    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }

  const surveyToken = searchParams.get('surveyToken')
  const isFirstVisit = location.state?.isFirstVisit ?? true

  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`https://strnd-be.onrender.com/api/survey/${surveyToken}`)
        const data = await response.json()

        if (data.status !== 'PENDING') {
          navigate(`/survey/${visitId}/done`, { replace: true })
          return
        }
      } catch (error) {
        console.error('설문 상태 확인 실패:', error)
      } finally {
        setIsValidating(false)
      }
    }
    checkStatus()
  }, [])

  const [surveyData, setSurveyData] = useState({
    // 동의 (SurveyMain에서 받음)
    consentRequiredYn: location.state?.consentRequiredYn ?? false,
    consentOptionalYn: location.state?.consentOptionalYn ?? false,

    // Step 0 — 기본정보
    gender: '',
    visitRoute: '',
    refDesigner: '',

    // Step 1 — 시술 선택
    serviceId: null,

    // Step 2 — 선호 무드
    moods: [],

    // Step 3 — 모발 상태
    hairConcerns: [],

    // Step 4 — 이미지 카드
    styleImageIds: [],

    // Step 5 — 추가 요청
    requestMemo: '',
  })

  const submitSurvey = async () => {
    try {
      const response = await fetch(`https://strnd-be.onrender.com/api/survey/${surveyToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      })

      if (!response.ok) {
        const err = await response.json()
        console.error('survey submit failed:', err)
        return
      }

      showToast('설문이 제출되었습니다', 'check')
      setTimeout(() => navigate(`/survey/${visitId}/done`), 1500)
    } catch (error) {
      console.error(error)
    }
  }

  const updateSurveyData = (key, value) => {
    setSurveyData((prev) => ({ ...prev, [key]: value }))
  }

  const isStepValid = () => {
    if (currentStep === 0) return surveyData.gender !== '' && surveyData.visitRoute !== ''
    if (currentStep === 1) return surveyData.serviceId !== null
    return true
  }

  const ERROR_MESSAGES = {
    0: '필수 값을 선택해주세요.',
    1: '시술 항목을 선택해주세요.',
  }

  const footerConfig = {
    0: { value: '다음', children: '' },
    1: { value: '다음', children: '필수 선택 항목입니다.' },
    2: { value: '다음', children: '복수 선택이 가능합니다.' },
    3: { value: '다음', children: '복수 선택이 가능합니다.' },
    4: { value: '다음', children: '복수 선택이 가능합니다.' },
    5: { value: '제출하기', children: '' },
  }

  if (isValidating) return null

  return (
    <div style={{ height: '100dvh' }} className="flex flex-col">
      <SurveyHeader
        currentStep={currentStep}
        onBack={() => {
          if (currentStep === 0) {
            navigate(-1)
          } else {
            setCurrentStep(currentStep - 1)
          }
        }}
      />
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {currentStep === 0 && (
          <Step0 surveyData={surveyData} onUpdate={updateSurveyData} isFirstVisit={isFirstVisit} />
        )}
        {currentStep === 1 && <Step1 surveyData={surveyData} onUpdate={updateSurveyData} />}
        {currentStep === 2 && <Step2 surveyData={surveyData} onUpdate={updateSurveyData} />}
        {currentStep === 3 && <Step3 surveyData={surveyData} onUpdate={updateSurveyData} />}
        {currentStep === 4 && <Step4 surveyData={surveyData} onUpdate={updateSurveyData} />}
        {currentStep === 5 && <Step5 surveyData={surveyData} onUpdate={updateSurveyData} />}
      </div>
      <SurveyFooter
        value={footerConfig[currentStep].value}
        children={footerConfig[currentStep].children}
        onNext={() => {
          if (currentStep === 5) {
            submitSurvey()
          } else {
            if (!isStepValid()) {
              showToast(ERROR_MESSAGES[currentStep] ?? '', 'base')
              return
            }
            setCurrentStep(currentStep + 1)
          }
        }}
      />
      <Toast message={toastMessage} visible={toastVisible} type={toastType} />
    </div>
  )
}
