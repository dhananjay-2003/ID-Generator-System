"use client";

export function Template11({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] items-stretch overflow-hidden rounded-2xl border bg-gradient-to-br from-sky-100 via-white to-sky-50 shadow-lg"
    >
      {/* Accent Glow Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500" />

      {/* Card Content */}
      <div className="z-10 flex w-full items-center justify-between p-5">
        {/* Left Section */}
        <div className="flex flex-col gap-3 w-2/3">
          {/* Logo + School */}
          <div className="flex items-center gap-2">
            {school.logoDataUrl ? (
              <img
                src={school.logoDataUrl}
                alt="School logo"
                className="h-8 w-8 rounded-md object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <img
                src="/generic-school-logo.png"
                alt=""
                className="h-8 w-8 rounded-md object-contain"
              />
            )}
            <div>
              <p className="font-semibold text-sm text-gray-800  ">
                {school.schoolName}
              </p>
              <p className="truncate text-xs text-gray-500  ">
                {school.address}
              </p>
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-1">
            {fields.name && (
              <p className="text-xl font-semibold text-gray-800">
                {student.name || "Student Name"}
              </p>
            )}
            <div className="grid grid-cols-2 gap-x-3 text-xs text-gray-600">
              {fields.studentId && (
                <p>
                  <span className="text-gray-400">ID:</span> {student.id || "—"}
                </p>
              )}
              {fields.className && (
                <p>
                  <span className="text-gray-400">Class:</span>{" "}
                  {student.className || "—"}
                </p>
              )}
              {fields.section && (
                <p>
                  <span className="text-gray-400">Section:</span>{" "}
                  {student.section || "—"}
                </p>
              )}
              {fields.dob && (
                <p>
                  <span className="text-gray-400">DOB:</span>{" "}
                  {student.dob || "—"}
                </p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="pt-3 text-[10px] text-gray-400">{school.contact}</div>
        </div>

        {/* Right Section (Photo) */}
        <div className="flex items-center justify-center w-1/3">
          <div className="relative h-[140px] w-[140px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-200 to-cyan-100 blur-md" />
            {student.photoUrl ? (
              <img
                src={student.photoUrl}
                alt={`${student.name || "Student"} photo`}
                className="relative z-10 h-[140px] w-[140px] rounded-full object-cover border-4 border-white shadow"
                crossOrigin="anonymous"
              />
            ) : (
              <img
                src="/student-photo.jpg"
                alt=""
                className="relative z-10 h-[140px] w-[140px] rounded-full object-cover border-4 border-white shadow"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
