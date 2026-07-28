import { Link } from 'react-router'

const PausePetSupportPage = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">PausePet Support</h1>
      <p className="mt-4">
        PausePet is a productivity pet simulator by Josh Desmond.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Contact</h2>
      <p className="mt-4">
        Email:{' '}
        <a href="mailto:developerdesmond@gmail.com">developerdesmond@gmail.com</a>
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">FAQ</h2>

      <div className="mt-6 space-y-8">
        <section>
          <h3 className="text-lg font-semibold">
            How does PausePet track my screen time?
          </h3>
          <p className="mt-2">
            PausePet needs Device Activity / Screen Time access to score usage. iOS
            users can choose which apps to monitor during setup.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold">Is my account saved?</h3>
          <p className="mt-2">
            In order to restore your save, you need to have signed in with a Google or
            Apple account. Guest accounts cannot be recovered if your phone is lost or
            the app is deleted.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold">Is my screen time saved?</h3>
          <p className="mt-2">
            Your actual screen time is tracked on device and never synchronized to the
            cloud. Only a subset of gameplay variables are saved, like the pets in your
            garden, or the current mood and level of your pet. See the{' '}
            <Link to="/products/phreepet/privacy-policy" className="underline">
              privacy policy
            </Link>{' '}
            for more details.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold">Where can I see the privacy policy?</h3>
          <p className="mt-2">
            <Link to="/products/phreepet/privacy-policy" className="underline">
              Here
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default PausePetSupportPage
