// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/designer/login'
import Register from './pages/designer/register'
import Home from './pages/designer/home'
import NewCustomer from './pages/designer/newcustomers'
import CustomerDetail from './pages/designer/customerdetail'
import NotFound from './pages/404page'
import axios from 'axios'

const isLoggedIn = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg px-5" style={{ height: '100dvh' }}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn() ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

          <Route path="/customers/new" element={<NewCustomer />} />
          <Route path="/customers/:customerId" element={<CustomerDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
