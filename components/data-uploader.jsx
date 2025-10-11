"use client";
import { useRef } from "react";
import * as XLSX from "xlsx";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function DataUploader({
  students,
  setStudents,
  currentIndex,
  setCurrentIndex,
  school,
  setSchool,
}) {
  const fileRef = useRef(null);
  const logoRef = useRef(null);

  async function handleSheetUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const ws = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: "" });
      // Normalize keys
      const parsed = ws.map((row, idx) => ({
        id: String(row.studentId || row.id || `S-${idx + 1}`),
        name: String(row.name || ""),
        className: String(row.class || row.className || ""),
        section: String(row.section || ""),
        dob: String(row.dob || ""),
        phone: String(row.phone || ""),
        address: String(row.address || ""),
        photoUrl: String(row.photoUrl || ""),
      }));
      setStudents(parsed.length ? parsed : students);
      if (parsed.length) setCurrentIndex(0);
    } catch (err) {
      console.error("[v0] XLSX parse error:", err);
      alert("Failed to parse file. Please check the format.");
    } finally {
      e.target.value = "";
    }
  }

  async function handleCSVUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
      const headers = headerLine.split(",").map((h) => h.trim());
      const rows = lines.map((line, idx) => {
        const cols = line.split(",").map((c) => c.trim());
        const rowObj = Object.fromEntries(
          headers.map((h, i) => [h, cols[i] || ""])
        );
        return {
          id: String(rowObj.studentId || rowObj.id || `S-${idx + 1}`),
          name: String(rowObj.name || ""),
          className: String(rowObj.class || rowObj.className || ""),
          section: String(rowObj.section || ""),
          dob: String(rowObj.dob || ""),
          phone: String(rowObj.phone || ""),
          address: String(rowObj.address || ""),
          photoUrl: String(rowObj.photoUrl || ""),
        };
      });
      setStudents(rows.length ? rows : students);
      if (rows.length) setCurrentIndex(0);
    } catch (err) {
      console.error("[v0] CSV parse error:", err);
      alert("Failed to parse CSV. Please check the file.");
    } finally {
      e.target.value = "";
    }
  }

  function addBlank() {
    const next = [
      ...students,
      {
        id: `S-${students.length + 1}`,
        name: "",
        className: "",
        section: "",
        dob: "",
        phone: "",
        address: "",
        photoUrl: "",
      },
    ];
    setStudents(next);
    setCurrentIndex(next.length - 1);
  }

  function updateField(key, value) {
    const next = [...students];
    if (!next[currentIndex]) return;
    next[currentIndex] = { ...next[currentIndex], [key]: value };
    setStudents(next);
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      updateField("photoUrl", dataUrl);
    } catch (err) {
      console.error("[v0] Photo upload error:", err);
      alert("Failed to read photo file.");
    } finally {
      e.target.value = "";
    }
  }

  async function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setSchool({ ...school, logoDataUrl: dataUrl });
    } catch (err) {
      console.error("[v0] Logo upload error:", err);
      alert("Failed to read logo file.");
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-2 text-lg font-medium">Data</h2>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            className="rounded-md bg-primary px-3 py-2 text-primary-foreground"
            onClick={() => fileRef.current?.click()}
          >
            Import XLSX
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleSheetUpload}
            className="sr-only"
          />

          <label className="col-span-2 block">
            <span className="mb-1 block text-sm">Import CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="w-full rounded-md border bg-background p-2"
            />
          </label>
        </div>

        <hr className="border-border" />

        {students[currentIndex] ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <label className="text-sm">
                <span className="mb-1 block">Name</span>
                <input
                  value={students[currentIndex].name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">Student ID</span>
                <input
                  value={students[currentIndex].id}
                  onChange={(e) => updateField("id", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">Class</span>
                <input
                  value={students[currentIndex].className}
                  onChange={(e) => updateField("className", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">Section</span>
                <input
                  value={students[currentIndex].section}
                  onChange={(e) => updateField("section", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">DOB</span>
                <input
                  type="date"
                  value={students[currentIndex].dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">Phone</span>
                <input
                  value={students[currentIndex].phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="col-span-2 text-sm">
                <span className="mb-1 block">Address</span>
                <input
                  value={students[currentIndex].address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">Photo (URL)</span>
                <input
                  placeholder="https://..."
                  value={students[currentIndex].photoUrl}
                  onChange={(e) => updateField("photoUrl", e.target.value)}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block">Photo (Upload)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full rounded-md border bg-background p-2"
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-muted-foreground">
                {currentIndex + 1} / {students.length}
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-md border px-2 py-1"
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                >
                  Prev
                </button>
                <button
                  className="rounded-md border px-2 py-1"
                  onClick={() =>
                    setCurrentIndex(
                      Math.min(students.length - 1, currentIndex + 1)
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No students yet.</p>
        )}

        <div className="flex justify-between">
          <button className="rounded-md border px-3 py-2" onClick={addBlank}>
            Add student
          </button>
          <button
            className="rounded-md border px-3 py-2"
            onClick={() => logoRef.current?.click()}
          >
            Upload Logo
          </button>
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleLogoUpload}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm">
            <span className="mb-1 block">School Name</span>
            <input
              value={school.schoolName}
              onChange={(e) =>
                setSchool({ ...school, schoolName: e.target.value })
              }
              className="w-full rounded-md border bg-background p-2"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block">School Address</span>
            <input
              value={school.address}
              onChange={(e) =>
                setSchool({ ...school, address: e.target.value })
              }
              className="w-full rounded-md border bg-background p-2"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block">School Contact</span>
            <input
              value={school.contact}
              onChange={(e) =>
                setSchool({ ...school, contact: e.target.value })
              }
              className="w-full rounded-md border bg-background p-2"
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block">Accent Color</span>
            <input
              type="color"
              value={school.accent}
              onChange={(e) => setSchool({ ...school, accent: e.target.value })}
              className="h-10 w-full cursor-pointer rounded-md border bg-background p-1"
              aria-label="Select accent color"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
