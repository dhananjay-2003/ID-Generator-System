"use client";

export function Template1({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white shadow-md text-gray-800"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent,#2563eb)]/20 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[120px] bg-[var(--accent,#2563eb)] rotate-6 origin-top-right" />

      {/* Content */}
      <div className="relative z-10 flex w-full items-center p-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={school.logoDataUrl || "/generic-school-logo.png"}
              alt="School Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-bold">{school.schoolName}</h3>
              <p className="text-[10px] text-gray-500">{school.address}</p>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-lg font-semibold">
              {student.name || "Student Name"}
            </p>
            <div className="text-xs space-y-1">
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

          <div className="mt-3 text-[10px] text-gray-500">{school.contact}</div>
        </div>

        {/* Photo */}
        <div className="ml-3">
          <img
            src={student.photoUrl || "/student-photo.jpg"}
            alt="Student"
            className="h-[170px] w-[120px] rounded-lg object-cover border border-white shadow"
          />
        </div>
      </div>
    </div>
  );
}
