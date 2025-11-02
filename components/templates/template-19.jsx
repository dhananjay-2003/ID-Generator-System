"use client";

export function Template19({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[260px] w-[410px] items-center rounded-xl border border-gray-300 bg-gray-50 text-gray-900 shadow"
    >
      <div className="flex w-1/3 flex-col items-center justify-center bg-gray-200 p-3">
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[140px] w-[100px] rounded object-cover border"
          crossOrigin="anonymous"
        />
        <p className="mt-2 text-xs font-semibold">{student.name}</p>
      </div>

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

        <div className="grid grid-cols-2 gap-2 text-xs">
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
    </div>
  );
}
