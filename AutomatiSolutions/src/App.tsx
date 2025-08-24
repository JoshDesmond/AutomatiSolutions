import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import DigitalPresence from './pages/services/DigitalPresence'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/digital-presence" element={<DigitalPresence />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
