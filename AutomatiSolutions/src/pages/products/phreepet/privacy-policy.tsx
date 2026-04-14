import type { ReactNode } from 'react'

function PolicyLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

const PhreePetPrivacyPolicyPage = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">PhreePet Privacy Policy</h1>
      <p className="mt-4">
        <strong>Effective date:</strong> April 14, 2026
      </p>
      <p className="mt-4">
        PhreePet is a productivity pet simulator built by Josh Desmond (&quot;I&quot;, &quot;me&quot;,
        &quot;my&quot;). This policy explains what data the app collects, why, and how it is handled.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">The short version</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>Your device usage data from other apps never leaves your device.</li>
        <li>
          I store a small amount of pet-related data in the cloud so your progress is saved and (in the future) so
          friends can see how your pet is doing.
        </li>
        <li>
          I use Firebase Analytics to understand how people use PhreePet itself. I do not collect data about your usage
          of other apps through analytics, and I do not sell your data.
        </li>
        <li>
          Children under 13 are restricted to anonymous accounts. No personal information is collected from them, and
          non-essential analytics are disabled for those accounts.
        </li>
        <li>You can request access to or deletion of your data at any time.</li>
      </ul>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">What data is collected</h2>
      <p className="mt-4">
        The table below lists every category of data the app handles, where it lives, and why.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse border border-black text-left text-sm">
          <thead>
            <tr>
              <th scope="col" className="border border-black p-2 font-bold">
                Data
              </th>
              <th scope="col" className="border border-black p-2 font-bold">
                Stored where
              </th>
              <th scope="col" className="border border-black p-2 font-bold">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold">Device usage data (other apps)</td>
              <td className="border border-black p-2">On your device only</td>
              <td className="border border-black p-2">
                Calculated into a score every 8 hours. This raw data is never uploaded.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Usage scores</td>
              <td className="border border-black p-2">On your device only</td>
              <td className="border border-black p-2">
                A numeric score derived from your device usage data. Used in aggregate to determine your pet&apos;s
                well-being. This device usage data is never uploaded.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Pet state</td>
              <td className="border border-black p-2">Your device + Firebase Cloud Firestore</td>
              <td className="border border-black p-2">
                Your pet&apos;s core attributes (such as hunger, mood/status variables, experience, birth time, and egg
                status). Backed up so your progress persists across sessions and devices, and so friends can view your
                pet&apos;s status. These internal pet simulation values are stored as live snapshots with no historical
                logs.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Firebase anonymous ID</td>
              <td className="border border-black p-2">Firebase Authentication</td>
              <td className="border border-black p-2">
                Every user gets a unique anonymous identifier. For users under 13, this is the only identifier
                associated with their account.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Email address</td>
              <td className="border border-black p-2">Firebase Authentication</td>
              <td className="border border-black p-2">
                Collected only if you sign in with Google or Apple (age 13+). On iOS, Apple provides a private relay
                address rather than your real email. I will not send you emails. This data supports
                account recovery and future social features.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Age (at sign-up)</td>
              <td className="border border-black p-2">On your device only</td>
              <td className="border border-black p-2">
                Used to verify sign-in eligibility and manage age-restricted features. For users under 13, age and
                sign-up date are stored locally to determine future account upgrade eligibility. We use this
                information to automatically disable non-essential analytics and social features for younger users.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Analytics events</td>
              <td className="border border-black p-2">Firebase Analytics (Google)</td>
              <td className="border border-black p-2">
                A small set of predefined in-app events (e.g., app opened, account created, pet hatched, permissions
                granted), plus standard app usage data about interactions within PhreePet. Used solely to understand how
                the app is used so I can improve it. For users under 13, non-essential analytics are disabled.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Firebase Analytics</h2>
      <p className="mt-4">
        The app uses Firebase Analytics, operated by Google, to understand how people use the app. Google acts as a
        data processor on my behalf under{' '}
        <PolicyLink href="https://firebase.google.com/terms/data-processing-terms">
          Firebase&apos;s Data Processing and Security Terms
        </PolicyLink>
        . For full detail, see{' '}
        <PolicyLink href="https://firebase.google.com/support/privacy">Firebase&apos;s privacy documentation</PolicyLink>
        .
      </p>
      <p className="mt-4">
        <strong>What is collected.</strong> Firebase Analytics automatically collects standard technical information
        such as device model, OS version, country, language, and app-session data. It also assigns each app installation
        a unique app-instance ID, which is a device identifier used to tie events to a session. I use it to track a small,
        fixed list of in-app events and app usage metrics within PhreePet, such as whether a user completed onboarding,
        hatched their pet, or how long a PhreePet session lasts. I do not use analytics to collect data about which
        other apps you use, how long you use them, or any other device usage data. That device usage data stays on your
        device and is used only to calculate PhreePet scores.
      </p>
      <p className="mt-4">
        <strong>Why.</strong> I collect analytics because I need to understand how the app is being used so I can improve
        it. I believe this is a reasonable and expected use of the data, given how limited and non-sensitive it is.
      </p>
      <p className="mt-4">
        <strong>Where the data goes.</strong> Firebase may process data on Google servers located outside your country,
        including in the United States. Google provides standard contractual safeguards for international data transfers.
        See their privacy documentation linked above for details.
      </p>
      <p className="mt-4">
        <strong>Retention.</strong> I have configured Firebase Analytics to retain event-level data for 14 months.
        Aggregated reports that cannot identify you may be kept longer.
      </p>
      <p className="mt-4">
        <strong>Consent.</strong> If you are 13 or older, by using PhreePet you consent to the collection of analytics
        data as described in this policy. For users under 13, PhreePet does not rely on a child&apos;s consent for
        analytics; non-essential analytics are disabled and the app is limited to anonymous accounts and core
        functionality. If you are 13 or older and do not agree, please do not use the app.
      </p>
      <p className="mt-4">
        <strong>Children under 13.</strong> For users under 13 (as determined by the age gate during sign-up),
        non-essential analytics are disabled. Those users are limited to anonymous accounts and core functionality
        designed to avoid collecting personal information.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Children&apos;s privacy (under 13)</h2>
      <p className="mt-4">PhreePet includes an age gate during sign-up. If a user indicates they are under 13:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          They are not offered &quot;Sign in with Google&quot; or &quot;Sign in with Apple.&quot; Their account is
          anonymous only.
        </li>
        <li>
          <strong>No personally identifiable information</strong> (such as name or email) is collected.
        </li>
        <li>Non-essential analytics are disabled for their sessions.</li>
        <li>
          Their pet state is still backed up under their anonymous ID so they don&apos;t lose progress.
        </li>
        <li>
          Their <strong>age and sign-up date</strong> are stored locally to determine when they turn 13 and become
          eligible to upgrade to a full account with provider sign-in. This information is also used to automatically
          disable non-essential analytics and social features for younger users.
        </li>
      </ul>
      <p className="mt-4">
        If you are a parent or guardian and believe your child under 13 has somehow provided personal information,
        please contact me at <strong>developerdesmond@gmail.com</strong> and I will delete it promptly.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">How your data is used</h2>
      <p className="mt-4">I use the data described above to:</p>
      <ol className="mt-4 list-decimal space-y-2 pl-6">
        <li>
          <strong>Run the app:</strong> save your pet, calculate scores, and restore your progress.
        </li>
        <li>
          <strong>Improve the app:</strong> understand which features are used, where users drop off, and what to build
          next.
        </li>
        <li>
          <strong>Enable social features:</strong> your pet state and account information will power features like
          friend lists and leaderboards (coming soon).
        </li>
      </ol>
      <p className="mt-4">
        I will never sell, rent, or trade your data. That is not how I plan to support this app.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Data sharing</h2>
      <p className="mt-4">Your data is only shared with third parties in these limited circumstances:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>Firebase / Google,</strong> as the cloud infrastructure provider and analytics processor described
          above.
        </li>
        <li>
          <strong>Legal obligation:</strong> if required by law, subpoena, or similar legal process.
        </li>
        <li>
          <strong>Safety:</strong> if I believe in good faith that disclosure is necessary to protect rights, safety, or
          to investigate fraud.
        </li>
      </ul>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Data retention and deletion</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>Pet state</strong> is kept in Firestore for as long as your account exists.
        </li>
        <li>
          <strong>Analytics data</strong> is retained according to{' '}
          <PolicyLink href="https://firebase.google.com/support/privacy">Firebase&apos;s data retention policies</PolicyLink>
          .
        </li>
        <li>
          <strong>If you want your data deleted</strong>, email me at <strong>developerdesmond@gmail.com</strong>. I will
          delete your Firestore data within a reasonable timeframe.
        </li>
        <li>
          <strong>Age data for under-13 users</strong> is retained in Firestore until the user turns 13 and upgrades their
          account, or until deletion is requested. At that point it is removed.
        </li>
        <li>
          <strong>Uninstalling the app</strong> removes all locally stored data (usage scores, age, and local pet
          state). Cloud-backed data (Firestore) will remain until you request deletion.
        </li>
      </ul>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Your rights</h2>
      <p className="mt-4">You have the following rights regarding your data:</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          <strong>Access:</strong> you can ask me what data I have about you, and I will provide it.
        </li>
        <li>
          <strong>Deletion:</strong> you can ask me to delete your data (see the Data retention and deletion section
          above).
        </li>
        <li>
          <strong>Portability:</strong> you can request a copy of your data in a common, machine-readable format.
        </li>
      </ul>
      <p className="mt-4">
        To exercise any of these, email me at <strong>developerdesmond@gmail.com</strong>. I will respond within a
        reasonable timeframe.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Security</h2>
      <p className="mt-4">
        I use Firebase&apos;s built-in security infrastructure (authentication, Firestore security rules, encrypted
        transport) to protect your data. While no system is perfectly secure, I take reasonable measures appropriate to
        the sensitivity of the data involved.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Changes to this policy</h2>
      <p className="mt-4">
        If I update this policy, I will revise the effective date at the top. For significant changes, I will make
        reasonable efforts to notify users through the app. Continued use of PhreePet after changes take effect
        constitutes acceptance of the revised policy.
      </p>

      <hr className="my-8" />

      <h2 className="text-xl font-bold">Contact</h2>
      <p className="mt-4">If you have questions about this policy or your data, reach me at:</p>
      <p className="mt-4">
        Email: <strong>developerdesmond@gmail.com</strong>
      </p>

      <hr className="my-8" />

      <p className="text-sm">This policy was last updated on April 14, 2026.</p>
    </main>
  )
}

export default PhreePetPrivacyPolicyPage
