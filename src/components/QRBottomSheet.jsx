import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Button from './button'

export default function QRBottomSheet({ onClose, surveyUrl }) {
  const [mounted, setMounted] = useState(false)
  const [startY, setStartY] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleClose = () => {
    setMounted(false)
    setTimeout(onClose, 300)
  }

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    const diff = e.touches[0].clientY - startY
    if (diff > 0) setDragY(diff)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (dragY > 80) {
      handleClose()
    } else {
      setDragY(0)
    }
  }

  const overlayOpacity = mounted ? Math.max(0, 1 - dragY / 300) : 0

  return (
    <div className="relative">
      {/* 딤드 배경 */}
      <div
        className="fixed inset-0 bg-black/50 z-10"
        style={{
          opacity: overlayOpacity,
          transition: isDragging ? 'none' : 'opacity 0.3s ease',
        }}
        onClick={handleClose}
      />

      <div
        className="fixed bg-card-bg bottom-0 left-0 w-full px-5 py-4 rounded-tl-xl rounded-tr-xl z-10"
        style={{
          transform: mounted ? `translateY(${dragY}px)` : 'translateY(100%)',
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
        <div
          className="flex justify-center mb-6"
          style={{ touchAction: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className="bg-border rounded-full w-13 h-[6px]" />
        </div>

        <p className="text-2xl font-bold text-primary text-center leading-snug mb-4">
          더 <span className="text-brand">멋진 스타일</span>을 위해
          <br />딱 1분만 투자해주세요!
        </p>

        <p className="text-xs font-semibold text-placeholder text-center mb-8">
          QR을 스캔하면 맞춤 스타일 추천을 받을 수 있어요.
        </p>

        <div className="flex justify-center mb-5">
          <div className="border border-border rounded-3xl p-6">
            <QRCodeSVG value={surveyUrl} size={200} />
          </div>
        </div>

        <p
          className="text-xs font-semibold text-placeholder underline text-center mt-7 mb-7 cursor-pointer"
          onClick={() => window.open(surveyUrl, '_blank')}>
          링크로 바로 이동
        </p>

        {/* 확인 버튼 */}
        <Button value="확인" onClick={handleClose} />
      </div>
    </div>
  )
}
