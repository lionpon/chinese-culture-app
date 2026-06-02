export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto prose prose-sm prose-stone">
      <h1 className="text-2xl font-bold text-accent">Terms of Service</h1>
      <p className="text-xs text-stone-400">Last updated: May 2026</p>

      <h2>1. Nature of Service</h2>
      <p>
        Chinese Culture Studio provides automated cultural interpretations based on traditional Chinese
        principles. The Chinese name suggestions, auspicious date selections, I Ching divination readings,
        and palm readings are generated algorithmically or via AI analysis by reference to classical Chinese
        texts and traditional methods. This service is intended for <strong>entertainment and cultural
        appreciation purposes only</strong>. It does not provide, and should not be relied upon as,
        professional advice of any kind — legal, medical, financial, psychological, or otherwise.
        No client-professional relationship is established through the use of this service.
      </p>

      <h2>2. No Guarantees</h2>
      <p>
        We make no representations or warranties regarding the accuracy, completeness, or applicability
        of any reading or result. All results are algorithmically generated cultural interpretations and
        should be treated as such. You acknowledge that you are solely responsible for any decisions or
        actions you take based on these results, and you accept all risks associated therewith.
      </p>

      <h2>3. Payment &amp; Contributions</h2>
      <p>
        Each reading requires a contribution of USD $1.00, processed securely through Lemon Squeezy
        (which supports PayPal, Alipay, WeChat Pay, and major credit cards as payment methods).
        <strong>This payment is a voluntary contribution toward the hosting, development, API costs,
        and ongoing maintenance of this application.</strong> It is not a purchase of advice, a consultation
        fee, or compensation for any particular outcome, and it does not create any advisory, fiduciary,
        or client-professional relationship. You are supporting the continued availability of this
        cultural resource, and in return you receive an AI-generated or algorithmically generated
        interpretation as a token of appreciation. All payments are final. If you experience a technical
        issue preventing result delivery, please contact us for resolution.
      </p>

      <h2>4. Biometric Data Consent (Palm Reading)</h2>
      <p>
        By using the Palm Reading service, you explicitly consent to the capture and transient processing
        of your palm photograph for the sole purpose of generating a palmistry reading. You acknowledge that:
      </p>
      <ul>
        <li>Your palm image will be held only in temporary server memory (not on disk or in a database)
        for a maximum of 5 minutes, and will be permanently deleted immediately after your reading is generated.</li>
        <li>The image is transmitted via OpenRouter to Qwen&apos;s API (Alibaba Cloud) solely for AI analysis;
        neither OpenRouter nor Alibaba Cloud store or train on API-submitted data.</li>
        <li>You are at least 18 years of age, or have obtained parental consent to use this service.</li>
        <li>You may withdraw this consent at any time by simply not submitting the form. Once a reading
        is generated, the image no longer exists and cannot be retrieved.</li>
      </ul>

      <h2>5. Privacy</h2>
      <p>
        We collect minimal data necessary to provide the service. Birth information is used
        solely for algorithm calculations and is automatically deleted 7 days after processing.
        Payment information is handled entirely by Lemon Squeezy and never touches our servers.
        Please see our Privacy Policy for full details.
      </p>

      <h2>6. Age Restriction</h2>
      <p>
        This service is intended for users aged 18 and above. By using this service,
        you confirm that you are at least 18 years old.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        The classical texts referenced (Book of Songs, Songs of Chu, Analects, Book of Changes, etc.)
        are part of the world&apos;s cultural heritage. Our algorithms, unique character database,
        and presentation are proprietary.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Chinese Culture Studio shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages arising from your use
        of the service. Our total liability is limited to the amount you paid for the specific reading.
      </p>

      <h2>9. Changes</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use after changes
        constitutes acceptance of the new terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any questions about these terms, please contact us at support@easternwisdom.app.
      </p>
    </div>
  );
}
