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

  // Render hidden all-cards container for bulk export
  useEffect(() => {
    // No-op: container is in JSX; we rely on it being in the tree
  }, [templateKey, Templates, school, fields, students]);

  async function captureNode(node, scale = 2) {
    const canvas = await html2canvas(node, {
      backgroundColor: null,
      scale,
      useCORS: true,
      imageTimeout: 0,
      logging: false,
    });
    return canvas.toDataURL("image/png");
  }

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
        // tiny delay to keep UI responsive
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

  async function exportPDF() {
    try {
      setIsExporting(true);
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const container = HiddenContainer.current;
      if (!container) return;
      const cards = Array.from(
        container.querySelectorAll("[data-html2canvas-card]")
      );
      let first = true;
      for (let i = 0; i < cards.length; i++) {
        const dataUrl = await captureNode(cards[i]);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = dataUrl;
        await new Promise((res) => {
          img.onload = () => res();
          img.onerror = () => res();
        });
        // Fit image to A4 page with margins
        const pageW = 595.28; // A4 width in pt
        const pageH = 841.89; // A4 height in pt
        const margin = 24;
        const targetW = pageW - margin * 2;
        const imgRatio = img.width / img.height;
        const targetH = targetW / imgRatio;
        if (!first) pdf.addPage();
        pdf.addImage(
          dataUrl,
          "PNG",
          margin,
          Math.max(margin, (pageH - targetH) / 2),
          targetW,
          targetH,
          undefined,
          "FAST"
        );
        first = false;
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

      {/* Hidden render of all cards for bulk export */}
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
