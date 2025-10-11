import jsPDF from "jspdf"

export async function generatePdfFromImages(images: string[], fileName = "output.pdf") {
  if (images.length === 0) return
  // Use portrait A4; fit card per page
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  images.forEach((img, idx) => {
    if (idx > 0) pdf.addPage()
    // Maintain aspect ratio for 336x528 px -> approx 64x100 mm scaling
    const w = 64
    const h = 100
    const x = (pageWidth - w) / 2
    const y = (pageHeight - h) / 2
    pdf.addImage(img, "PNG", x, y, w, h, undefined, "FAST")
  })
  pdf.save(fileName)
}
