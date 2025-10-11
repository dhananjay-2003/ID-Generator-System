"use client";

export function Template12({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-white border shadow-lg"
    >
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-400" />

      <div className="relative z-10 flex flex-col w-full p-4 pt-5 text-gray-800">
        <div className="flex items-center gap-2">
          <img
            src={school.logoDataUrl || "/generic-school-logo.png"}
            alt="School Logo"
            className="h-8 w-8 rounded bg-white object-contain shadow"
            crossOrigin="anonymous"
          />
          <div>
            <p className="text-sm font-bold">{school.schoolName}</p>
            <p className="text-[10px] text-gray-500">{school.address}</p>
          </div>
        </div>

        <div className="flex mt-3 justify-between items-start">
          <div>
            <p className="text-lg font-semibold">
              {student.name || "Student Name"}
            </p>
            <p className="text-xs text-gray-500 mb-2">{student.id || "—"}</p>
            <div className="grid grid-cols-2 gap-x-2 text-xs">
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
          </div>
          <img
            src={student.photoUrl || "/student-photo.jpg"}
            alt="Student"
            className="h-[120px] w-[90px] rounded-md object-cover border border-gray-300 shadow-sm"
          />
        </div>

        <p className="mt-auto text-[10px] text-gray-500 text-right">
          {school.contact}
        </p>
      </div>
    </div>
  );
}
