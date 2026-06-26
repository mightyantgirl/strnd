import { useState } from 'react'
import Badge from './badge'
import ContextMenu from './contextmenu'

const baseClass = `w-full py-5 px-4 rounded-xl  bg-card-bg `
const baseTextClass = `text-xs text-placeholder font-medium`

export default function CustomerInfoCard({
  name,
  isActive,
  lastVisitAt,
  phone,
  gender,
  visitCount,
  onDeleteClick,
  onEditClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={`${baseClass} ${baseTextClass} relative`}>
      <div className=" flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{name}</span>
          {isActive === false ? (
            <span className="text-xs font-semibold mr-1 bg-badge-orange-bg text-badge-orange-text px-2 py-1 rounded-md">
              비활성
            </span>
          ) : (
            <Badge label={lastVisitAt} color="grey" />
          )}
        </div>

        {/* 점 세 개 버튼 */}
        <button
          className="absolute py-5 px-4 right-0 top-0 content-center"
          onClick={() => setMenuOpen(!menuOpen)}>
          <img src="/img/threedot.svg" alt="" />
        </button>

        {/* ContextMenu */}
        {menuOpen && (
          <ContextMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            items={[
              { label: '수정하기', icon: '/img/edit.svg', onClick: () => { setMenuOpen(false); onEditClick?.() } },
              { label: '삭제하기', icon: '/img/trash.svg', onClick: () => { setMenuOpen(false); onDeleteClick?.() } },
            ]}
          />
        )}
      </div>
      <ol className="space-y-2">
        <li>
          <div className="flex justify-between">
            <p>연락처</p>
            <p className="text-secondary">{phone}</p>
          </div>
        </li>
        <li>
          <div className="flex justify-between">
            <p>정보</p>
            <p className="text-secondary">
              {gender} · 총 {visitCount}회 방문
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}
