"use client";
import { useRef, useState } from "react";
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
  const [showSchoolDetails, setShowSchoolDetails] = useState(false);
  const fileRef = useRef(null);
  const logoRef = useRef(null);
  const principalSignRef = useRef(null);
  const stampRef = useRef(null);

  // ---------- File Handlers ----------
  async function handleSheetUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: "array" });
      const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        defval: "",
      });

      const parsed = ws.map((row, idx) => ({
        id: String(row.studentId || row.id || `S-${idx + 1}`),
        name: String(row.name || ""),
        className: String(row.class || row.className || ""),
        section: String(row.section || ""),
        dob: String(row.dob || ""),
        phone: String(row.phone || ""),
        address: String(row.address || ""), // student address only
        photoUrl: String(row.photoUrl || ""),
      }));

      setStudents(parsed.length ? parsed : students);
      if (parsed.length) setCurrentIndex(0);
    } catch (err) {
      console.error("XLSX parse error:", err);
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
      console.error("CSV parse error:", err);
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
    } catch {
      alert("Failed to read photo file.");
    } finally {
      e.target.value = "";
    }
  }

  async function handleImageUpload(e, key) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setSchool({ ...school, [key]: dataUrl });
    } catch {
      alert("Failed to upload image.");
    } finally {
      e.target.value = "";
    }
  }

  const currentStudent = students[currentIndex];

  // ---------- UI ----------
  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Import Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
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

      {/* School Section */}
      <h2 className="mb-3 text-lg font-medium">School Details</h2>

      <div className="mb-4 border rounded-md">
        <button
          onClick={() => setShowSchoolDetails(!showSchoolDetails)}
          className="w-full flex justify-between items-center p-3 font-medium text-left"
        >
          <span>School Details</span>
          <span className="text-lg">{showSchoolDetails ? "▲" : "▼"}</span>
        </button>

        {showSchoolDetails && (
          <div className="space-y-3 p-4 border-t bg-background">
            <label className="text-sm block">
              <span className="mb-1 block">School Name</span>
              <input
                value={school.schoolName}
                onChange={(e) =>
                  setSchool({ ...school, schoolName: e.target.value })
                }
                className="w-full rounded-md border bg-background p-2"
              />
            </label>

            <label className="text-sm block">
              <span className="mb-1 block">Contact Details</span>
              <input
                value={school.contact}
                onChange={(e) =>
                  setSchool({ ...school, contact: e.target.value })
                }
                className="w-full rounded-md border bg-background p-2"
              />
            </label>

            <label className="text-sm block">
              <span className="mb-1 block">School Address</span>
              <input
                value={school.schoolAddress}
                onChange={(e) =>
                  setSchool({ ...school, schoolAddress: e.target.value })
                }
                className="w-full rounded-md border bg-background p-2"
              />
            </label>

            {/* Logo, Sign, Stamp */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center border rounded-md p-2">
                <span className="text-sm mb-2">School Logo</span>
                <button
                  className="rounded-md border px-3 py-1 text-sm"
                  onClick={() => logoRef.current?.click()}
                >
                  Upload Logo
                </button>
                {school.logo && (
                  <img
                    src={school.logo}
                    alt="Logo Preview"
                    className="mt-2 h-16 w-16 rounded-md border object-contain shadow"
                  />
                )}
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleImageUpload(e, "logo")}
                />
              </div>

              <div className="flex flex-col items-center border rounded-md p-2">
                <span className="text-sm mb-2">Principal Sign</span>
                <button
                  className="rounded-md border px-3 py-1 text-sm"
                  onClick={() => principalSignRef.current?.click()}
                >
                  Upload Sign
                </button>
                {school.principalSign && (
                  <img
                    src={school.principalSign}
                    alt="Principal Sign"
                    className="mt-2 h-16 w-24 rounded-md border object-contain shadow"
                  />
                )}
                <input
                  ref={principalSignRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleImageUpload(e, "principalSign")}
                />
              </div>
            </div>

            <div className="flex flex-col items-center border rounded-md p-2 mt-2">
              <span className="text-sm mb-2">School Stamp</span>
              <button
                className="rounded-md border px-3 py-1 text-sm"
                onClick={() => stampRef.current?.click()}
              >
                Upload Stamp
              </button>
              {school.schoolStamp && (
                <img
                  src={school.schoolStamp}
                  alt="School Stamp"
                  className="mt-2 h-16 w-16 rounded-md border object-contain shadow"
                />
              )}
              <input
                ref={stampRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleImageUpload(e, "schoolStamp")}
              />
            </div>

            <label className="text-sm block mt-3">
              <span className="mb-1 block">Accent Color</span>
              <input
                type="color"
                value={school.accent}
                onChange={(e) =>
                  setSchool({ ...school, accent: e.target.value })
                }
                className="h-10 w-full cursor-pointer rounded-md border bg-background p-1"
              />
            </label>
          </div>
        )}
      </div>

      {/* Student Data Section */}
      <h2 className="mb-2 text-lg font-medium">Student Data</h2>
      <hr className="border-border" />

      {currentStudent ? (
        <div className="space-y-2 mt-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm">
              <span className="mb-1 block">Name</span>
              <input
                value={currentStudent.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block">Student ID</span>
              <input
                value={currentStudent.id}
                onChange={(e) => updateField("id", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block">Class</span>
              <input
                value={currentStudent.className}
                onChange={(e) => updateField("className", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block">Section</span>
              <input
                value={currentStudent.section}
                onChange={(e) => updateField("section", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block">DOB</span>
              <input
                type="date"
                value={currentStudent.dob}
                onChange={(e) => updateField("dob", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block">Phone</span>
              <input
                value={currentStudent.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>

            <label className="col-span-2 text-sm">
              <span className="mb-1 block">Student Address</span>
              <input
                value={currentStudent.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block">Photo (URL)</span>
              <input
                placeholder="https://..."
                value={currentStudent.photoUrl}
                onChange={(e) => updateField("photoUrl", e.target.value)}
                className="w-full rounded-md border bg-background p-2"
              />
              {currentStudent.photoUrl && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={currentStudent.photoUrl}
                    alt="Student Preview"
                    className="h-24 w-24 rounded-md border object-cover shadow"
                  />
                </div>
              )}
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
        <p className="text-sm text-muted-foreground mt-3">No students yet.</p>
      )}

      <div className="flex justify-between items-center gap-2 mt-3">
        <button className="rounded-md border px-3 py-2" onClick={addBlank}>
          Add Student
        </button>
      </div>
    </div>
  );
}
