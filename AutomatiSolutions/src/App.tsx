import Header from './components/layout/Header/Header'
import Hero from './components/home/Hero/Hero'
import ValueProposition from './components/home/ValueProposition/ValueProposition'
import Services from './components/home/Services/Services'
import Process from './components/home/Process/Process'
import Contact from './components/home/Contact/Contact'
import Footer from './components/layout/Footer/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <ValueProposition />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </div>
  )
}

export default App