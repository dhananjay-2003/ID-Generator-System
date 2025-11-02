"use client";

export function Template17({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[260px] w-[410px] items-center rounded-xl border bg-white text-gray-800 shadow-md overflow-hidden"
    >
      <div className="flex w-2/5 flex-col items-center justify-center bg-blue-500 text-white p-3">
        {student.photoUrl ? (
          <img
            src={student.photoUrl}
            alt="Student"
            className="h-[150px] w-[100px] rounded-md border-2 border-white object-cover"
            crossOrigin="anonymous"
          />
        ) : (
          <img
            src="/student-photo.jpg"
            alt="Student"
            className="h-[150px] w-[100px] rounded-md border-2 border-white object-cover"
          />
        )}
        <p className="mt-2 text-sm font-semibold">
          {student.name || "Student Name"}
        </p>
      </div>

      <div className="flex-1 p-3">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={school.logoDataUrl || "/generic-school-logo.png"}
            alt="School Logo"
            className="h-8 w-8 object-contain"
          />
          <div>
            <p className="text-sm font-semibold  ">{school.schoolName}</p>
            <p className="truncate text-xs text-gray-500  ">{school.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 text-xs leading-5">
          {fields.studentId && (
            <p>
              <span className="font-semibold">ID:</span> {student.id}
            </p>
          )}
          {fields.className && (
            <p>
              <span className="font-semibold">Class:</span> {student.className}
            </p>
          )}
          {fields.section && (
            <p>
              <span className="font-semibold">Section:</span> {student.section}
            </p>
          )}
          {fields.dob && (
            <p>
              <span className="font-semibold">DOB:</span> {student.dob}
            </p>
          )}
          {fields.phone && (
            <p className="col-span-2">
              <span className="font-semibold">Phone:</span> {student.phone}
            </p>
          )}
        </div>

        <p className="text-[10px] text-gray-500 mt-3">{school.contact}</p>
      </div>
    </div>
  );
}
