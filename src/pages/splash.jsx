import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const isLoggedIn = () => localStorage.getItem('token') || sessionStorage.getItem('token')

export default function Splash() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)

    const minDelay = new Promise((resolve) => setTimeout(resolve, 2500))

    if (!isLoggedIn()) {
      minDelay.then(() => {
        setVisible(false)
        setTimeout(() => navigate('/login'), 300)
      })
      return
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const fetchHome = fetch('https://strnd-be.onrender.com/api/home', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          return null
        }
        return r.json()
      })
      .catch(() => null)

    Promise.all([minDelay, fetchHome]).then(([, homeData]) => {
      setVisible(false)
      setTimeout(() => {
        if (!homeData) {
          navigate('/login')
        } else {
          navigate('/home', { state: { homeData } })
        }
      }, 300)
    })
  }, [])

  return (
    <div
      className="flex items-center justify-center transition-opacity duration-300"
      style={{ height: '100dvh', opacity: visible ? 1 : 0 }}>
      <img src="/img/app.svg" alt="strnd" className="w-24" />
    </div>
  )
}
