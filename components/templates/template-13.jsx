"use client";

export function Template13({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-gradient-to-r from-gray-50 to-white shadow"
    >
      {/* Photo Section */}
      <div className="w-1/3 bg-gray-100 flex items-center justify-center">
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[200px] w-[130px] object-cover rounded-lg border shadow-sm"
          crossOrigin="anonymous"
        />
      </div>

      {/* Info Section */}
      <div className="w-2/3 flex flex-col p-4 text-gray-800">
        <div className="flex items-center gap-2">
          <img
            src={school.logoDataUrl || "/generic-school-logo.png"}
            alt="School Logo"
            className="h-8 w-8 rounded bg-white object-contain shadow"
            crossOrigin="anonymous"
          />
          <div>
            <p className="text-sm font-bold">{school.schoolName}</p>
            <p className="truncate text-[10px] text-gray-500">
              {school.address}
            </p>
          </div>
        </div>

        <p className="mt-3 text-lg font-semibold">
          {student.name || "Student Name"}
        </p>

        <div className="grid grid-cols-2 gap-x-2 text-xs mt-1">
          <p>
            <span className="text-gray-500">ID:</span> {student.id || "—"}
          </p>
          <p>
            <span className="text-gray-500">Class:</span>{" "}
            {student.className || "—"}
          </p>
          <p>
            <span className="text-gray-500">Section:</span>{" "}
            {student.section || "—"}
          </p>
          <p>
            <span className="text-gray-500">DOB:</span> {student.dob || "—"}
          </p>
        </div>

        <div className="mt-auto text-[10px] text-gray-500">
          {school.contact}
        </div>
      </div>
    </div>
  );
}
