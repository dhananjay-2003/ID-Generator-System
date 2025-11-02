"use client";

export function Template5({ student, school, ...props }) {
  return (
    <div
      {...props}
      className="relative flex flex-col items-center justify-start h-[410px] w-[260px] bg-gradient-to-t from-blue-100 to-white border rounded-2xl shadow-md overflow-hidden"
    >
      {/* School Header */}
      <div className="flex flex-col items-center mt-3">
        <img
          src={school.logoDataUrl || "/generic-school-logo.png"}
          alt="Logo"
          className="h-12 w-12 rounded bg-white object-contain shadow-sm mb-1"
          crossOrigin="anonymous"
        />
        <p className="text-sm font-bold text-gray-800">{school.schoolName}</p>
        <p className="truncate text-[10px] text-gray-500 text-center px-3 mb-2">
          {school.address}
        </p>
      </div>

      {/* Student Photo */}
      <div className="flex justify-center mt-2">
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[130px] w-[110px] rounded-lg border-2 border-blue-400 object-cover shadow-sm"
          crossOrigin="anonymous"
        />
      </div>

      {/* Student Info */}
      <div className="flex flex-col items-center mt-3 text-gray-800">
        <p className="text-base font-semibold">
          {student.name || "Student Name"}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Class {student.className || "—"} • Sec {student.section || "—"}
        </p>
        <p className="text-xs text-gray-600 mt-1">ID: {student.id || "—"}</p>
        <p className="text-xs text-gray-600">DOB: {student.dob || "—"}</p>
      </div>

      {/* Footer Contact */}
      <p className="absolute bottom-2 text-[10px] text-gray-500 text-center w-full">
        {school.contact}
      </p>
    </div>
  );
}
