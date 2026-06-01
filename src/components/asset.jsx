import { useState } from 'react'

import Button from './components/Button'
import Chip from './components/Chip'
import MoodChip from './components/moodchip'
import Input from './components/input'
import Toast from './components/toast'
import { StyleCard } from './components/stylecard'
import Dropdown from './components/dropdown'
import Badge from './components/badge'
import { CustomerCard } from './components/customercard'
import { VisitCard } from './components/card'
import { SurveyCard } from './components/surveycard'
import CustomerInfoCard from './components/customerinfocard'
import Modal from './components/modal'
import ContextMenu from './components/contextmenu'
import SurveyHeader from './components/surveyheader'
import SurveyFooter from './components/surveyfooter'

const CHIPS = [
  { id: 1, label: '➰ 자주 엉켜요' },
  { id: 2, label: '✂️ 커트 라인이 마음에 안들어요' },
  { id: 3, label: '⚡️ 건조해요' },
]

const MOODCHIPS = [
  { id: 1, emoji: '🌿', label: '자연스럽고 편안한' },
  { id: 2, emoji: '✂️', label: '깔끔하고 단정한' },
  { id: 3, emoji: '✨', label: '트렌디하고 감각적인' },
  { id: 4, emoji: '🔥', label: '개성있고 독특한' },
  { id: 5, emoji: '🌙', label: '세련되고 고급스러운' },
]

const OPTIONS = [
  { value: 'cut', label: '컷' },
  { value: 'perm', label: '펌' },
  { value: 'color', label: '컬러' },
  { value: 'clinic', label: '클리닉' },
]

const STYLECARDS = [{ id: 1, imageUrl: '', name: '' }]

export default function App() {
  const [selected, setSelected] = useState([])
  const [visible, setVisible] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggle = (id) => {
    setSelected(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // 있으면 제거
          : [...prev, id], // 없으면 추가
    )
  }

  const showToast = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 3000)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4 px-8">
      <SurveyHeader currentStep={2} totalStep={6} onBack={() => {}} />

      {/* 버튼 */}
      <div className=" w-full flex flex-col items-center justify-center gap-4">
        <Button variant="primary">다음</Button>
        <Button variant="secondary">취소</Button>
        <Button variant="primary" disabled>
          비활성화
        </Button>
      </div>

      {/* chip */}
      <div className="flex-row">
        {CHIPS.map((chip) => (
          <Chip key={chip.id} label={chip.label} selected={selected.includes(chip.id)} onClick={() => toggle(chip.id)} />
        ))}
      </div>

      <div className="flex-col">
        {MOODCHIPS.map((chip) => (
          <MoodChip key={chip.id} emoji={chip.emoji} label={chip.label} selected={selected.includes(chip.id)} onClick={() => toggle(chip.id)} />
        ))}
      </div>

      {/* 드랍다운 */}
      <div className="w-full">
        <Dropdown options={OPTIONS} label="서비스 카테고리" required={true} value={dropdownValue} onChange={(val) => setDropdownValue(val)} placeholder="해당하는 항목을 선택해주세요" />
      </div>

      {/* 인풋 */}
      <div className="w-full">
        <Input placeholder="1자 이상" label="이름" required={true} />
        <Input placeholder="" label="디자이너 소개 유무" required={false} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StyleCard imageUrl="https://picsum.photos/300" name="C컬 레이어드" selected={selected.includes(1)} onClick={() => toggle(1)} />
        <StyleCard imageUrl="https://picsum.photos/301" name="S컬 레이어드" selected={selected.includes(2)} onClick={() => toggle(2)} />
      </div>

      {/* 카테고리 뱃지 */}
      <div className="flex flex-row">
        <Badge label="첫 방문" color="green" />
        <Badge label="컬러" color="rose" />
        <Badge label="펌" color="blue" />
      </div>

      {/* 커스토머 카드 */}
      <CustomerCard CUSTOMER_ID="주수진" lastVisitAt="26.06.04" elapsedDays="3일 전 방문" onClick={() => {}} />

      {/* 비짓 카드 */}
      <VisitCard date="2026.02.03" elapsedDays="2주 전" TREATMENT_DETAIL="뿌리염색, 영양케어" TREATMENT_PRODUCT="7NB 0.6 톤다운" TREATMENT_NOTE="두피 민감, 약 강도 강하게" />

      {/* 설문카드 */}
      <SurveyCard date="2026.06.04" status="기록 대기중" VISIT_ROUTE="네이버 검색" REF_DESIGNER="" SERVICES="펌" MOODS="자연스럽고 편안한" HAIR_CONCERNS="건조해요, 커트라인" REQUEST_MEMO="회사가 보수적이라 너무 밝지 않게 해주세요" images={['https://picsum.photos/100', 'https://picsum.photos/101']} onRecord={() => {}} />

      {/* 고객 상세 정보 카드 */}
      <CustomerInfoCard name="주수진" phone="010-1234-5678" gender="여성" visitCount={5} lastVisitAt="마지막 방문 3개월 전" />

      {/* 모달 */}
      <button onClick={() => setModalOpen(true)}>모달 열기</button>

      <Modal isOpen={modalOpen} title="정말 삭제할까요?" description="삭제한 고객 정보는 복구할 수 없어요" confirmLabel="삭제하기" onConfirm={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />

      <ContextMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: '수정하기', icon: '/img/edit.svg', onClick: () => {} },
          { label: '삭제하기', icon: '/img/trash.svg', onClick: () => {} },
        ]}
      />

      <SurveyFooter onNext={() => {}} disabled={false}>
        선택하지 않아도 괜찮아요
      </SurveyFooter>

      {/* 
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <button onClick={showToast}>토스트 테스트</button>
        <Toast message="설문 URL이 복사되었어요" visible={visible} />
      </div> */}
    </div>
  )
}
