"use client";

import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { trackClick } from "@/lib/track";

interface Props {
  filename: string;
  title: string;
  resultRef: React.RefObject<HTMLDivElement | null>;
}

export default function DownloadPDF({ filename, title, resultRef }: Props) {
  const [loading, setLoading] = useState(false);

  const download = useCallback(async () => {
    if (!resultRef.current) return;
    setLoading(true);
    trackClick("pdf_download");

    try {
      const el = resultRef.current;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fafaf7",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const pageHeight = 277;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text("Chinese Culture Studio", 10, 12);
      pdf.text(title, 10, 17);
      pdf.text(new Date().toISOString().slice(0, 10), 190, 17, { align: "right" });
      pdf.line(10, 20, 200, 20);
      pdf.setTextColor(80, 80, 80);

      let heightLeft = imgHeight;
      let position = 24;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - position;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 14;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 14;
      }

      pdf.save(`${filename}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setLoading(false);
    }
  }, [resultRef, filename, title]);

  return (
    <button
      onClick={download}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
      style={{
        borderColor: "var(--border-medium)",
        color: "var(--text-body)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      {loading ? "⏳ Generating..." : "📄 Download PDF"}
    </button>
  );
}
