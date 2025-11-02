"use client";

export function Template9({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white shadow-md"
    >
      {/* Red Ribbon */}
      <div className="absolute left-0 top-0 h-full w-20 bg-red-600" />
      <div className="absolute left-0 top-0 h-full w-1 bg-white" />

      {/* Card Content */}
      <div className="relative z-10 flex w-full p-3 pl-6 text-gray-800">
        <div className="flex flex-col justify-between w-2/3">
          <div>
            <div className="flex items-center gap-2">
              <img
                src={school.logoDataUrl || "/generic-school-logo.png"}
                alt="School Logo"
                className="h-8 w-8 rounded bg-white object-contain"
                crossOrigin="anonymous"
              />
              <div>
                <p className="text-sm font-bold">{school.schoolName}</p>
                <p className="truncate text-[10px] text-gray-500">
                  {school.address}
                </p>
              </div>
            </div>

            <p className="mt-2 text-lg font-semibold">
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
          </div>
          <p className="text-[10px] text-gray-500">{school.contact}</p>
        </div>

        <div className="ml-auto flex items-center">
          <img
            src={student.photoUrl || "/student-photo.jpg"}
            alt="Student"
            className="h-[180px] w-[120px] rounded-lg object-cover border border-gray-200 shadow"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  );
}
