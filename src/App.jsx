// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/designer/login'
import Register from './pages/designer/register'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg px-5" style={{ height: '100dvh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
