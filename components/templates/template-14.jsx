export function Template14({ student, school, ...props }) {
  return (
    <div
      {...props}
      className="relative h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white shadow"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50 via-white to-white" />
      <div className="absolute -top-16 -left-16 w-64 h-64 rotate-45 bg-gradient-to-br from-pink-500 to-red-500 opacity-80" />
      <div className="relative z-10 flex p-4 justify-between text-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={school.logoDataUrl || "/generic-school-logo.png"}
              alt="Logo"
              className="h-8 w-8 rounded bg-white object-contain shadow"
            />
            <div>
              <p className="text-sm font-bold">{school.schoolName}</p>
              <p className="text-[10px] text-gray-500">{school.address}</p>
            </div>
          </div>
          <p className="mt-3 text-lg font-semibold">{student.name}</p>
          <div className="text-xs mt-1">
            <p>ID: {student.id}</p>
            <p>Class: {student.className}</p>
            <p>Section: {student.section}</p>
            <p>DOB: {student.dob}</p>
          </div>
        </div>
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[160px] w-[110px] rounded-lg object-cover border border-gray-300 shadow"
        />
      </div>
      <p className="absolute bottom-2 right-4 text-[10px] text-gray-500">
        {school.contact}
      </p>
    </div>
  );
}
