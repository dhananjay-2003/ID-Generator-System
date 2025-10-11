export function Template5({ student, school, ...props }) {
  return (
    <div
      {...props}
      className="relative flex flex-col items-center justify-center h-[260px] w-[410px] bg-gradient-to-t from-blue-100 to-white border rounded-xl shadow-md"
    >
      <img
        src={school.logoDataUrl || "/generic-school-logo.png"}
        alt="Logo"
        className="h-10 w-10 mb-1"
      />
      <p className="text-sm font-bold">{school.schoolName}</p>
      <p className="text-[10px] text-gray-500 mb-2">{school.address}</p>
      <img
        src={student.photoUrl || "/student-photo.jpg"}
        alt="Student"
        className="h-[120px] w-[100px] rounded-md border-2 border-blue-400 shadow-sm"
      />
      <p className="mt-2 text-lg font-semibold">{student.name}</p>
      <p className="text-xs text-gray-600">
        Class {student.className} • Sec {student.section}
      </p>
      <p className="absolute bottom-2 text-[10px] text-gray-500">
        {school.contact}
      </p>
    </div>
  );
}
