import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getElapsedTime, formatPhone, formatGender } from '../../utils/dateUtils'

import PageFooter from './../../components/pagefooter'
import PageHeader from './../../components/pageheader'
import Button from './../../components/button'
import Input from './../../components/input'
import CustomerInfoCard from './../../components/customerinfocard'

const baseTextClass = `text-xs text-primary font-medium`

export default function CustomerDetail() {
  const { customerId } = useParams() // URL 정보 받아오는 훅
  const [name, setName] = useState('')
  const [lastVisitAt, setLastVisitAt] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  // const [visitCount, setVisitCount] = useState('')

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        const response = await fetch(`https://strnd-be.onrender.com/api/customers/${customerId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        setName(data.customerName)
        setLastVisitAt(data.lastVisitDt)
        setPhone(data.phone)
        setGender(data.gender)
      } catch (error) {
        console.error('데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCustomer()
  }, [])

  const navigate = useNavigate()

  return (
    <div style={{ height: '100dvh' }} className={`${baseTextClass} h-full flex flex-col`}>
      {/* 헤더 */}
      <PageHeader title="고객 상세" onBack={() => navigate('/home')} />

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {isLoading ? (
          <div className="animate-pulse pt-18 pb-6 space-y-2">
            {/* CustomerInfoCard 스켈레톤 */}
            <div className="w-full py-5 px-4 rounded-xl bg-card-bg">
              <div className="flex justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 bg-border rounded-md w-20" />
                  <div className="h-5 bg-border rounded-full w-24" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 bg-border rounded-md w-10" />
                  <div className="h-3 bg-border rounded-md w-24" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-border rounded-md w-8" />
                  <div className="h-3 bg-border rounded-md w-28" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fade-in pt-18 pb-6 space-y-2">
            <CustomerInfoCard
              name={name}
              lastVisitAt={`마지막 방문 ${getElapsedTime(lastVisitAt)}`}
              phone={formatPhone(phone)}
              gender={formatGender(gender)}
            />
          </div>
        )}

        <Button value="설문 시작하기" height="lg" survey={true} />
        <p className="underline font-semibold text-placeholder py-5 px-4 text-center">
          설문 없이 바로 기록하기
        </p>
      </div>
    </div>
  )
}
