"use client";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { TemplateBase } from "./templates/template-base";
import { TEMPLATES } from "./templates";

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function DownloadButtons({
  templateKey,
  Templates,
  school,
  fields,
  students,
}) {
  const HiddenContainer = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  // Helper: capture a DOM node as image
  async function captureNode(node, scale = 3) {
    const canvas = await html2canvas(node, {
      backgroundColor: null,
      scale,
      useCORS: true,
      imageTimeout: 0,
      logging: false,
    });
    return canvas.toDataURL("image/png");
  }

  // Export currently visible student as PNG
  async function exportPNGCurrent() {
    try {
      setIsExporting(true);
      const node = document.querySelector("[data-html2canvas-card]");
      if (!node) {
        alert("Preview not found. Please render a student first.");
        return;
      }
      const dataUrl = await captureNode(node);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "id-card.png";
      a.click();
    } finally {
      setIsExporting(false);
    }
  }

  // Export all students as a ZIP of PNGs
  async function exportPNGBulk() {
    try {
      setIsExporting(true);
      const zip = new JSZip();
      const container = HiddenContainer.current;
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll("[data-html2canvas-card]")
      );

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const dataUrl = await captureNode(card);
        const base64 = dataUrl.split(",")[1];
        zip.file(`id-card-${i + 1}.png`, base64, { base64: true });
        await wait(10);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "id-cards.zip";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  }

  // ✅ Export all students as PDF (clean, no overlap)
  async function exportPDF() {
    try {
      setIsExporting(true);
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const container = HiddenContainer.current;
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll("[data-html2canvas-card]")
      );

      // 🪪 Standard ID card size (credit-card dimensions)
      const cardWidth = 85.6; // mm
      const cardHeight = 54; // mm

      // Layout and spacing
      const marginX = 10;
      const marginY = 10;
      const gapX = 8;
      const gapY = 8;

      // 2 columns × 4 rows = 8 cards per page
      const cardsPerRow = 2;
      const cardsPerCol = 4;

      let x = marginX;
      let y = marginY;
      let cardCount = 0;

      for (let i = 0; i < cards.length; i++) {
        const dataUrl = await captureNode(cards[i], 3); // 3x scale for clarity
        pdf.addImage(dataUrl, "PNG", x, y, cardWidth, cardHeight);

        cardCount++;
        x += cardWidth + gapX;

        // Move to next row
        if (cardCount % cardsPerRow === 0) {
          x = marginX;
          y += cardHeight + gapY;
        }

        // New page after 8 cards
        if (
          cardCount % (cardsPerRow * cardsPerCol) === 0 &&
          i < cards.length - 1
        ) {
          pdf.addPage();
          x = marginX;
          y = marginY;
        }

        await wait(10);
      }

      pdf.save("id-cards.pdf");
    } finally {
      setIsExporting(false);
    }
  }

  const TemplateComp = TEMPLATES[templateKey] || TemplateBase;

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-2 text-lg font-medium">Export</h2>

      {/* Export buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-md bg-primary px-3 py-2 text-primary-foreground disabled:opacity-50"
          onClick={exportPNGCurrent}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "PNG (current)"}
        </button>

        <button
          className="rounded-md border px-3 py-2 disabled:opacity-50"
          onClick={exportPNGBulk}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : `PNG ZIP (${students.length})`}
        </button>

        <button
          className="rounded-md border px-3 py-2 disabled:opacity-50"
          onClick={exportPDF}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "PDF (all)"}
        </button>
      </div>

      {/* Hidden render container for bulk export */}
      <div
        ref={HiddenContainer}
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <div style={{ "--accent": school.accent }}>
          {students.map((s, i) => (
            <div key={i} data-html2canvas-card className="inline-block">
              <TemplateComp
                data-template-frame
                school={school}
                fields={fields}
                student={s}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
