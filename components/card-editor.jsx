"use client";

export function CardEditor({
  school,
  setSchool,
  fields,
  setFields,
  students,
  setStudents,
  currentIndex,
  setCurrentIndex,
}) {
  // Separate field groups for clarity
  const studentFields = [
    "name",
    "id",
    "className",
    "section",
    "dob",
    "phone",
    "studentAddress",
    "photoUrl",
  ];

  const schoolFields = [
    "logo",
    "schoolName",
    "schoolAddress",
    "contact",
    "accent",
    "principalSign",
    "schoolStamp",
  ];

  function toggleField(k) {
    setFields({ ...fields, [k]: !fields[k] });
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <h2 className="text-lg font-medium">Editor</h2>

      {/* 🎓 Student Fields */}
      <div>
        <p className="text-sm font-medium mb-1">🎓 Student Fields</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {studentFields.map((k) => (
            <label key={k} className="flex items-center gap-2 capitalize">
              <input
                type="checkbox"
                checked={fields[k] ?? true}
                onChange={() => toggleField(k)}
              />
              {k === "className"
                ? "Class"
                : k === "studentAddress"
                ? "Student Address"
                : k === "photoUrl"
                ? "Photo"
                : k}
            </label>
          ))}
        </div>
      </div>

      {/* 🏫 School Fields */}
      <div>
        <p className="text-sm font-medium mb-1">🏫 School Fields</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {schoolFields.map((k) => (
            <label key={k} className="flex items-center gap-2 capitalize">
              <input
                type="checkbox"
                checked={fields[k] ?? true}
                onChange={() => toggleField(k)}
              />
              {k === "principalSign"
                ? "Principal Sign"
                : k === "schoolStamp"
                ? "School Stamp"
                : k === "accent"
                ? "Accent Color"
                : k === "schoolName"
                ? "School Name"
                : k === "schoolAddress"
                ? "School Address"
                : k}
            </label>
          ))}
        </div>
      </div>

      {/* 👤 Student Preview Navigation */}
      <div>
        <p className="text-sm font-medium mb-1">👤 Preview Student</p>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-2 py-1"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            {students.length > 0
              ? `${currentIndex + 1} / ${students.length}`
              : "No Students"}
          </span>
          <button
            className="rounded-md border px-2 py-1"
            onClick={() =>
              setCurrentIndex(Math.min(students.length - 1, currentIndex + 1))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
