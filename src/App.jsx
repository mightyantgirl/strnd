// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/designer/login'
import Register from './pages/designer/register'
import Home from './pages/designer/home'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg px-5" style={{ height: '100dvh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
