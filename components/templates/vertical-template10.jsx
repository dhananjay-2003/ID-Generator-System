"use client";

export function VerticalTemplate10({ student, school, fields = {}, ...props }) {
  const accent = school?.accent || "#6366f1"; // purple-blue accent
  const schoolTextColor = "#ffffff"; // clear white text
  const schoolTextShadow = "0 1px 2px rgba(0,0,0,0.5)"; // subtle shadow for contrast

  return (
    <div
      {...props}
      className="relative h-[420px] w-[270px] rounded-2xl shadow-2xl overflow-hidden font-sans"
      style={{
        background: "#f8fafc",
        border: `2px solid ${accent}`,
      }}
    >
      {/* Top-Left Diagonal Accent */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${accent}60, transparent 60%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 100%)",
        }}
        aria-hidden="true"
      />

      {/* School Info on Top-Left */}
      <div className="absolute top-4 left-4 flex flex-col items-start z-10">
        {fields.logo !== false && (
          <img
            src={school?.logoDataUrl || "/generic-school-logo.png"}
            alt="School Logo"
            className="h-12 w-12 rounded-full border-2 border-white shadow-sm mb-1 object-cover"
            crossOrigin="anonymous"
          />
        )}
        {fields.schoolName !== false && (
          <p
            className="text-white font-bold text-sm"
            style={{ color: schoolTextColor, textShadow: schoolTextShadow }}
          >
            {school?.schoolName || "School Name"}
          </p>
        )}
        {fields.schoolAddress !== false && (
          <p
            className="text-[9px]"
            style={{ color: schoolTextColor, textShadow: schoolTextShadow }}
          >
            {school?.address || "School Address"}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="absolute bottom-0 right-0 flex flex-col items-center w-full p-3 z-10">
        {/* Student Photo */}
        {fields.photoUrl !== false && (
          <div className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-md overflow-hidden mb-2">
            <img
              src={student?.photoUrl || "/student-photo.jpg"}
              alt={student?.name || "Student"}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* Student Info */}
        <div className="bg-white rounded-xl shadow-md w-full p-3 flex flex-col items-center text-center space-y-1">
          {fields.name !== false && (
            <p className="text-lg font-semibold text-gray-800 truncate w-full">
              {student?.name || "Student Name"}
            </p>
          )}
          <div className="grid grid-cols-2 gap-1 text-xs text-gray-700 mt-1 w-full">
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
            {fields.phone !== false && (
              <p className="col-span-2">
                <span className="font-medium">Phone:</span>{" "}
                {student?.phone || "—"}
              </p>
            )}
            {fields.studentAddress !== false && (
              <p
                className="col-span-2 text-gray-700 text-xs overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  maxHeight: "2.4em",
                  lineHeight: "1.2",
                }}
              >
                <span className="font-medium text-gray-600">Address:</span>{" "}
                {student?.address || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section: Signatures */}
        <div className="flex justify-between items-center w-full mt-3 px-2">
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

        {/* Contact */}
        {fields.contact !== false && (
          <p className="text-[10px] text-gray-500 text-center mt-1 w-full">
            Contact: {school?.contact || "—"}
          </p>
        )}
      </div>
    </div>
  );
}
