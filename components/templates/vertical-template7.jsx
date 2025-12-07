"use client";

export function VerticalTemplate7({ student, school, fields = {}, ...props }) {
  const accent = school?.accent || "#FF6B6B";

  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[410px] w-[260px] overflow-hidden rounded-2xl border shadow-xl text-gray-800"
      style={{
        fontFamily: "Comic Sans MS, Inter, Arial, sans-serif",
        borderColor: accent,
        background: `linear-gradient(135deg, ${accent}33, ${accent}66, ${accent}99, ${accent}ff)`,
      }}
    >
      {/* Playful Top Accent Bar */}
      <div
        className="absolute top-0 left-0 h-12 w-full rounded-b-2xl"
        style={{
          background: `radial-gradient(circle at top left, ${accent}ff, ${accent}77)`,
          boxShadow: `0 4px 10px ${accent}55`,
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col justify-between p-3 relative z-10 h-full w-full">
        {/* School Logo & Name */}
        {(fields.logo !== false || fields.schoolName !== false) && (
          <div className="flex flex-col items-center gap-1 text-center mb-2">
            {fields.logo !== false && (
              <img
                src={school?.logoDataUrl || "/generic-school-logo.png"}
                alt="School Logo"
                className="h-12 w-12 rounded-full border-2 border-white shadow-md object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            )}
            {fields.schoolName !== false && (
              <p
                className="text-sm font-bold truncate"
                style={{ color: accent }}
              >
                {school?.schoolName || "School Name"}
              </p>
            )}
          </div>
        )}

        {/* Student Photo */}
        {fields.photoUrl !== false && (
          <div className="flex justify-center my-3">
            <div className="rounded-full border-4 border-white shadow-md p-[2px] bg-white/20">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={`${student?.name || "Student"} photo`}
                className="h-[100px] w-[100px] rounded-full object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* Student Info */}
        <div className="flex flex-col text-center space-y-1 mt-2">
          {fields.name !== false && (
            <p
              className="text-xl font-extrabold truncate"
              style={{ color: accent }}
            >
              {student?.name || "Student Name"}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mt-2 justify-items-center text-gray-800">
            {fields.id !== false && (
              <p>
                <span className="font-semibold" style={{ color: accent }}>
                  ID:
                </span>{" "}
                {student?.id || "—"}
              </p>
            )}
            {fields.className !== false && (
              <p>
                <span className="font-semibold" style={{ color: accent }}>
                  Class:
                </span>{" "}
                {student?.className || "—"}
              </p>
            )}
            {fields.section !== false && (
              <p>
                <span className="font-semibold" style={{ color: accent }}>
                  Section:
                </span>{" "}
                {student?.section || "—"}
              </p>
            )}
            {fields.dob !== false && (
              <p>
                <span className="font-semibold" style={{ color: accent }}>
                  DOB:
                </span>{" "}
                {student?.dob || "—"}
              </p>
            )}
            {fields.phone !== false && (
              <p className="col-span-2">
                <span className="font-semibold" style={{ color: accent }}>
                  Phone:
                </span>{" "}
                {student?.phone || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-around items-end mt-3">
          {fields.principalSign !== false && (
            <div className="flex flex-col items-center">
              <img
                src={school?.principalSign || "/image.png"}
                alt="Principal Sign"
                crossOrigin="anonymous"
                loading="eager"
                className="object-contain opacity-90"
                style={{ height: "28px", marginBottom: "2px" }}
              />
              <p className="text-[9px] text-gray-700 leading-none">Principal</p>
            </div>
          )}
          {fields.schoolStamp !== false && (
            <div className="flex flex-col items-center">
              <img
                src={school?.schoolStamp || "/placeholder-logo.png"}
                alt="School Stamp"
                crossOrigin="anonymous"
                loading="eager"
                className="object-contain opacity-80"
                style={{ height: "36px", marginBottom: "2px" }}
              />
              <p className="text-[9px] text-gray-700 leading-none">
                Authorized
              </p>
            </div>
          )}
        </div>

        {/* Contact */}
        {fields.contact !== false && (
          <p className="text-[9px] text-gray-600 text-center mt-1 leading-none">
            Contact: {school?.contact || "—"}
          </p>
        )}
      </div>
    </div>
  );
}
