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
      <div className="z-10 flex w-full flex-col justify-between p-4">
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex flex-col gap-3 w-2/3">
            {/* Logo + School */}
            <div className="flex items-center gap-2">
              <img
                src={school.logoDataUrl || "/generic-school-logo.png"}
                alt="School logo"
                className="h-8 w-8 rounded-md object-contain"
                crossOrigin="anonymous"
              />
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  {school.schoolName}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {school.address}
                </p>
              </div>
            </div>

            {/* Student Info */}
            <div className="space-y-1 mt-1">
              {fields.name && (
                <p className="text-xl font-semibold text-gray-800">
                  {student.name || "Student Name"}
                </p>
              )}
              <div className="grid grid-cols-2 gap-x-3 text-xs text-gray-600">
                {fields.studentId && (
                  <p>
                    <span className="text-gray-400">ID:</span>{" "}
                    {student.id || "—"}
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
                {fields.bloodGroup && (
                  <p>
                    <span className="text-gray-400">Blood:</span>{" "}
                    {student.bloodGroup || "—"}
                  </p>
                )}
                {fields.phone && (
                  <p>
                    <span className="text-gray-400">Phone:</span>{" "}
                    {student.phone || "—"}
                  </p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="pt-2 text-[10px] text-gray-400">
              {school.contact}
            </div>
          </div>

          {/* Right Section (Photo) */}
          <div className="flex items-center justify-center w-1/3">
            <div className="relative h-[120px] w-[120px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-200 to-cyan-100 blur-md" />
              <img
                src={student.photoUrl || "/student-photo.jpg"}
                alt="Student"
                className="relative z-10 h-[120px] w-[120px] rounded-full object-cover border-4 border-white shadow"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Signature + Stamp */}
        <div className="flex justify-between items-end mt-3 px-2">
          {/* Principal Sign */}
          <div className="flex flex-col items-center text-[10px] text-gray-500">
            {school.principalSignUrl ? (
              <img
                src={school.principalSignUrl}
                alt="Principal Signature"
                className="h-6 object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="h-6" />
            )}
            <span>Principal</span>
          </div>

          {/* Stamp */}
          <div className="flex flex-col items-center">
            {school.stampUrl ? (
              <img
                src={school.stampUrl}
                alt="School Stamp"
                className="h-10 w-10 object-contain opacity-80"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="h-10 w-10" />
            )}
            <span className="text-[9px] text-gray-400">Official Seal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
