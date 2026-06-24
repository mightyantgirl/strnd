import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthGuard from '../../hooks/useAuthGuard'

import PageFooter from '../../components/pagefooter'
import PageHeader from '../../components/pageheader'
import Input from '../../components/input'
import Dropdown from '../../components/dropdown'

const baseTextClass = `text-xs text-primary font-bold`

const OPTIONS = [
  { value: 'CUT', label: '컷' },
  { value: 'PERM', label: '펌' },
  { value: 'COLOR', label: '컬러' },
  { value: 'CLINIC', label: '클리닉' },
]

export default function TreatmentResult() {
  useAuthGuard()

  const location = useLocation()
  const visitId = location.state?.visitId

  const [dropdownValue, setDropdownValue] = useState('')
  const [treatmentMenu, setTreatmentMenu] = useState('')
  const [treatmentProduct, setTreatmentProduct] = useState('')
  const [treatmentDetail, setTreatmentDetail] = useState('')
  const [treatmentNote, setTreatmentNote] = useState('')

  const [dropdownValueError, setDropdownValueError] = useState('')
  const [treatmentMenuError, setTreatmentMenuError] = useState('')
  const [treatmentDetailError, setTreatmentDetailError] = useState('')

  const navigate = useNavigate()

  const handleSaveTreatment = async () => {
    let valid = true

    if (!dropdownValue) {
      setDropdownValueError('필수 입력 값 입니다.')
      valid = false
    } else {
      setDropdownValueError('')
    }
    if (!treatmentMenu) {
      setTreatmentMenuError('필수 입력 값 입니다.')
      valid = false
    } else {
      setTreatmentMenuError('')
    }
    if (!treatmentDetail) {
      valid = false
      setTreatmentDetailError('필수 입력 값 입니다.')
    } else {
      setTreatmentDetailError('')
    }

    if (!valid) return

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      await fetch(`https://strnd-be.onrender.com/api/visits/${visitId}/treatment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceCode: dropdownValue,
          treatmentMenu: [treatmentMenu],
          treatmentProduct: treatmentProduct,
          treatmentDetail: treatmentDetail,
          treatmentNote: treatmentNote,
        }),
      })

      navigate(-1)
    } catch (error) {
      console.log('에러:', error)
    }
  }

  return (
    <div style={{ height: '100dvh' }} className="h-full flex flex-col">
      {/* 헤더 */}
      <PageHeader title="시술 결과 기록하기" onBack={() => navigate(-1)} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-3`}>
          <h1 className="text-2xl font-bold text-primary mb-4">
            시술 결과를 <br /> 기록해주세요
          </h1>
          <p className="text-placeholder font-medium text-xs">
            고객 설문을 바탕으로 시술 내용을 남겨요
          </p>
        </div>

        {/* 컨텐츠 - 인풋 영역 */}
        <div className="flex-1 overflow-y-auto space-y-6">
          <Dropdown
            options={OPTIONS}
            label="서비스 카테고리"
            required={true}
            value={dropdownValue}
            onChange={(val) => setDropdownValue(val)}
            placeholder="해당하는 항목을 선택해주세요"
            error={dropdownValueError}
          />
          <Input
            label="시술 메뉴"
            value={treatmentMenu}
            required={true}
            placeholder="ex) 여성 커트, 프리미엄 크리닉"
            subtext="샵에서 사용하는 메뉴명을 기재해주세요."
            type="text"
            onChange={(e) => setTreatmentMenu(e.target.value)}
            error={treatmentMenuError}
          />
          <Input
            label="시술 내용"
            value={treatmentDetail}
            required={true}
            placeholder="ex) 뿌리염색, 톤다운"
            subtext="오늘 시술한 상세 내용을 기재해주세요."
            type="text"
            onChange={(e) => setTreatmentDetail(e.target.value)}
            error={treatmentDetailError}
          />
          <Input
            label="사용 약제"
            value={treatmentProduct}
            required={false}
            placeholder="ex) NB 0.6 톤다운"
            type="text"
            onChange={(e) => setTreatmentProduct(e.target.value)}
          />

          <Input
            label="특이사항"
            value={treatmentNote}
            required={false}
            placeholder="시술 중 특이사항"
            type="text"
            onChange={(e) => setTreatmentNote(e.target.value)}
          />
        </div>
      </div>

      {/* 푸터 */}
      <PageFooter onNext={handleSaveTreatment} value="저장" />
    </div>
  )
}
