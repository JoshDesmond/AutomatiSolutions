import PhreePetFeatureCarousel from '@/components/phreepet/PhreePetFeatureCarousel'
import PhreePetHero from '@/components/phreepet/PhreePetHero'
import PhreePetSignupSection from '@/components/phreepet/PhreePetSignupSection'

const PhreePet: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <PhreePetHero />

      <section className="py-16 bg-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Stop the scroll. Choose wellness.
          </h2>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Are you addicted to your phone? I am. So are most people. That&apos;s why I
            decided to build the Phone-Free Pet Simulator, (or codename, "PhreePet" for short!). The premise
            is simple: Your pet&apos;s growth and well-being depends on you staying off
            your phone.
          </p>
        </div>
      </section>

      <PhreePetFeatureCarousel />

      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Zero-Knowledge by Design. Your Data Stays Yours.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            PhreePet is privacy-first from the ground up. Everything runs locally on your
            phone&mdash;on both iOS and Android.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 text-left">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">No Raw Data</h3>
              <p className="mt-2 text-gray-600">
                No information about which apps you use, or how long you use them, is ever
                collected, viewed, or stored.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">On-Device Processing</h3>
              <p className="mt-2 text-gray-600">
                All app limits and usage timers live entirely on your device. Nothing leaves
                your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PhreePetSignupSection />
    </div>
  )
}

export default PhreePet
