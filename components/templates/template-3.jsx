"use client";

export function Template3({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
      style={{
        "--accent": school?.accent || "#0ea5e9",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Accent Background Bar */}
      <div
        className="absolute left-0 top-8 h-8 w-full"
        style={{
          background:
            "color-mix(in oklab, var(--accent, #0ea5e9) 18%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Main Layout */}
      <div className="flex w-full justify-between items-stretch p-3 relative z-10">
        {/* LEFT SECTION */}
        <div className="flex w-2/3 flex-col justify-between">
          {/* School Info */}
          {(fields.logo !== false ||
            fields.schoolName !== false ||
            fields.schoolAddress !== false) && (
            <div className="flex items-center gap-2 mb-1">
              {fields.logo !== false && (
                <img
                  src={school?.logoDataUrl || "/generic-school-logo.png"}
                  alt="School Logo"
                  className="h-8 w-8 rounded object-contain border border-gray-200"
                  crossOrigin="anonymous"
                  loading="eager"
                />
              )}
              <div className="min-w-0">
                {fields.schoolName !== false && (
                  <p className="text-sm font-semibold truncate">
                    {school?.schoolName || "School Name"}
                  </p>
                )}
                {fields.schoolAddress !== false && (
                  <p className="truncate text-[10px] text-muted-foreground leading-tight">
                    {school?.schoolAddress || "School Address"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Student Info */}
          <div className="mt-1">
            {fields.name !== false && (
              <p className="text-pretty text-lg font-semibold leading-tight">
                {student?.name || "Student Name"}
              </p>
            )}
            <div
              className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs mt-1 text-gray-800"
              style={{ lineHeight: "1.2" }}
            >
              {fields.id !== false && (
                <p>
                  <span className="text-muted-foreground">ID:</span>{" "}
                  {student?.id || "—"}
                </p>
              )}
              {fields.className !== false && (
                <p>
                  <span className="text-muted-foreground">Class:</span>{" "}
                  {student?.className || "—"}
                </p>
              )}
              {fields.section !== false && (
                <p>
                  <span className="text-muted-foreground">Section:</span>{" "}
                  {student?.section || "—"}
                </p>
              )}
              {fields.dob !== false && (
                <p>
                  <span className="text-muted-foreground">DOB:</span>{" "}
                  {student?.dob || "—"}
                </p>
              )}
              {fields.phone !== false && (
                <p className="col-span-2">
                  <span className="text-muted-foreground">Phone:</span>{" "}
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
                  <span className="text-muted-foreground">Address:</span>{" "}
                  {student?.address || "—"}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Section - Principal & Stamp */}
          <div className="flex justify-between items-end mt-2">
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
                <p className="text-[9px] text-gray-600 leading-none">
                  Principal
                </p>
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
        </div>

        {/* RIGHT SECTION - PHOTO */}
        {fields.photoUrl !== false && (
          <div className="ml-auto flex flex-col items-center justify-between">
            <div className="rounded-md border bg-background p-[3px] shadow-sm">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={`${student?.name || "Student"} photo`}
                className="h-[185px] w-[130px] rounded-md object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>

            {fields.contact !== false && (
              <p className="text-[9px] text-muted-foreground mt-1 leading-none">
                Contact: {school?.contact || "—"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
