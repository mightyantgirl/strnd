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

// 리스트를 최대 길이로 자르고 '...' 추가
export function truncateList(arr, maxLength = 20) {
  if (!arr || arr.length === 0) return ''
  const joined = arr.join(', ')
  return joined.length > maxLength ? joined.slice(0, maxLength) + '...' : joined
}

// 날짜 포맷 변환 (예: 2024-06-01T12:00:00 -> 2024-06-01)
export function formatDate(dateString) {
  if (!dateString) return ''
  return dateString.split('T')[0] // 'T' 기준으로 앞부분만 가져오기
}
