"use client";

export function VerticalTemplate3({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[410px] w-[260px] overflow-hidden rounded-2xl shadow-lg text-card-foreground"
      style={{
        "--accent": school?.accent || "#f59e0b",
        fontFamily: "Comic Sans MS, Arial, sans-serif",
        background: `linear-gradient(
          180deg,
          ${school?.accent || "#f59e0b"} 0%,
          #ffedc2 50%,
          ${school?.accent || "#f59e0b"} 100%
        )`,
      }}
    >
      {/* Top Colorful Bar */}
      <div
        className="absolute top-0 left-0 h-12 w-full rounded-b-2xl"
        style={{
          background: `linear-gradient(to right, #fbbf24, #f472b6, #3b82f6)`,
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col justify-between p-3 relative z-10 h-full w-full">
        {/* School Logo & Name */}
        {(fields.logo !== false || fields.schoolName !== false) && (
          <div className="flex flex-col items-center gap-1 mb-2 text-center">
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
              <p className="text-sm font-bold text-white drop-shadow">
                {school?.schoolName || "School Name"}
              </p>
            )}
          </div>
        )}

        {/* Big Rounded Student Photo */}
        {fields.photoUrl !== false && (
          <div className="flex justify-center my-2">
            <div className="rounded-full border-4 border-white shadow-lg bg-white p-1">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={`${student?.name || "Student"} photo`}
                className="h-[120px] w-[120px] rounded-full object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* Student Info */}
        <div className="flex flex-col text-center space-y-1 mt-2 text-gray-900">
          {fields.name !== false && (
            <p className="text-lg font-bold">
              {student?.name || "Student Name"}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs mt-1 justify-items-center">
            {fields.id !== false && (
              <p>
                <span className="font-medium text-gray-700">ID:</span>{" "}
                {student?.id || "—"}
              </p>
            )}
            {fields.className !== false && (
              <p>
                <span className="font-medium text-gray-700">Class:</span>{" "}
                {student?.className || "—"}
              </p>
            )}
            {fields.section !== false && (
              <p>
                <span className="font-medium text-gray-700">Section:</span>{" "}
                {student?.section || "—"}
              </p>
            )}
            {fields.dob !== false && (
              <p>
                <span className="font-medium text-gray-700">DOB:</span>{" "}
                {student?.dob || "—"}
              </p>
            )}
            {fields.phone !== false && (
              <p className="col-span-2">
                <span className="font-medium text-gray-700">Phone:</span>{" "}
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
                <span className="font-medium text-gray-700">Address:</span>{" "}
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
                style={{ height: "32px", marginBottom: "2px" }}
              />
              <p className="text-[9px] text-gray-700 leading-none">
                Authorized Stamp
              </p>
            </div>
          )}
        </div>

        {/* Contact */}
        {fields.contact !== false && (
          <p className="text-[9px] text-gray-700 text-center mt-1 leading-none">
            Contact: {school?.contact || "—"}
          </p>
        )}
      </div>
    </div>
  );
}
