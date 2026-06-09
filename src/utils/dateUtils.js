// 날짜 변환
export function getElapsedTime(dateString) {
  const now = new Date()
  const past = new Date(dateString)
  const diffDays = Math.floor((now - past) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return '오늘'
  if (diffDays < 7) return `${diffDays}일 전`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`
  return `${Math.floor(diffDays / 365)}년 전`
}

// 연락처 포맷 변환
export function formatPhone(phone) {
  if (!phone) return ''
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}

// 성별 포맷 변환
export function formatGender(g) {
  return g === 'MALE' ? '남성' : g === 'FEMALE' ? '여성' : '알 수 없음'
}
