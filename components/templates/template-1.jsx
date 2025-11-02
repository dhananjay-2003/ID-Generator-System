"use client";

export function Template1({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white shadow-md text-gray-800"
      style={{
        "--accent": school?.accent || "#2563eb",
        fontFamily: "Inter, Arial, sans-serif",
        lineHeight: "1.2",
        letterSpacing: "0px",
        transform: "scale(1)",
        transformOrigin: "top left",
      }}
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent,#2563eb)]/15 via-transparent to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[120px] bg-[var(--accent,#2563eb)] rotate-6 origin-top-right rounded-l-xl" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex w-full justify-between items-start p-4">
        {/* LEFT SECTION */}
        <div className="flex-1 flex flex-col justify-between h-full pr-3">
          {/* School Info */}
          <div>
            {(fields.logo !== false ||
              fields.schoolName !== false ||
              fields.schoolAddress !== false) && (
              <div className="flex items-center gap-2 mb-2">
                {fields.logo !== false && (
                  <img
                    src={school?.logoDataUrl || "/generic-school-logo.png"}
                    alt="School Logo"
                    className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    crossOrigin="anonymous"
                    loading="eager"
                  />
                )}
                <div className="max-w-[200px]">
                  {fields.schoolName !== false && (
                    <h3 className="text-sm font-semibold truncate leading-tight">
                      {school?.schoolName || "School Name"}
                    </h3>
                  )}
                  {fields.schoolAddress !== false && (
                    <p className="text-[10px] text-gray-500 leading-[1.1] truncate">
                      {school?.schoolAddress || "School Address"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Student Info */}
            {fields.name !== false && (
              <h2 className="text-lg font-semibold mt-1 leading-[1.15] break-words">
                {student?.name || "Student Name"}
              </h2>
            )}

            {/* Compact Grid Layout for Info */}
            <div
              className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs mt-1 text-gray-800"
              style={{ lineHeight: "1.2" }}
            >
              {fields.id !== false && (
                <p>
                  <span className="text-gray-500">ID:</span>{" "}
                  {student?.id || "—"}
                </p>
              )}
              {fields.className !== false && (
                <p>
                  <span className="text-gray-500">Class:</span>{" "}
                  {student?.className || "—"}
                </p>
              )}
              {fields.section !== false && (
                <p>
                  <span className="text-gray-500">Section:</span>{" "}
                  {student?.section || "—"}
                </p>
              )}
              {fields.dob !== false && (
                <p>
                  <span className="text-gray-500">DOB:</span>{" "}
                  {student?.dob || "—"}
                </p>
              )}
              {fields.phone !== false && (
                <p className="col-span-2">
                  <span className="text-gray-500">Phone:</span>{" "}
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
                  <span className="text-gray-500">Address:</span>{" "}
                  {student?.address || "—"}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Area */}
          <div className="flex justify-between items-end mt-2">
            {fields.principalSign !== false && (
              <div className="flex flex-col items-center">
                <img
                  src={school?.principalSign || "/principal-sign.png"}
                  alt="Principal Sign"
                  crossOrigin="anonymous"
                  loading="eager"
                  className="object-contain opacity-90"
                  style={{
                    width: "auto",
                    height: "26px",
                    marginBottom: "2px",
                  }}
                />
                <p className="text-[9px] text-gray-600 leading-none">
                  Principal
                </p>
              </div>
            )}
            {fields.schoolStamp !== false && (
              <div className="flex flex-col items-center">
                <img
                  src={school?.schoolStamp || "/school-stamp.png"}
                  alt="School Stamp"
                  crossOrigin="anonymous"
                  loading="eager"
                  className="object-contain opacity-80"
                  style={{
                    width: "34px",
                    height: "34px",
                    marginBottom: "2px",
                  }}
                />
                <p className="text-[9px] text-gray-600 leading-none">
                  Authorized Stamp
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SECTION - PHOTO */}
        {fields.photoUrl !== false && (
          <div className="flex flex-col items-center justify-between h-full">
            <div className="h-[170px] w-[120px] rounded-lg overflow-hidden border border-white shadow-md bg-gray-50 flex-shrink-0">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt="Student"
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
            {fields.contact !== false && (
              <p className="text-[9px] text-gray-600 mt-2 leading-none">
                Contact: {school?.contact || "—"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
