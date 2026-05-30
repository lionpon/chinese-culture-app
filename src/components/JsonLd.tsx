export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Chinese Culture Studio",
    url: "https://chinese-culture-app.onrender.com",
    description: "Cultural experiences based on Chinese classics: name creation, auspicious date selection, I Ching divination, and palm reading. Voluntary contributions welcome (min $1).",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "1.00",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
