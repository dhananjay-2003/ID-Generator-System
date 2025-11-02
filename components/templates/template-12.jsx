"use client";

export function Template12({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-white border shadow-lg"
    >
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-400" />

      {/* Main Card */}
      <div className="relative z-10 flex flex-col w-full p-4 pt-5 text-gray-800">
        {/* School Header */}
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

        {/* Student Info Section */}
        <div className="flex mt-3 justify-between items-start">
          <div className="flex flex-col">
            {fields.name && (
              <p className="text-lg font-semibold">
                {student.name || "Student Name"}
              </p>
            )}
            {fields.studentId && (
              <p className="text-xs text-gray-500 mb-2">
                ID: {student.id || "—"}
              </p>
            )}

            <div className="grid grid-cols-2 gap-x-2 text-xs">
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
              {fields.bloodGroup && (
                <p>
                  <span className="text-gray-500">Blood:</span>{" "}
                  {student.bloodGroup || "—"}
                </p>
              )}
              {fields.phone && (
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  {student.phone || "—"}
                </p>
              )}
            </div>

            <p className="mt-2 text-[10px] text-gray-500">{school.address}</p>
          </div>

          {/* Student Photo */}
          <div className="flex flex-col items-center">
            <img
              src={student.photoUrl || "/student-photo.jpg"}
              alt="Student"
              className="h-[120px] w-[90px] rounded-md object-cover border border-gray-300 shadow-sm"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Bottom Section: Contact + Sign + Stamp */}
        <div className="flex justify-between items-end mt-3">
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

          {/* Contact Info */}
          <p className="text-[10px] text-gray-500 text-center">
            {school.contact}
          </p>

          {/* School Stamp */}
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
