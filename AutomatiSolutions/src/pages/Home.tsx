import Hero from '../components/home/Hero/Hero'
import ValueProposition from '../components/home/ValueProposition/ValueProposition'
import Services from '../components/home/Services/Services'
import Process from '../components/home/Process/Process'
import Contact from '../components/home/Contact/Contact'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Services />
      <Process />
      <Contact />
    </>
  )
}

export default Home 