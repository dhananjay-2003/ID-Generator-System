"use client";

export function Template10({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white shadow-md text-gray-900"
    >
      {/* Accent top banner */}
      <div
        className="absolute top-0 left-0 w-full h-12"
        style={{ backgroundColor: school.accent }}
      />

      <div className="relative flex w-full items-center p-4 pt-6">
        {/* Left side: info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={school.logoDataUrl || "/generic-school-logo.png"}
              alt="Logo"
              className="h-8 w-8 rounded bg-white object-contain shadow-sm"
              crossOrigin="anonymous"
            />
            <div>
              <h3
                className="text-sm font-bold drop-shadow-md"
                style={{ color: school.accent }}
              >
                {school.schoolName}
              </h3>
              <p className="text-[10px] text-gray-500">{school.address}</p>
            </div>
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <p className="font-semibold text-lg">
              {student.name || "Student Name"}
            </p>
            <div className="grid grid-cols-2 gap-x-3 text-xs">
              {fields.studentId && (
                <p>
                  <span className="text-gray-500">ID:</span> {student.id || "—"}
                </p>
              )}
              {fields.className && (
                <p>
                  <span className="text-gray-500">Class:</span>{" "}
                  {student.className || "—"}
                </p>
              )}
              {fields.section && (
                <p>
                  <span className="text-gray-500">Section:</span>{" "}
                  {student.section || "—"}
                </p>
              )}
              {fields.dob && (
                <p>
                  <span className="text-gray-500">DOB:</span>{" "}
                  {student.dob || "—"}
                </p>
              )}
            </div>
          </div>

          <p className="mt-3 text-[10px] text-gray-500">{school.contact}</p>
        </div>

        {/* Right: photo */}
        <div className="ml-3">
          <img
            src={student.photoUrl || "/student-photo.jpg"}
            alt="Student"
            className="h-[180px] w-[120px] rounded-lg object-cover border border-gray-300 shadow"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {/* Accent footer bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: school.accent }}
      />
    </div>
  );
}
