"use client";

export function Template8({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[260px] w-[410px] flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
      style={{
        "--accent": school?.accent || "#0ea5e9",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Diagonal Accent */}
      <div
        className="absolute -left-16 top-0 h-[160%] w-[60%] rotate-[-15deg] bg-[var(--accent)] opacity-15"
        aria-hidden="true"
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 items-stretch p-3">
        {/* LEFT — School Info + Student Details */}
        <div className="flex w-3/5 flex-col justify-between gap-2">
          {/* School Header */}
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

          {/* Student Info */}
          {fields.name !== false && (
            <p className="mt-1 text-lg font-semibold leading-tight">
              {student?.name || "Student Name"}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-3 gap-y-[2px] text-xs text-gray-800">
            {fields.studentId !== false && (
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

          {/* Signatures */}
          <div className="mt-2 flex w-full justify-between gap-2">
            {fields.principalSign !== false && (
              <div className="flex flex-col items-center">
                <img
                  src={school?.principalSign || "/principal-sign.png"}
                  alt="Principal Sign"
                  className="object-contain opacity-90"
                  style={{ height: "26px", marginBottom: "2px" }}
                  crossOrigin="anonymous"
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
                  className="object-contain opacity-80"
                  style={{ height: "34px", marginBottom: "2px" }}
                  crossOrigin="anonymous"
                />
                <p className="text-[9px] text-gray-600 leading-none">
                  Authorized Stamp
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Student Photo */}
        <div className="ml-auto flex items-center justify-center">
          {fields.photoUrl !== false && (
            <img
              src={student?.photoUrl || "/student-photo.jpg"}
              alt={`${student?.name || "Student"} photo`}
              className="h-[180px] w-[120px] rounded-md border-2 object-cover"
              style={{ borderColor: "var(--accent)" }}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>

      {/* Footer Bar */}
      {fields.contact !== false && (
        <div
          className="relative z-10 p-2 text-center text-xs text-primary-foreground"
          style={{ background: "var(--accent, #0ea5e9)" }}
        >
          {school?.contact || "Contact: —"}
        </div>
      )}
    </div>
  );
}
