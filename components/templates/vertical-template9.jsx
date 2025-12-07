"use client";

export function VerticalTemplate9({ student, school, fields = {}, ...props }) {
  const accent = school?.accent || "#10b981"; // bright green accent
  const schoolTextColor = "#ffffff"; // text color for school name/address

  return (
    <div
      {...props}
      className="relative flex flex-col h-[420px] w-[270px] overflow-hidden rounded-2xl shadow-xl font-sans"
      style={{
        background: `linear-gradient(135deg, ${accent}15, #ffffff 85%)`,
        border: `2px solid ${accent}`,
      }}
    >
      {/* Top Banner: School Name & Address */}
      <div
        className="flex flex-col items-center justify-center p-3"
        style={{
          backgroundColor: accent,
          minHeight: "60px",
        }}
      >
        {fields.schoolName !== false && (
          <p className="text-sm font-bold" style={{ color: schoolTextColor }}>
            {school?.schoolName || "School Name"}
          </p>
        )}
        {fields.schoolAddress !== false && (
          <p
            className="text-[10px]"
            style={{ color: schoolTextColor, marginTop: "2px" }}
          >
            {school?.address || "School Address"}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center flex-1 p-3 overflow-hidden">
        {/* Student Photo */}
        {fields.photoUrl !== false && (
          <div className="w-[100px] h-[100px] mb-2 mt-2 relative">
            <div className="absolute inset-0 rounded-full border-4 border-white shadow-md overflow-hidden">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={student?.name || "Student"}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        )}

        {/* Student Info */}
        <div className="flex flex-col items-center text-center text-gray-800 mt-1 overflow-hidden">
          {fields.name !== false && (
            <p className="text-lg font-semibold truncate w-full">
              {student?.name || "Student Name"}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mt-1 w-full justify-items-center">
            {fields.id !== false && (
              <p className="truncate">
                <span className="font-medium">ID:</span> {student?.id || "—"}
              </p>
            )}
            {fields.className !== false && (
              <p className="truncate">
                <span className="font-medium">Class:</span>{" "}
                {student?.className || "—"}
              </p>
            )}
            {fields.section !== false && (
              <p className="truncate">
                <span className="font-medium">Section:</span>{" "}
                {student?.section || "—"}
              </p>
            )}
            {fields.dob !== false && (
              <p className="truncate">
                <span className="font-medium">DOB:</span> {student?.dob || "—"}
              </p>
            )}
            {fields.phone !== false && (
              <p className="col-span-2 truncate">
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
        <div className="flex justify-between items-end mt-3 w-full px-2">
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
