import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import DigitalPresence from './pages/services/DigitalPresence'
import PhreePet from './pages/products/PhreePet'
import NameSurveyPage from './pages/products/phreepet/name-survey'
import NameResultsPage from './pages/products/phreepet/name-results'
import PhreePetPrivacyPolicyPage from './pages/products/phreepet/privacy-policy'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/phreepet/name-survey" element={<NameSurveyPage />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/digital-presence" element={<DigitalPresence />} />
          <Route path="/products/phreepet" element={<PhreePet />} />
          <Route path="/products/phreepet/name-results" element={<NameResultsPage />} />
          <Route
            path="/products/phreepet/privacy-policy"
            element={<PhreePetPrivacyPolicyPage />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
