import heroImage from '@/assets/phreepet/PhreePet_Hero.jpg'

const PhreePetHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-32 md:pt-12 md:pb-44 min-[817px]:min-h-[55.81vw]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center -translate-y-3 md:-translate-y-6">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl tracking-tight leading-tight">
          Stop Scrolling!
        </h1>
        <p className="mt-3 text-2xl sm:text-3xl font-medium text-gray-800 tracking-tight">
          Adopt Your Phone-Free Pet Instead
        </p>
        <p className="mt-6 text-lg text-gray-700 max-w-xl mx-auto">
          Sign up now to join the early-access Alpha.
        </p>
        <a
          href="#phreepet-signup"
          className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-white/95 px-8 py-3 text-base font-semibold text-gray-900 shadow-md hover:bg-gray-100 transition"
        >
          Waitlist Signup
        </a>
      </div>
    </section>
  )
}

export default PhreePetHero
