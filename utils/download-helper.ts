import html2canvas from "html2canvas-pro";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function generatePngsFromContainer(
  container: HTMLElement
): Promise<string[]> {
  const cards = Array.from(
    container.querySelectorAll("[data-html2canvas-card]")
  ) as HTMLElement[];
  // Fallback: if not marked, capture children Cards
  const targets = cards.length
    ? cards
    : (Array.from(container.children) as HTMLElement[]);

  const images: string[] = [];
  for (const el of targets) {
    // capture first child which contains the template frame
    const frame =
      (el.querySelector("[data-template-frame]") as HTMLElement) || el;
    const canvas = await html2canvas(frame, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });
    images.push(canvas.toDataURL("image/png"));
  }
  return images;
}

export async function downloadZipOfImages(
  images: string[],
  zipName = "images.zip"
) {
  const zip = new JSZip();
  images.forEach((dataUrl, i) => {
    const base64 = dataUrl.split(",")[1];
    zip.file(`id-card-${i + 1}.png`, base64!, { base64: true });
  });
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, zipName);
}
