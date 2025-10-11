import * as XLSX from "xlsx"
import type { Student } from "@/app/page"

function normalizeHeader(h: string) {
  return h.trim().toLowerCase()
}

export async function parseFileToStudents(file: File): Promise<Student[]> {
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(buf, { type: "array" })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const json = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: "" })
  return json.map((row, idx) => {
    // Try to map common headers
    const mapped: Student = {
      id: row.id || row.ID || idx + 1,
      name: row.name || row.Name || row.fullname || row["Full Name"] || "",
      studentId: row.studentId || row["student_id"] || row["Student ID"] || row.sid || "",
      className: row.className || row.class || row.Class || "",
      section: row.section || row.Section || "",
      dob: row.dob || row.DOB || row.birthdate || "",
      photoUrl: row.photoUrl || row.photo || row["Photo URL"] || "",
    }
    // Merge unknown fields as well
    Object.keys(row).forEach((k) => {
      const nk = normalizeHeader(k)
      if (!(nk in mapped)) {
        mapped[nk] = row[k]
      }
    })
    // Ensure minimum
    if (!mapped.name) mapped.name = `Student ${idx + 1}`
    return mapped
  })
}
