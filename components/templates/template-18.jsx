"use client";

export function Template2({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[420px] w-[260px] flex-col items-center rounded-xl border bg-white text-gray-800 shadow-md overflow-hidden"
    >
      <div className="w-full bg-blue-600 text-white flex items-center justify-center gap-2 py-2">
        <img
          src={school.logoDataUrl || "/generic-school-logo.png"}
          alt="Logo"
          className="h-8 w-8"
        />
        <p className="text-sm font-semibold">{school.schoolName}</p>
      </div>

      <div className="p-3 flex flex-col items-center">
        <div className="border-2 border-blue-600 rounded-md p-1">
          <img
            src={student.photoUrl || "/student-photo.jpg"}
            alt="Student"
            className="h-[140px] w-[100px] object-cover rounded"
            crossOrigin="anonymous"
          />
        </div>
        <p className="mt-2 text-sm font-semibold">
          {student.name || "Student Name"}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          {student.className ? `Class ${student.className}` : ""}
        </p>

        <div className="text-xs text-left w-full space-y-1">
          {fields.studentId && (
            <p>
              <strong>ID:</strong> {student.id}
            </p>
          )}
          {fields.section && (
            <p>
              <strong>Section:</strong> {student.section}
            </p>
          )}
          {fields.dob && (
            <p>
              <strong>DOB:</strong> {student.dob}
            </p>
          )}
          {fields.phone && (
            <p>
              <strong>Phone:</strong> {student.phone}
            </p>
          )}
          {fields.address && (
            <p>
              <strong>Address:</strong> {student.address}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto w-full bg-gray-100 text-center text-[10px] py-1 border-t">
        {school.contact}
      </div>
    </div>
  );
}
