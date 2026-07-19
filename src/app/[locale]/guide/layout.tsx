import { BASE_URL } from "@/lib/config";
import { BreadcrumbListSchema } from "@/components/JsonLd";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Chinese Culture Studio", url: BASE_URL },
          { name: "Guides", url: `${BASE_URL}/guide/iching` },
        ]}
      />
      {children}
    </>
  );
}
