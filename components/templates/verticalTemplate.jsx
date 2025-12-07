  "use client";

  export function VerticalTemplate({ student, school, fields = {}, ...props }) {
    return (
      <div
        {...props}
        data-template-frame
        className="relative flex h-[410px] w-[260px] overflow-hidden rounded-xl border text-card-foreground shadow"
        style={{
          "--accent": school?.accent || "#0ea5e9",
          fontFamily: "Inter, Arial, sans-serif",
          background: `linear-gradient(
            to bottom, 
            ${school?.accent || "#0ea5e9"}20, 
            rgba(255,255,255,0.05) 50%, 
            ${school?.accent || "#0ea5e9"}10
          )`,
        }}
      >
        {/* Accent Bar at Top */}
        <div
          className="absolute top-0 left-0 h-8 w-full"
          style={{
            background:
              "color-mix(in oklab, var(--accent, #0ea5e9) 18%, transparent)",
          }}
          aria-hidden="true"
        />

        <div className="flex flex-col justify-between p-3 relative z-10 h-full w-full">
          {/* School Logo & Info */}
          {(fields.logo !== false ||
            fields.schoolName !== false ||
            fields.schoolAddress !== false) && (
            <div className="flex flex-col items-center gap-1 text-center">
              {fields.logo !== false && (
                <img
                  src={school?.logoDataUrl || "/generic-school-logo.png"}
                  alt="School Logo"
                  className="h-10 w-10 rounded object-contain border border-gray-200"
                  crossOrigin="anonymous"
                  loading="eager"
                />
              )}
              {fields.schoolName !== false && (
                <p className="text-sm font-semibold truncate">
                  {school?.schoolName || "School Name"}
                </p>
              )}
              {fields.schoolAddress !== false && (
                <p className="text-[10px] text-muted-foreground truncate">
                  {school?.schoolAddress || "School Address"}
                </p>
              )}
            </div>
          )}

          {/* Student Photo */}
          {fields.photoUrl !== false && (
            <div className="flex justify-center my-2">
              <div className="rounded-md border bg-background p-[3px] shadow-sm">
                <img
                  src={student?.photoUrl || "/student-photo.jpg"}
                  alt={`${student?.name || "Student"} photo`}
                  className="h-[100px] w-[70px] rounded-md object-cover"
                  crossOrigin="anonymous"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* Student Info */}
          <div className="flex flex-col text-center space-y-1 mt-1">
            {fields.name !== false && (
              <p className="text-lg font-semibold truncate">
                {student?.name || "Student Name"}
              </p>
            )}

            <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs mt-1 text-gray-800 justify-items-center">
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
            <p className="text-[9px] text-muted-foreground text-center mt-1 leading-none">
              Contact: {school?.contact || "—"}
            </p>
          )}
        </div>
      </div>
    );
  }
