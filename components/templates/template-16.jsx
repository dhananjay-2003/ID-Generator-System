export function Template16({ student, school, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl shadow border"
    >
      <div className="w-1/2 bg-gradient-to-br from-green-100 to-white p-4">
        <img
          src={school.logoDataUrl || "/generic-school-logo.png"}
          alt="Logo"
          className="h-8 w-8 mb-1"
        />
        <p className="text-sm font-bold">{school.schoolName}</p>
        <p className="truncate text-[10px] text-gray-500 mb-2">
          {school.address}
        </p>
        <p className="text-lg font-semibold">{student.name}</p>
        <p className="text-xs text-gray-600 mt-1">ID: {student.id}</p>
        <p className="text-xs text-gray-600">Class: {student.className}</p>
        <p className="text-xs text-gray-600">DOB: {student.dob}</p>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-green-50">
        <img
          src={student.photoUrl || "/student-photo.jpg"}
          alt="Student"
          className="h-[180px] w-[120px] rounded-lg object-cover border"
        />
      </div>
      <p className="absolute bottom-2 right-4 text-[10px] text-gray-500">
        {school.contact}
      </p>
    </div>
  );
}
