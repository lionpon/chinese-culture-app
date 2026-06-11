export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto prose prose-sm prose-stone">
      <h1 className="text-2xl font-bold text-accent">Privacy Policy</h1>
      <p className="text-xs text-stone-400">Last updated: 3 June 2026</p>

      <h2>1. Who We Are</h2>
      <p>
        Chinese Culture Studio (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website
        at <strong>www.culture-of-china.com</strong>. We provide algorithmically generated
        Chinese cultural interpretations — naming, auspicious date selection, and I Ching divination.
      </p>
      <p>
        For the purposes of the EU General Data Protection Regulation (GDPR), we act as the
        <strong> Data Controller</strong>. For users in Japan, this policy complies with the
        <strong>Act on Protection of Personal Information (APPI)</strong>. For users in the Republic of Korea,
        this policy complies with the <strong>Personal Information Protection Act (PIPA)</strong>.
        Our hosting infrastructure is located in the United States
        (Render, Oregon) with database services (Neon, US-East).
      </p>

      <h2>2. Data We Collect</h2>
      <p>We collect only the minimum data necessary to provide each service:</p>
      <ul>
        <li><strong>Naming:</strong> Surname, gender, birth year/month/day/hour, style preference.</li>
        <li><strong>Date Selection:</strong> Date range and event type (e.g. wedding, business).</li>
        <li><strong>Divination:</strong> Optional question and casting method.</li>
        <li><strong>Palm Reading:</strong> Palm photograph, hand side, gender (optional), age range (optional), and an optional question. See Section 3a for detailed handling.</li>
        <li><strong>Visit Analytics:</strong> Page path, country (derived from IP, not stored as IP), and referrer. Your IP address is never persisted.</li>
      </ul>
      <p>
        No account registration, email address, phone number, or full name is collected.
        All input is voluntarily provided by you when submitting a service form.
      </p>

      <h2>3a. Palm Image Processing (Biometric Data)</h2>
      <p>
        The Palm Reading service requires you to upload a photograph of your palm. Palm images may
        be considered biometric data under certain privacy laws including GDPR Article 9,
        Korea&apos;s PIPA Article 23 (Sensitive Information), and the
        Illinois Biometric Information Privacy Act (BIPA). We take the following measures:
      </p>
      <ul>
        <li><strong>Explicit Consent:</strong> You must check a consent box before submitting. This constitutes
        your informed, explicit consent to the processing of your palm image for the sole purpose of
        generating this reading (GDPR Art. 9(2)(a); BIPA §15(b)).</li>
        <li><strong>No Persistent Storage:</strong> Your palm image is held only in server memory (RAM)
        for a maximum of 5 minutes. It is never written to disk, never stored in a database, and
        automatically deleted after the reading is generated. If you abandon the checkout process,
        the image expires automatically within 5 minutes.</li>
        <li><strong>Single Purpose:</strong> The image is used exclusively to generate your palm reading
        result. It is not used for identification, authentication, profiling, or any purpose other
        than this reading.</li>
        <li><strong>No Training:</strong> We do not use your palm image to train machine learning models.
        Our AI provider&apos;s API is accessed via OpenRouter. Neither OpenRouter nor the underlying model
        provider (Qwen / Alibaba Cloud) train on API-submitted data.</li>
        <li><strong>No Sale or Disclosure:</strong> We do not sell, lease, trade, or otherwise disclose
        your palm image to any third party. It is transmitted only to Anthropic&apos;s API for processing,
        and only over encrypted (TLS) connections.</li>
        <li><strong>No Collection of Minors&apos; Data:</strong> We do not knowingly process palm images
        from individuals under 18 years of age.</li>
      </ul>
      <p>
        You may withdraw consent at any time by not submitting the form. Once a reading is generated,
        the image has already been deleted — there is nothing retained to revoke consent for.
      </p>

      <h2>3. Legal Basis for Processing</h2>
      <p>Depending on your jurisdiction, we rely on the following legal bases:</p>
      <ul>
        <li><strong>Performance of a Contract (GDPR Art. 6(1)(b); APPI Art. 16(1); PIPA Art. 15):</strong> Processing your input data to generate the service result you requested.</li>
        <li><strong>Legitimate Interest (GDPR Art. 6(1)(f); APPI Art. 16(3)):</strong> Basic visit analytics (page path, country) to understand service usage and maintain security. No IP addresses are retained.</li>
        <li><strong>Legitimate Interest — Abuse Prevention (GDPR Art. 6(1)(f); APPI Art. 16(3); PIPA Art. 15(1)(vi)):</strong> Server-side anonymous fingerprint (SHA-256 hash of IP + User-Agent) to enforce free-tier limits and prevent abuse. The hash is irreversible and contains no personal data.</li>
        <li><strong>Explicit Consent (GDPR Art. 9(2)(a); PIPA Art. 23(1)):</strong> Palm image processing for the Palm Reading service. You provide this consent via an explicit checkbox before submission. The image is held in memory for a maximum of 5 minutes and never stored.</li>
      </ul>

      <h2>4. Payment Processing</h2>
      <p>
        All payments are processed by <strong>Lemon Squeezy</strong>, a PCI-DSS compliant payment processor
        (which supports PayPal, Alipay, WeChat Pay, and major credit cards as checkout options).
        We never receive, store, or transmit your payment details.
        Lemon Squeezy provides us only with an order ID and payment status to confirm completion.
        Lemon Squeezy&apos;s privacy policy applies to all payment-related data:{" "}
        <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">lemonsqueezy.com/privacy</a>.
      </p>

      <h2>5. Cookies &amp; Local Storage</h2>
      <ul>
        <li><strong>Essential — Free Tier Tracking:</strong> One localStorage key (<code>cc-free-tier</code>) stores your remaining free readings count for UX display. The authoritative limit is enforced server-side via anonymous fingerprint (SHA-256 hash of IP + User-Agent), with no personal data stored.</li>
        <li><strong>Essential — Consent Record:</strong> One localStorage key (<code>cc-cookie-consent</code>) records your cookie preference (&ldquo;accepted&rdquo; or &ldquo;declined&rdquo;).</li>
        <li><strong>Session:</strong> Next.js sets a minimal server-side session cookie required for the payment redirect flow. This contains no personal data.</li>
      </ul>
      <p>
        We do <strong>not</strong> use advertising cookies, tracking cookies, third-party analytics
        (Google Analytics, Facebook Pixel, etc.), or cross-site trackers of any kind.
        The server-side free-tier fingerprint is a one-way hash used solely to enforce usage limits — it cannot be reversed to identify you or shared with third parties.
      </p>

      <h2>6. Data Retention</h2>
      <ul>
        <li><strong>Contribution records (input + result):</strong> Stored in our database. These records are kept to provide the service and support revenue reporting. They contain only the input you provided and the algorithmically generated result — no personal identifiers.</li>
        <li><strong>Visit analytics:</strong> Stored in our database. Country-level data only. No IP addresses are retained.</li>
        <li><strong>Free-tier fingerprint:</strong> A one-way SHA-256 hash of your IP and User-Agent, stored with your free-trial record to enforce the 1-use limit. The original IP is never stored — only the hash, which is irreversible.</li>
        <li><strong>Local storage:</strong> Managed entirely in your browser. Clearing browser data removes free-tier display count and consent preference immediately (the server-side limit persists to prevent abuse).</li>
      </ul>
      <p>
        You may request deletion of your data at any time (see Section 7).
      </p>

      <h2>7. Your Rights (GDPR)</h2>
      <p>If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have the following rights under GDPR:</p>
      <ul>
        <li><strong>Right of Access (Art. 15):</strong> Request confirmation of whether we process your data and a copy of that data.</li>
        <li><strong>Right to Rectification (Art. 16):</strong> Request correction of inaccurate personal data.</li>
        <li><strong>Right to Erasure (Art. 17):</strong> Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
        <li><strong>Right to Restriction (Art. 18):</strong> Request limitation of processing under certain conditions.</li>
        <li><strong>Right to Data Portability (Art. 20):</strong> Receive your data in a structured, machine-readable format.</li>
        <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interest.</li>
        <li><strong>Right to Withdraw Consent (Art. 7(3)):</strong> Withdraw consent at any time. Clear your browser&apos;s localStorage or use the cookie banner to change your preference.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at the email below. We will respond within 30 days.
        You also have the right to lodge a complaint with your local
        <strong> Data Protection Authority (Supervisory Authority)</strong>.
      </p>

      <h2>7a. Your Rights (Japan — APPI)</h2>
      <p>If you are located in Japan, you have the following rights under the Act on Protection of Personal Information (APPI):</p>
      <ul>
        <li><strong>Right to Disclosure (Art. 28):</strong> Request disclosure of the personal data we hold about you and the purpose of its use.</li>
        <li><strong>Right to Correction (Art. 29):</strong> Request correction, addition, or deletion of personal data that is inaccurate.</li>
        <li><strong>Right to Suspension of Use (Art. 30):</strong> Request suspension of use or deletion of personal data that has been handled in violation of APPI or that is no longer necessary.</li>
        <li><strong>Right to Suspension of Transfer (Art. 30(5)):</strong> Request suspension of transfer to third parties where such transfer violates APPI.</li>
        <li><strong>Purpose-of-Use Notification (Art. 27):</strong> Request notification of the purpose of use of your retained personal data.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at the email in Section 13. We will respond within
        2 weeks as required by APPI. You may also file a complaint with the{" "}
        <strong>Personal Information Protection Commission (PPC)</strong> of Japan.
      </p>

      <h2>7b. Your Rights (Republic of Korea — PIPA)</h2>
      <p>If you are located in the Republic of Korea, you have the following rights under the Personal Information Protection Act (PIPA):</p>
      <ul>
        <li><strong>Right to Access (Art. 35):</strong> Request access to and disclosure of your personal information.</li>
        <li><strong>Right to Rectification (Art. 36):</strong> Request correction or deletion of inaccurate personal information.</li>
        <li><strong>Right to Erasure (Art. 37):</strong> Request deletion of your personal information where retention is no longer necessary or lawful.</li>
        <li><strong>Right to Suspension (Art. 37):</strong> Request suspension of processing of your personal information.</li>
        <li><strong>Right to Data Portability (Art. 35-2):</strong> Request transfer of your personal information to you or a designated third party in a structured, machine-readable format.</li>
        <li><strong>Right to Withdraw Consent (Art. 37(2)):</strong> Withdraw your consent to processing at any time. Clear your browser&apos;s localStorage or contact us.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at the email in Section 13. We will respond within
        10 days as required by PIPA. You may also file a complaint with the{" "}
        <strong>Personal Information Protection Commission (PIPC)</strong> of Korea or the{" "}
        <strong>Korea Internet &amp; Security Agency (KISA)</strong>.
      </p>

      <h2>8. Data Sharing &amp; Third Parties</h2>
      <p>
        We do <strong>not</strong> sell, rent, trade, or share your data with any third parties.
        The only external services involved are:
      </p>
      <ul>
        <li><strong>Lemon Squeezy</strong> — Payment processing (supports PayPal, Alipay, WeChat Pay, and cards). Receives only your payment instrument details (not your cultural input data).</li>
        <li><strong>OpenRouter (OpenRouter, Inc.)</strong> — AI API gateway routing Palm Reading requests. Receives only your palm image (transmitted over encrypted TLS). Underlying model inference is performed by <strong>Qwen (Alibaba Cloud)</strong>. Neither OpenRouter nor Alibaba Cloud store API-submitted images or use them for model training.</li>
        <li><strong>Render (Render Services, Inc.)</strong> — US-based cloud hosting. Our application code and database queries run on Render infrastructure.</li>
        <li><strong>Neon, Inc.</strong> — US-based managed PostgreSQL database. All stored data resides in Neon&apos;s us-east-1 region.</li>
      </ul>
      <p>
        Both Render and Neon are certified under the <strong>EU-US Data Privacy Framework (DPF)</strong>{" "}
        or have Standard Contractual Clauses (SCCs) in place for lawful international data transfers.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        Our servers are located in the United States. If you access our service from outside the US
        (including the EEA, Japan, or the Republic of Korea), your data will be transferred to and
        processed in the US. We ensure appropriate safeguards are in place:
      </p>
      <ul>
        <li><strong>EEA, UK, Switzerland:</strong> We rely on DPF certifications and/or Standard Contractual Clauses (SCCs) for lawful data transfers under GDPR.</li>
        <li><strong>Japan:</strong> We inform you that your data will be transferred to servers in the United States. The US has been designated by the PPC as a country with a data protection framework meeting APPI standards for cross-border transfers. We implement organizational and technical safeguards to ensure equivalent protection.</li>
        <li><strong>Republic of Korea:</strong> By using this service, you consent to the transfer of your personal information to the United States for processing as described in this policy, in accordance with PIPA Art. 28-8. We implement equivalent safeguards to those required under PIPA and ensure the recipient (our US-based infrastructure) meets the data protection standards required by Korean law.</li>
      </ul>
      <p>
        By using our service, you acknowledge and agree to these international transfers.
        You may withdraw consent at any time by ceasing use of the service and contacting us.
      </p>

      <h2>10. Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your data:
        HTTPS/TLS encryption in transit; database encryption at rest; access controls on all
        infrastructure; and principle of least privilege for database access.
      </p>

      <h2>11. Children&apos;s Privacy</h2>
      <p>
        Our service is not directed to individuals under 18 years of age. We do not knowingly
        collect personal data from anyone under 18. If you believe a minor has provided us with
        data, please contact us and we will delete it promptly.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top
        indicates when changes were made. Continued use of the service after changes constitutes
        acceptance of the updated policy.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        For privacy-related inquiries, to exercise your data rights, or to report concerns:
      </p>
      <p>
        <strong>Email:</strong> privacy@easternwisdom.app<br />
        <strong>Response time:</strong> Within 10 days for users in Korea (PIPA), 2 weeks for users in Japan (APPI), 30 days for all other users (GDPR).
      </p>
      <p className="text-xs text-stone-400 mt-6 border-t border-stone-200 pt-4">
        Chinese Culture Studio — Data Controller. Hosted on Render (Oregon, US) with Neon PostgreSQL (US-East).
      </p>
    </div>
  );
}
