"use client";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
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
          const onLoad = () => cleanup(resolve);
          const onError = () => cleanup(resolve);
          const cleanup = (r) => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
            r();
          };
          img.addEventListener("load", onLoad);
          img.addEventListener("error", onError);
          setTimeout(() => cleanup(resolve), timeout);
        })
    )
  );
}

async function waitForFonts() {
  if (document?.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }
}

async function captureNode(node) {
  await waitForImages(node);
  await waitForFonts();
  await wait(30);

  // Detect orientation
  const isVertical = node.dataset.orientation === "vertical";

  const width = isVertical ? 260 : 410;
  const height = isVertical ? 410 : 260;

  const scale = 2;

  return await htmlToImage.toPng(node, {
    backgroundColor: "#ffffff",
    width,
    height,
    pixelRatio: scale,
    cacheBust: true,
    style: {
      transform: "none",
      fontSmoothing: "antialiased",
    },
  });
}

export function DownloadButtons({ templateKey, school, fields, students }) {
  const HiddenContainer = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const isVertical = templateKey.startsWith("vertical");
  const TemplateComp = TEMPLATES[templateKey] || TemplateBase;

  async function exportPNGCurrent() {
    try {
      setIsExporting(true);
      const node = document.querySelector("[data-html2canvas-card]");
      if (!node) return alert("Preview not found.");
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
        const dataUrl = await captureNode(cards[i]);
        zip.file(`id-card-${i + 1}.png`, dataUrl.split(",")[1], {
          base64: true,
        });
        await wait(20);
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

      // Card dimensions in mm (vertical template)
      const cardWidth = isVertical ? 54 : 85.6;
      const cardHeight = isVertical ? 85.6 : 54;

      const gapX = 8; // horizontal gap between cards
      const gapY = 8; // vertical gap
      const marginLeft = 10;
      const marginTop = 10;

      let x = marginLeft;
      let y = marginTop;

      const cardsPerRow = isVertical ? 3 : 2; // 3 cards per row horizontally for vertical template

      for (let i = 0; i < cards.length; i++) {
        const dataUrl = await captureNode(cards[i]);

        pdf.addImage(dataUrl, "PNG", x, y, cardWidth, cardHeight);

        x += cardWidth + gapX;

        // Move to next row if row is full
        if ((i + 1) % cardsPerRow === 0) {
          x = marginLeft;
          y += cardHeight + gapY;
        }

        // Add new page if y exceeds page height
        if (y + cardHeight > 287 && i < cards.length - 1) {
          pdf.addPage();
          x = marginLeft;
          y = marginTop;
        }

        await wait(20);
      }

      pdf.save("id-cards.pdf");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-2 text-lg font-medium">Export</h2>

      <div className="flex gap-2 flex-wrap">
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

      {/* Hidden container for bulk/PDF capture */}
      <div
        ref={HiddenContainer}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "0px",
        }}
      >
        <div style={{ "--accent": school?.accent }}>
          {students.map((s, i) => (
            <div
              key={i}
              data-html2canvas-card
              data-orientation={isVertical ? "vertical" : "horizontal"}
              style={{
                width: isVertical ? "260px" : "410px",
                height: isVertical ? "410px" : "260px",
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <TemplateComp school={school} fields={fields} student={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
