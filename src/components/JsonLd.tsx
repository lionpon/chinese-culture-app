const BASE_URL = "https://chinese-culture-app.onrender.com";

export default function JsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Chinese Culture Studio",
      url: BASE_URL,
      description:
        "Free I Ching divination, Chinese name reading, auspicious date selection, and palm reading. Discover ancient Chinese wisdom online.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Chinese Culture Studio",
      url: BASE_URL,
      inLanguage: ["en", "ru", "ja", "ko"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/divination`,
        "query-input": "required name=question",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Chinese Culture Studio",
      url: BASE_URL,
      description:
        "Cultural experiences based on Chinese classics: name creation, auspicious date selection, I Ching divination, and palm reading. Voluntary contributions welcome (min $1).",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "1.00",
        priceCurrency: "USD",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

export function BreadcrumbListSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function DailyArticleSchema({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: { "@type": "Organization", name: "Chinese Culture Studio" },
    publisher: { "@type": "Organization", name: "Chinese Culture Studio", url: BASE_URL },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
