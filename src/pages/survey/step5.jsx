import { useState } from 'react'
import TextFiled from './../../components/textfiled'
import Toast from '../../components/toast'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep5({ surveyData, onUpdate }) {
  const [toastMessage, setToastMessage] = useState('') // 토스트에 표시할 글자
  const [toastVisible, setToastVisible] = useState(false) // 보일지 말지

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)

    setTimeout(() => {
      setToastVisible(false)
    }, 3000)
  }
  return (
    <div>
      <div>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <p>STEP 5</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            추가적으로 디자이너에게
            <br />
            전달하고 싶은 사항이 있나요?
          </h1>
        </div>
        <Toast message={toastMessage} visible={toastVisible} type="base" />

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <TextFiled
            placeholder="듣고 싶은 노래가 있어요, 시술 중 잠들어도 괜찮아요 😊"
            value={surveyData.requestMemo}
            onChange={(e) => onUpdate('requestMemo', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
