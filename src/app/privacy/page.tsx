export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto prose prose-sm prose-stone">
      <h1 className="text-2xl font-bold" style={{ color: "var(--accent)" }}>Privacy Policy</h1>
      <p className="text-xs text-stone-400">Last updated: May 2026</p>

      <h2>1. Data We Collect</h2>
      <p>
        Chinese I Ching Reading is designed with <strong>privacy by default</strong>. We collect only the
        minimum data needed to provide each reading:
      </p>
      <ul>
        <li><strong>Naming:</strong> Surname, gender, birth date/time, style preference.</li>
        <li><strong>Date Selection:</strong> Date range and event type.</li>
        <li><strong>Divination:</strong> Optional question and casting method.</li>
      </ul>
      <p>
        No account registration is required. We do not collect names, email addresses,
        or phone numbers from unregistered users.
      </p>

      <h2>2. Payment Data</h2>
      <p>
        All payments are processed by <strong>Lemon Squeezy</strong>, a PCI-compliant payment processor
        and Merchant of Record. We never receive, store, or transmit your credit card details.
        Lemon Squeezy provides us only with a transaction ID to confirm payment completion.
      </p>

      <h2>3. Data Retention</h2>
      <p>
        Input data (birth information, questions, preferences) and generated results are
        stored for a maximum of <strong>7 days</strong> after processing, then automatically deleted.
        This allows you to return to view your result within a reasonable window.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use only essential session cookies required for the payment flow.
        No tracking cookies, advertising cookies, or third-party analytics are used.
      </p>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell, rent, or share your data with any third parties.
        The only third-party service we use is Lemon Squeezy for payment processing.
      </p>

      <h2>6. Your Rights (GDPR / CCPA)</h2>
      <ul>
        <li><strong>Right to Access:</strong> Contact us to request any data associated with your transaction.</li>
        <li><strong>Right to Deletion:</strong> Data is auto-deleted after 7 days. You may also request immediate deletion.</li>
        <li><strong>Right to Portability:</strong> We can export your result data upon request.</li>
      </ul>

      <h2>7. Security</h2>
      <p>
        We implement industry-standard security measures including HTTPS encryption,
        secure server infrastructure (Vercel), and database access controls.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        Our service is not directed to children under 18. We do not knowingly collect
        data from anyone under 18 years of age.
      </p>

      <h2>9. International Users</h2>
      <p>
        Our servers are located in the United States. By using our service, you consent
        to the processing of your data in the US. We comply with applicable data protection
        laws including GDPR for EU users and CCPA for California residents.
      </p>

      <h2>10. Contact</h2>
      <p>
        For privacy-related inquiries or to exercise your data rights, contact us at
        privacy@easternwisdom.app.
      </p>
    </div>
  );
}
