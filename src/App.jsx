// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/designer/login'
import Register from './pages/designer/register'
import Home from './pages/designer/home'

const isLoggedIn = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 접속 시 토큰 있으면 홈, 없으면 로그인 */}
        <Route path="/" element={isLoggedIn() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
