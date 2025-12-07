"use client";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";

// Utility: Convert File to Base64
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Utility: Convert Blob to Base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
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
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const fileRef = useRef(null);
  const logoRef = useRef(null);
  const principalSignRef = useRef(null);
  const stampRef = useRef(null);
  const photosRef = useRef(null);

  // ---------- Sample Sheet ----------
  function downloadSampleSheet(format = "xlsx") {
    const sampleData = [
      {
        studentId: "S-1",
        name: "John Doe",
        className: "10",
        section: "A",
        dob: "2008-05-12",
        phone: "9876543210",
        address: "123 Main Street, City",
        photoUrl: "passport photo.jpg",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    if (format === "xlsx") {
      XLSX.writeFile(workbook, "Sample_Student_Data.xlsx");
    } else {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Sample_Student_Data.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // ---------- Process Students with Photo Matching ----------
  async function processStudents(rows, uploadedPhotos = []) {
    console.log("Processing rows:", rows);
    if (!rows.length) return;

    // Normalize headers
    const normalized = rows.map((row) => {
      const obj = {};
      Object.entries(row).forEach(([key, val]) => {
        obj[key.trim().toLowerCase()] = val;
      });
      return obj;
    });

    // Process each student row
    const parsed = await Promise.all(
      normalized.map(async (row, idx) => {
        let rawPhoto = String(row.photourl || "")
          .trim()
          .replace(/^"|"$/g, "");
        let resolvedPhoto = "";

        try {
          // Extract filename (for uploaded photo match)
          const fileName = rawPhoto.split("\\").pop().split("/").pop().trim();

          // ✅ 1. If photo was uploaded separately (matched by filename)
          const matched = uploadedPhotos.find(
            (file) => file.name.toLowerCase() === fileName.toLowerCase()
          );

          if (matched) {
            resolvedPhoto = await readFileAsDataURL(matched);
          }
          // ✅ 2. Base64 directly from Excel
          else if (rawPhoto.startsWith("data:image")) {
            resolvedPhoto = rawPhoto;
          }
          // ✅ 3. Remote HTTP URL
          else if (rawPhoto.startsWith("http")) {
            resolvedPhoto = rawPhoto;
          }
          // 🚫 4. Local file path (cannot access via browser)
          else if (
            rawPhoto.startsWith("C:\\") ||
            rawPhoto.startsWith("/") ||
            rawPhoto.includes(":\\")
          ) {
            console.warn(`⚠️ Local path ignored: ${rawPhoto}`);
            resolvedPhoto = "";
          }
          // 🧩 5. Fallback default
          else {
            resolvedPhoto = "";
          }
        } catch (err) {
          console.error("❌ Error resolving photo:", err);
          resolvedPhoto = "";
        }

        return {
          studentId: String(row.studentid || `S-${idx + 1}`),
          name: String(row.name || ""),
          className: String(row.classname || row.class || ""),
          section: String(row.section || ""),
          dob: String(row.dob || ""),
          phone: String(row.phone || ""),
          address: String(row.address || ""),
          photoUrl: resolvedPhoto,
        };
      })
    );

    console.log("✅ Parsed students:", parsed);
    setStudents(parsed);
    if (parsed.length) setCurrentIndex(0);
  }

  // ---------- XLSX Upload ----------
  async function handleSheetUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: "array" });
      const ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        defval: "",
      });

      const processed = await Promise.all(
        ws.map(async (row, idx) => {
          const student = {};
          Object.entries(row).forEach(([key, val]) => {
            student[key.trim().toLowerCase()] = val;
          });

          let photoPath = String(student.photourl || "")
            .trim()
            .replace(/^"|"$/g, "");
          let photoBase64 = "";

          try {
            const fileName = photoPath.split("\\").pop().split("/").pop();
            const matched = uploadedPhotos.find(
              (f) => f.name.toLowerCase() === fileName.toLowerCase()
            );

            if (matched) {
              photoBase64 = await readFileAsDataURL(matched);
            } else if (photoPath.startsWith("data:image")) {
              photoBase64 = photoPath;
            } else if (photoPath.startsWith("http")) {
              const res = await fetch(photoPath);
              const blob = await res.blob();
              photoBase64 = await blobToBase64(blob);
            } else if (
              photoPath.startsWith("C:\\") ||
              photoPath.startsWith("/") ||
              photoPath.includes(":\\")
            ) {
              console.warn(`⚠️ Local path ignored: ${photoPath}`);
              photoBase64 = "";
            } else {
              photoBase64 = "";
            }
          } catch (err) {
            console.error("❌ Error converting photo:", err);
            photoBase64 = "";
          }

          return {
            studentId: String(student.studentid || `S-${idx + 1}`),
            name: String(student.name || ""),
            className: String(student.classname || student.class || ""),
            section: String(student.section || ""),
            dob: String(student.dob || ""),
            phone: String(student.phone || ""),
            address: String(student.address || ""),
            photoUrl: photoBase64,
          };
        })
      );

      console.log("✅ Excel processed:", processed);
      setStudents(processed);
      if (processed.length) setCurrentIndex(0);
    } catch (err) {
      console.error("❌ XLSX parse error:", err);
      alert("Failed to parse Excel file.");
    } finally {
      e.target.value = "";
    }
  }

  // ---------- CSV Upload ----------
  async function handleCSVUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      console.log("CSV Text:", text);
      const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
      const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());
      const rows = lines.map((line) => {
        const cols = line.split(",").map((c) => c.trim());
        const obj = {};
        headers.forEach((h, i) => (obj[h] = cols[i] || ""));
        return obj;
      });

      await processStudents(rows, uploadedPhotos);
    } catch (err) {
      console.error("❌ CSV parse error:", err);
      alert("Failed to parse CSV file.");
    } finally {
      e.target.value = "";
    }
  }

  // ---------- Photo Upload ----------
  function handlePhotosUpload(e) {
    const files = Array.from(e.target.files || []);
    setUploadedPhotos(files);
    alert(`${files.length} student photos loaded for matching.`);
  }

  // ---------- School Image Uploads ----------
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

  function updateField(key, value) {
    const next = [...students];
    if (!next[currentIndex]) return;
    next[currentIndex] = { ...next[currentIndex], [key]: value };
    setStudents(next);
  }

  function addNewStudent() {
    const newStudent = {
      studentId: `S-${students.length + 1}`,
      name: "",
      className: "",
      section: "",
      dob: "",
      phone: "",
      address: "",
      photoUrl: "",
    };
    const next = [...students, newStudent];
    setStudents(next);
    setCurrentIndex(next.length - 1);
  }

  const currentStudent = students[currentIndex];

  // ---------- UI ----------
  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Import Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          className="rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-2 text-white"
          onClick={() => fileRef.current?.click()}
        >
          Import XLSX
        </button>
        <button
          onClick={() => downloadSampleSheet("csv")}
          className="rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-2 text-white"
        >
          Download Sample CSV
        </button>

        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleSheetUpload}
          className="hidden"
        />

        <label className="col-span-2 block">
          <span className="text-sm font-medium mb-1 block">Upload CSV</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="w-full rounded-md border p-2"
          />
        </label>

        <label className="col-span-2 block">
          <span className="text-sm font-medium mb-1 block">
            Upload Student Photos (Optional)
          </span>
          <input
            ref={photosRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotosUpload}
            className="w-full rounded-md border p-2"
          />
        </label>
      </div>

      {/* School Section */}
      <h2 className="mb-3 text-lg font-semibold">School Details</h2>
      <div className="mb-4 border rounded-md">
        <button
          onClick={() => setShowSchoolDetails(!showSchoolDetails)}
          className="w-full flex justify-between items-center p-3 font-medium text-left hover:bg-gray-50"
        >
          <span>School Details</span>
          <span className="text-lg">{showSchoolDetails ? "▲" : "▼"}</span>
        </button>

        {showSchoolDetails && (
          <div className="space-y-3 p-4 border-t">
            <label className="text-sm block">
              <span className="mb-1 block font-medium">School Name</span>
              <input
                value={school.schoolName}
                onChange={(e) =>
                  setSchool({ ...school, schoolName: e.target.value })
                }
                className="w-full rounded-md border p-2"
              />
            </label>

            <label className="text-sm block">
              <span className="mb-1 block font-medium">Contact Details</span>
              <input
                value={school.contact}
                onChange={(e) =>
                  setSchool({ ...school, contact: e.target.value })
                }
                className="w-full rounded-md border p-2"
              />
            </label>

            <label className="text-sm block">
              <span className="mb-1 block font-medium">School Address</span>
              <input
                value={school.schoolAddress}
                onChange={(e) =>
                  setSchool({ ...school, schoolAddress: e.target.value })
                }
                className="w-full rounded-md border p-2"
              />
            </label>

            {/* Logo, Sign, Stamp */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center border rounded-md p-3">
                <span className="text-sm font-medium mb-2">School Logo</span>
                <button
                  className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                  onClick={() => logoRef.current?.click()}
                >
                  Upload Logo
                </button>
                {school.logo && (
                  <img
                    src={school.logo}
                    alt="Logo Preview"
                    className="mt-2 h-16 w-16 rounded-md border object-contain"
                  />
                )}
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "logo")}
                />
              </div>

              <div className="flex flex-col items-center border rounded-md p-3">
                <span className="text-sm font-medium mb-2">Principal Sign</span>
                <button
                  className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                  onClick={() => principalSignRef.current?.click()}
                >
                  Upload Sign
                </button>
                {school.principalSign && (
                  <img
                    src={school.principalSign}
                    alt="Principal Sign"
                    className="mt-2 h-16 w-24 rounded-md border object-contain"
                  />
                )}
                <input
                  ref={principalSignRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "principalSign")}
                />
              </div>
            </div>

            <div className="flex flex-col items-center border rounded-md p-3">
              <span className="text-sm font-medium mb-2">School Stamp</span>
              <button
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                onClick={() => stampRef.current?.click()}
              >
                Upload Stamp
              </button>
              {school.schoolStamp && (
                <img
                  src={school.schoolStamp}
                  alt="School Stamp"
                  className="mt-2 h-16 w-16 rounded-md border object-contain"
                />
              )}
              <input
                ref={stampRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "schoolStamp")}
              />
            </div>

            <label className="text-sm block mt-3">
              <span className="mb-1 block font-medium">Accent Color</span>
              <input
                type="color"
                value={school.accent}
                onChange={(e) =>
                  setSchool({ ...school, accent: e.target.value })
                }
                className="h-10 w-full cursor-pointer rounded-md border p-1"
              />
            </label>
          </div>
        )}
      </div>

      {/* Student Data Section */}
      <h2 className="mb-2 text-lg font-semibold">Student Data</h2>
      <hr className="border-gray-300 mb-3" />

      {currentStudent ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="mb-1 block font-medium">Name</span>
              <input
                value={currentStudent.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Student ID</span>
              <input
                value={currentStudent.studentId}
                onChange={(e) => updateField("studentId", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Class</span>
              <input
                value={currentStudent.className}
                onChange={(e) => updateField("className", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Section</span>
              <input
                value={currentStudent.section}
                onChange={(e) => updateField("section", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">DOB</span>
              <input
                type="date"
                value={currentStudent.dob}
                onChange={(e) => updateField("dob", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">Phone</span>
              <input
                value={currentStudent.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>

            <label className="col-span-2 text-sm">
              <span className="mb-1 block font-medium">Student Address</span>
              <input
                value={currentStudent.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </label>

            <label className="col-span-2 text-sm">
              <span className="mb-1 block font-medium">Student Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const dataUrl = await readFileAsDataURL(file);
                    updateField("photoUrl", dataUrl);
                  } catch (err) {
                    console.error("Error reading photo:", err);
                    alert("Failed to load image");
                  }
                }}
                className="w-full rounded-md border p-2"
              />
              {currentStudent.photoUrl && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={currentStudent.photoUrl}
                    alt="Student Preview"
                    className="h-32 w-32 rounded-md border object-cover"
                  />
                </div>
              )}
            </label>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="text-sm font-medium text-gray-600">
              Student {currentIndex + 1} of {students.length}
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-md border px-4 py-1.5 hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
              >
                ← Prev
              </button>
              <button
                className="rounded-md border px-4 py-1.5 hover:bg-gray-50 disabled:opacity-50"
                onClick={() =>
                  setCurrentIndex(
                    Math.min(students.length - 1, currentIndex + 1)
                  )
                }
                disabled={currentIndex === students.length - 1}
              >
                Next →
              </button>
            </div>
          </div>

          <button
            className="w-full rounded-md bg-green-600 hover:bg-green-700 px-4 py-2 text-white font-medium"
            onClick={addNewStudent}
          >
            ➕ Add New Student
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 mb-4">
            No students yet. Add your first student!
          </p>
          <button
            className="rounded-md bg-green-600 hover:bg-green-700 px-6 py-2 text-white font-medium"
            onClick={addNewStudent}
          >
            ➕ Add First Student
          </button>
        </div>
      )}
    </div>
  );
}
