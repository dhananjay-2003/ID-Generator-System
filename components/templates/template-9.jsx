"use client";

export function Template9({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[260px] w-[410px] overflow-hidden rounded-xl border bg-white text-gray-800 shadow-md"
      style={{
        "--accent": school?.accent || "#dc2626", // Red tone
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Red Ribbon Accent */}
      <div
        className="absolute left-0 top-0 h-full w-[72px] bg-[var(--accent)]"
        aria-hidden="true"
      ></div>
      <div className="absolute left-[72px] top-0 h-full w-[2px] bg-white opacity-80"></div>

      {/* Card Content */}
      <div className="relative z-10 flex w-full p-3 pl-6">
        {/* LEFT — Info Section */}
        <div className="flex w-2/3 flex-col justify-between">
          <div className="flex flex-col gap-2">
            {/* Logo + School Info */}
            <div className="flex items-center gap-2">
              {fields.logo !== false && (
                <img
                  src={school?.logoDataUrl || "/generic-school-logo.png"}
                  alt="School Logo"
                  className="h-8 w-8 rounded bg-white object-contain"
                  crossOrigin="anonymous"
                />
              )}
              <div>
                {fields.schoolName !== false && (
                  <p className="text-sm font-bold leading-tight">
                    {school?.schoolName || "School Name"}
                  </p>
                )}
                {fields.address !== false && (
                  <p className="truncate text-[10px] text-gray-500 leading-tight">
                    {school?.address || "School Address"}
                  </p>
                )}
              </div>
            </div>

            {/* Student Info */}
            {fields.name !== false && (
              <p className="mt-2 text-lg font-semibold leading-tight">
                {student?.name || "Student Name"}
              </p>
            )}

            <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs">
              {fields.studentId !== false && (
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
                  className="col-span-2 overflow-hidden text-gray-700"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    maxHeight: "2.4em",
                  }}
                >
                  <span className="text-gray-500">Address:</span>{" "}
                  {student?.address || "—"}
                </p>
              )}
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-2 flex justify-between pr-2">
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

          {/* Footer Contact */}
          {fields.contact !== false && (
            <p className="mt-1 text-[10px] text-gray-500">
              {school?.contact || "Contact: —"}
            </p>
          )}
        </div>

        {/* RIGHT — Photo Section */}
        <div className="ml-auto flex items-center">
          {fields.photoUrl !== false && (
            <img
              src={student?.photoUrl || "/student-photo.jpg"}
              alt={`${student?.name || "Student"} photo`}
              className="h-[180px] w-[120px] rounded-lg border-2 object-cover shadow"
              style={{ borderColor: "var(--accent)" }}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>
    </div>
  );
}
