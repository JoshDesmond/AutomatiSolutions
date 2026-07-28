import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import DigitalPresence from './pages/services/DigitalPresence'
import PhreePet from './pages/products/PhreePet'
import NameSurveyPage from './pages/products/phreepet/name-survey'
import NameResultsPage from './pages/products/phreepet/name-results'
import PausePetPrivacyPolicyPage from './pages/products/phreepet/privacy-policy'
import PausePetSupportPage from './pages/products/phreepet/support'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

/** Redirect legacy /products/phreepet/* URLs to /products/pausepet/* */
function PhreePetLegacyRedirect() {
  const { pathname, search, hash } = useLocation()
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const newPath = normalized.replace(/^\/products\/phreepet/, '/products/pausepet')
  return <Navigate to={`${newPath}${search}${hash}`} replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/pausepet/name-survey" element={<NameSurveyPage />} />
        <Route path="/products/phreepet" element={<PhreePetLegacyRedirect />} />
        <Route path="/products/phreepet/*" element={<PhreePetLegacyRedirect />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/digital-presence" element={<DigitalPresence />} />
          <Route path="/products/pausepet" element={<PhreePet />} />
          <Route path="/products/pausepet/name-results" element={<NameResultsPage />} />
          <Route
            path="/products/pausepet/privacy-policy"
            element={<PausePetPrivacyPolicyPage />}
          />
          <Route path="/products/pausepet/support" element={<PausePetSupportPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
