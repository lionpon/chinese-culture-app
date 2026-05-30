// FAQ structured data for guide pages
export default function GuideFaq({ faqs, lang }: { faqs: { q: string; a: string }[]; lang: string }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const inLanguage = lang === "ru" ? "ru" : "en";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ ...faqSchema, inLanguage }),
        }}
      />
      <section className="card-classic p-4 sm:p-6 mt-8">
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          {lang === "ru" ? "Часто Задаваемые Вопросы" : "Frequently Asked Questions"}
        </h2>
        <dl className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i}>
              <dt className="text-sm font-medium text-stone-700 mb-1">{faq.q}</dt>
              <dd className="text-sm text-stone-500 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
