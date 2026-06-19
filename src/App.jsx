// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/designer/login'
import Register from './pages/designer/register'
import Home from './pages/designer/home'
import NewCustomer from './pages/designer/newcustomers'
import CustomerDetail from './pages/designer/customerdetail'
import RecordWithoutSurvey from './pages/designer/recordwithoutsurvey'
import TreatmentResult from './pages/designer/treatmentresult'
import SurveyMain from './pages/survey/main'
import SurveySteps from './pages/survey/surveysteps'
import SurveyDone from './pages/survey/surveydone'

import NotFound from './pages/404page'
import Splash from './pages/splash'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg px-5" style={{ height: '100dvh' }}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

          <Route path="/customers/new" element={<NewCustomer />} />
          <Route path="/customers/:customerId" element={<CustomerDetail />} />

          <Route path="/customers/:customerId/record" element={<RecordWithoutSurvey />} />
          <Route path="/customers/:customerId/result" element={<TreatmentResult />} />

          <Route path="/survey/:visitId" element={<SurveyMain />} />
          <Route path="/survey/:visitId/steps" element={<SurveySteps />} />
          <Route path="/survey/:visitId/done" element={<SurveyDone />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
