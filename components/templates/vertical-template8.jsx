"use client";

export function VerticalTemplate8({ student, school, fields = {}, ...props }) {
  const accent = school?.accent || "#4f46e5"; // unique purple-blue accent

  return (
    <div
      {...props}
      className="relative flex h-[420px] w-[270px] overflow-hidden rounded-3xl shadow-2xl text-gray-800 font-sans"
      style={{
        background: `linear-gradient(135deg, ${accent}20, #ffffff 80%)`,
        border: `2px solid ${accent}`,
      }}
    >
      {/* Decorative geometric shapes */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at top left, ${accent}30, transparent 70%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-4">
        {/* Top Banner: School Name */}
        {fields.schoolName !== false && (
          <div
            className="w-full py-2 text-center text-white font-bold text-sm rounded-lg shadow-sm"
            style={{ backgroundColor: accent }}
          >
            {school?.schoolName || "My Unique School"}
          </div>
        )}

        {/* Student Photo & Badge Circle */}
        {fields.photoUrl !== false && (
          <div className="relative mx-auto my-3 w-[110px] h-[110px]">
            <div
              className="absolute inset-0 rounded-full border-4 border-white shadow-lg"
              style={{
                background: `conic-gradient(${accent}20, #fff 100%)`,
              }}
            />
            <img
              src={student?.photoUrl || "/student-photo.jpg"}
              alt={student?.name || "Student"}
              className="relative rounded-full object-cover h-full w-full"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-md p-3 flex flex-col space-y-1 text-center">
          {fields.name !== false && (
            <p className="text-lg font-semibold text-gray-800">
              {student?.name || "Student Name"}
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-600 mt-1">
            {fields.id !== false && (
              <p>
                <span className="font-medium">ID:</span> {student?.id || "—"}
              </p>
            )}
            {fields.className !== false && (
              <p>
                <span className="font-medium">Class:</span>{" "}
                {student?.className || "—"}
              </p>
            )}
            {fields.section !== false && (
              <p>
                <span className="font-medium">Section:</span>{" "}
                {student?.section || "—"}
              </p>
            )}
            {fields.dob !== false && (
              <p>
                <span className="font-medium">DOB:</span> {student?.dob || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Signature & Stamp */}
        <div className="flex justify-between items-center mt-3 px-2">
          {fields.principalSign !== false && (
            <div className="flex flex-col items-center">
              <img
                src={school?.principalSign || "/image.png"}
                alt="Principal"
                className="h-8 object-contain"
              />
              <span className="text-[10px] text-gray-700">Principal</span>
            </div>
          )}
          {fields.schoolStamp !== false && (
            <div className="flex flex-col items-center">
              <img
                src={school?.schoolStamp || "/placeholder-logo.png"}
                alt="Stamp"
                className="h-10 object-contain"
              />
              <span className="text-[10px] text-gray-700">Authorized</span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        {fields.contact !== false && (
          <p className="text-[10px] text-gray-500 text-center mt-1">
            Contact: {school?.contact || "—"}
          </p>
        )}
      </div>
    </div>
  );
}
