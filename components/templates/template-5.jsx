"use client";

export function Template5({ student, school, fields = {}, ...props }) {
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
      {/* Accent Polygon Background */}
      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        viewBox="0 0 410 260"
        aria-hidden="true"
      >
        <polygon points="0,0 410,0 410,90" fill="var(--accent)" />
      </svg>

      {/* Main Content */}
      <div className="z-10 flex w-full items-stretch p-3">
        {/* LEFT SECTION - School + Student Info */}
        <div className="flex w-3/5 flex-col gap-2">
          {/* SCHOOL HEADER */}
          <div className="flex items-center gap-2">
            {fields.logo !== false && (
              <>
                {school?.logoDataUrl ? (
                  <img
                    src={school.logoDataUrl}
                    alt="School logo"
                    className="h-8 w-8 rounded object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <img
                    src="/generic-school-logo.png"
                    alt="School logo"
                    className="h-8 w-8 rounded object-contain"
                  />
                )}
              </>
            )}
            <div className="min-w-0">
              {fields.schoolName !== false && (
                <p className="text-sm font-semibold truncate">
                  {school?.schoolName || "School Name"}
                </p>
              )}
              {fields.address !== false && (
                <p className="truncate text-[11px] text-muted-foreground leading-tight">
                  {school?.address || "School Address"}
                </p>
              )}
            </div>
          </div>

          {/* STUDENT NAME */}
          {fields.name !== false && (
            <p className="text-lg font-semibold mt-1 leading-tight">
              {student?.name || "Student Name"}
            </p>
          )}

          {/* STUDENT INFO GRID */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-[2px] text-xs text-gray-800">
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
            {fields.address !== false && (
              <p
                className="col-span-2 overflow-hidden text-gray-700"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  maxHeight: "2.4em",
                }}
              >
                <span className="text-muted-foreground">Address:</span>{" "}
                {student?.address || "—"}
              </p>
            )}
          </div>

          {/* CONTACT */}
          {fields.contact !== false && (
            <div className="mt-auto text-[10px] text-muted-foreground leading-tight">
              Contact: {school?.contact || "—"}
            </div>
          )}
        </div>

        {/* RIGHT SECTION - Student Photo + Footer */}
        <div className="ml-auto flex flex-col items-center justify-between">
          {/* PHOTO */}
          <div className="flex justify-end">
            {fields.photoUrl !== false && (
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={`${student?.name || "Student"} photo`}
                className="h-[160px] w-[115px] rounded-md object-cover border shadow-sm"
                crossOrigin="anonymous"
              />
            )}
          </div>

          {/* SIGNATURES */}
          <div className="mt-2 flex w-full justify-between gap-4 px-2">
            {fields.principalSign !== false && (
              <div className="flex flex-col items-center">
                <img
                  src={school?.principalSign || "/image.png"}
                  alt="Principal Sign"
                  crossOrigin="anonymous"
                  loading="eager"
                  className="object-contain opacity-90"
                  style={{ height: "26px", marginBottom: "2px" }}
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
                  style={{ height: "34px", marginBottom: "2px" }}
                />
                <p className="text-[9px] text-gray-600 leading-none">
                  Authorized Stamp
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
