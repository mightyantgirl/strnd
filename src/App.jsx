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
import Step0 from './pages/survey/step0'
import Step1 from './pages/survey/step1'
import Step2 from './pages/survey/step2'
import Step3 from './pages/survey/step3'
import Step4 from './pages/survey/step4'
import Step5 from './pages/survey/step5'

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
          <Route path="/survey/:visitId/step0" element={<Step0 />} />
          <Route path="/survey/:visitId/step1" element={<Step1 />} />
          <Route path="/survey/:visitId/step2" element={<Step2 />} />
          <Route path="/survey/:visitId/step3" element={<Step3 />} />
          <Route path="/survey/:visitId/step4" element={<Step4 />} />
          <Route path="/survey/:visitId/step5" element={<Step5 />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
