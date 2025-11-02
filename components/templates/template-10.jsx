"use client";

export function Template10({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white shadow-md text-gray-900"
    >
      {/* Accent Top Banner */}
      <div
        className="absolute top-0 left-0 w-full h-12"
        style={{ backgroundColor: school.accent }}
      />

      {/* Card Content */}
      <div className="relative flex w-full items-center p-4 pt-6">
        {/* Left Side: Info */}
        <div className="flex-1">
          {/* School Header */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={school.logoDataUrl || "/generic-school-logo.png"}
              alt="School Logo"
              className="h-8 w-8 rounded bg-white object-contain shadow-sm"
              crossOrigin="anonymous"
            />
            <div>
              <h3
                className="text-sm font-bold drop-shadow-md"
                style={{ color: school.accent }}
              >
                {school.schoolName || "School Name"}
              </h3>
              <p className="truncate text-[10px] text-gray-500">
                {school.address || "School Address"}
              </p>
            </div>
          </div>

          {/* Student Info */}
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
              {fields.phone && (
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  {student.phone || "—"}
                </p>
              )}
              {fields.bloodGroup && (
                <p>
                  <span className="text-gray-500">Blood:</span>{" "}
                  {student.bloodGroup || "—"}
                </p>
              )}
              {fields.address && (
                <p className="col-span-2">
                  <span className="text-gray-500">Address:</span>{" "}
                  {student.address || "—"}
                </p>
              )}
            </div>
          </div>

          {/* School Contact */}
          <p className="mt-3 text-[10px] text-gray-500">
            {school.contact || "Phone: — | Email: —"}
          </p>

          {/* Signature & Stamp Row */}
          <div className="mt-2 flex justify-between items-end pr-4">
            <div className="text-center">
              {school.principalSign && (
                <img
                  src={school.principalSign}
                  alt="Principal Sign"
                  className="h-6 mx-auto object-contain"
                  crossOrigin="anonymous"
                />
              )}
              <p className="text-[9px] mt-1">Principal</p>
            </div>

            {school.schoolStamp && (
              <img
                src={school.schoolStamp}
                alt="School Stamp"
                className="h-10 w-10 object-contain opacity-80"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>

        {/* Right Side: Student Photo */}
        <div className="ml-3 flex-shrink-0">
          <img
            src={student.photoUrl || "/student-photo.jpg"}
            alt="Student"
            className="h-[180px] w-[120px] rounded-lg object-cover border border-gray-300 shadow"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {/* Accent Bottom Bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: school.accent }}
      />
    </div>
  );
}
