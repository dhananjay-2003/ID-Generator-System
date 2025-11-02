"use client";

export function Template20({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[260px] w-[410px] items-center rounded-xl border bg-white text-gray-800 shadow-md overflow-hidden"
      style={{ borderLeft: `6px solid ${school.accent || "#2563eb"}` }}
    >
      <div className="flex-1 p-3">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={school.logoDataUrl || "/generic-school-logo.png"}
            className="h-8 w-8"
          />
          <div>
            <p className="text-sm font-semibold">{school.schoolName}</p>
            <p className="truncate text-xs text-gray-500">{school.address}</p>
          </div>
        </div>

        <p className="text-base font-semibold mb-2">{student.name}</p>

        <div className="grid grid-cols-2 gap-x-3 text-xs">
          {fields.studentId && (
            <p>
              <b>ID:</b> {student.id}
            </p>
          )}
          {fields.className && (
            <p>
              <b>Class:</b> {student.className}
            </p>
          )}
          {fields.section && (
            <p>
              <b>Section:</b> {student.section}
            </p>
          )}
          {fields.dob && (
            <p>
              <b>DOB:</b> {student.dob}
            </p>
          )}
          {fields.phone && (
            <p className="col-span-2">
              <b>Phone:</b> {student.phone}
            </p>
          )}
        </div>

        <p className="text-[10px] text-gray-500 mt-3">{school.contact}</p>
      </div>

      <div className="flex w-[120px] items-center justify-center bg-gray-100 p-2">
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[150px] w-[100px] object-cover rounded"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}
