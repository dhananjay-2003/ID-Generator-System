"use client";

export function Template4({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="flex h-[260px] w-[410px] flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
      style={{
        "--accent": school?.accent || "#0ea5e9",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Header with Accent and Logo */}
      <div
        className="flex items-center justify-center gap-2 p-2"
        style={{ background: "var(--accent)" }}
      >
        {fields.logo !== false && (
          <>
            {school?.logoDataUrl ? (
              <img
                src={school.logoDataUrl}
                alt="School logo"
                className="h-8 w-8 rounded-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <img
                src="/generic-school-logo.png"
                alt="School logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
          </>
        )}
        {fields.schoolName !== false && (
          <p className="text-sm font-semibold text-primary-foreground truncate">
            {school?.schoolName || "School Name"}
          </p>
        )}
      </div>

      {/* Body Section */}
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {/* PHOTO */}
        {fields.photoUrl !== false && (
          <div className="col-span-1 flex items-center justify-center">
            <div className="h-[120px] w-[120px] overflow-hidden rounded-full border bg-background shadow-sm">
              <img
                src={student?.photoUrl || "/student-photo.jpg"}
                alt={`${student?.name || "Student"} photo`}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* DETAILS */}
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            {fields.name !== false && (
              <p className="text-lg font-semibold leading-tight">
                {student?.name || "Student Name"}
              </p>
            )}

            {/* Info Grid */}
            <div
              className="mt-1 grid grid-cols-2 gap-x-3 gap-y-[2px] text-xs text-gray-800"
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
                  }}
                >
                  <span className="text-muted-foreground">Address:</span>{" "}
                  {student?.address || "—"}
                </p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          {fields.contact !== false && (
            <p className="text-[10px] text-muted-foreground mt-2 leading-none">
              Contact: {school?.contact || "—"}
            </p>
          )}
        </div>
      </div>

      {/* Footer - Signatures */}
      <div className="flex justify-around items-center border-t p-2 pt-1">
        {fields.principalSign !== false && (
          <div className="flex flex-col items-center">
            <img
              src={school?.principalSign || "/principal-sign.png"}
              alt="Principal Sign"
              crossOrigin="anonymous"
              loading="eager"
              className="object-contain opacity-90"
              style={{ height: "26px", marginBottom: "2px" }}
            />
            <p className="text-[9px] text-gray-600 leading-none">Principal</p>
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
              style={{ height: "34px", marginBottom: "2px" }}
            />
            <p className="text-[9px] text-gray-600 leading-none">
              Authorized Stamp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
