export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Chinese Culture Studio",
    url: "https://chinese-culture-app.onrender.com",
    description: "Authentic Chinese culture experiences: Chinese name creation, auspicious date selection, and I Ching divination. $1 per reading.",
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
