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

async function waitForImages(node, timeout = 5000) {
  const imgs = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (!img.src) return resolve();
          if (img.complete && img.naturalWidth !== 0) return resolve();
          const onLoad = () => {
            cleanup();
            resolve();
          };
          const onError = () => {
            cleanup();
            resolve();
          };
          const cleanup = () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
          };
          img.addEventListener("load", onLoad);
          img.addEventListener("error", onError);
          setTimeout(() => {
            cleanup();
            resolve();
          }, timeout);
        })
    )
  );
}

async function waitForFonts() {
  if (document?.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* ignore */
    }
  }
}

// ✅ FIXED capture function — matches preview perfectly
async function captureNode(node) {
  await waitForImages(node);
  await waitForFonts();
  await wait(30);

  const width = 410;
  const height = 260;
  const scale = 2;

  node.style.transform = "none";
  node.style.fontSmoothing = "antialiased";

  const canvas = await html2canvas(node, {
    backgroundColor: "#ffffff",
    width,
    height,
    scale,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: width,
    windowHeight: height,
  });

  return canvas.toDataURL("image/png");
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
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const container = HiddenContainer.current;
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll("[data-html2canvas-card]")
      );

      const cardWidth = 85.6; // mm
      const cardHeight = 54; // mm
      const marginX = 10;
      const marginY = 10;
      const gapX = 8;
      const gapY = 8;
      const cardsPerRow = 2;
      const cardsPerCol = 4;

      let x = marginX;
      let y = marginY;
      let cardCount = 0;

      for (let i = 0; i < cards.length; i++) {
        const dataUrl = await captureNode(cards[i]);
        pdf.addImage(dataUrl, "PNG", x, y, cardWidth, cardHeight);

        cardCount++;
        x += cardWidth + gapX;

        if (cardCount % cardsPerRow === 0) {
          x = marginX;
          y += cardHeight + gapY;
        }

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
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "0px",
          width: "410px",
          height: "260px",
          visibility: "visible",
          pointerEvents: "none",
        }}
      >
        <div style={{ "--accent": school.accent }}>
          {students.map((s, i) => (
            <div
              key={i}
              data-html2canvas-card
              style={{
                width: "410px",
                height: "260px",
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
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
