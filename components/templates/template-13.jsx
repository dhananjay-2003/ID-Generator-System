"use client";

export function Template13({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-gradient-to-r from-gray-50 to-white shadow-md"
    >
      {/* Left Photo Section */}
      <div className="w-1/3 bg-gray-100 flex items-center justify-center">
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[200px] w-[130px] object-cover rounded-lg border shadow-sm"
          crossOrigin="anonymous"
        />
      </div>

      {/* Info Section */}
      <div className="w-2/3 flex flex-col justify-between p-4 text-gray-800 relative">
        {/* Top Section — School Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <img
              src={school.logoDataUrl || "/generic-school-logo.png"}
              alt="School Logo"
              className="h-8 w-8 rounded bg-white object-contain shadow"
              crossOrigin="anonymous"
            />
            <div>
              <p className="text-sm font-bold leading-tight">
                {school.schoolName}
              </p>
              <p className="truncate text-[10px] text-gray-500">
                {fields.address ? school.address : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Student Details */}
        <div className="flex flex-col gap-1">
          {fields.name && (
            <p className="text-lg font-semibold">
              {student.name || "Student Name"}
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-2 text-xs text-gray-700">
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
                <span className="text-gray-500">DOB:</span> {student.dob || "—"}
              </p>
            )}
            {fields.phone && (
              <p>
                <span className="text-gray-500">Phone:</span>{" "}
                {student.phone || "—"}
              </p>
            )}
            {fields.email && (
              <p className="col-span-2 truncate">
                <span className="text-gray-500">Email:</span>{" "}
                {student.email || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end mt-2">
          <div className="text-[10px] text-gray-500">
            {fields.contact && school.contact}
          </div>

          <div className="flex flex-col items-end">
            {fields.principalSign && school.principalSign && (
              <img
                src={school.principalSign}
                alt="Principal Sign"
                className="h-6 object-contain"
                crossOrigin="anonymous"
              />
            )}
            {fields.schoolStamp && school.schoolStamp && (
              <img
                src={school.schoolStamp}
                alt="School Stamp"
                className="h-8 object-contain mt-1"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
