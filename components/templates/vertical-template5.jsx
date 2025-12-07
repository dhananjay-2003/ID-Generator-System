"use client";

export function VerticalTemplate5({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[410px] w-[260px] overflow-hidden rounded-2xl border-2 shadow-lg text-card-foreground"
      style={{
        "--accent": school?.accent || "#f59e0b",
        fontFamily: "'Comic Neue', Inter, Arial, sans-serif",
        background: `linear-gradient(135deg, ${
          school?.accent || "#f59e0b"
        } 0%, #fef3c7 60%, #fefce8 100%)`,
      }}
    >
      {/* Top playful header */}
      <div
        className="absolute top-0 left-0 h-16 w-full"
        style={{
          background: `radial-gradient(circle at top left, var(--accent) 0%, transparent 70%)`,
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col justify-between p-3 relative z-10 h-full w-full">
        {/* School Info */}
        {(fields.logo !== false || fields.schoolName !== false) && (
          <div className="flex flex-col items-center gap-1 text-center">
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
              <p className="text-sm font-bold text-gray-800 truncate">
                {school?.schoolName || "School Name"}
              </p>
            )}
          </div>
        )}

        {/* Student Photo */}
        {fields.photoUrl !== false && (
          <div className="flex justify-center my-2">
            <div className="rounded-xl border-2 border-white p-[3px] shadow-md bg-white">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={`${student?.name || "Student"} photo`}
                className="h-[100px] w-[70px] rounded-lg object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* Student Info */}
        <div className="flex flex-col text-center space-y-1 mt-1 text-gray-800">
          {fields.name !== false && (
            <p className="text-lg font-bold truncate">
              {student?.name || "Student Name"}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs mt-1 justify-items-center">
            {fields.id !== false && (
              <p>
                <span className="text-gray-500 font-semibold">ID:</span>{" "}
                {student?.id || "—"}
              </p>
            )}
            {fields.className !== false && (
              <p>
                <span className="text-gray-500 font-semibold">Class:</span>{" "}
                {student?.className || "—"}
              </p>
            )}
            {fields.section !== false && (
              <p>
                <span className="text-gray-500 font-semibold">Section:</span>{" "}
                {student?.section || "—"}
              </p>
            )}
            {fields.dob !== false && (
              <p>
                <span className="text-gray-500 font-semibold">DOB:</span>{" "}
                {student?.dob || "—"}
              </p>
            )}
            {fields.phone !== false && (
              <p className="col-span-2">
                <span className="text-gray-500 font-semibold">Phone:</span>{" "}
                {student?.phone || "—"}
              </p>
            )}
            {fields.studentAddress !== false && (
              <p
                className="col-span-2 text-gray-700 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  maxHeight: "2.4em",
                  lineHeight: "1.2",
                }}
              >
                <span className="text-gray-500 font-semibold">Address:</span>{" "}
                {student?.address || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section: Principal & Stamp */}
        <div className="flex justify-around items-end mt-3">
          {fields.principalSign !== false && (
            <div className="flex flex-col items-center">
              <img
                src={school?.principalSign || "/image.png"}
                alt="Principal Sign"
                crossOrigin="anonymous"
                loading="eager"
                className="object-contain opacity-90"
                style={{ height: "24px", marginBottom: "2px" }}
              />
              <p className="text-[9px] text-gray-600 leading-none">Principal</p>
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
                style={{ height: "32px", marginBottom: "2px" }}
              />
              <p className="text-[9px] text-gray-600 leading-none">
                Authorized Stamp
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
