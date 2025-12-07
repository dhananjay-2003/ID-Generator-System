"use client";

export function VerticalTemplate6({ student, school, fields = {}, ...props }) {
  return (
    <div
      {...props}
      data-template-frame
      className="relative flex h-[410px] w-[260px] overflow-hidden rounded-xl border border-gray-800 shadow-lg text-white"
      style={{
        fontFamily: "'Orbitron', Inter, sans-serif",
        background: `linear-gradient(145deg, #0f172a, #1e293b)`,
      }}
    >
      {/* Neon Accent Top */}
      <div
        className="absolute top-0 left-0 h-4 w-full"
        style={{
          background: `linear-gradient(90deg, #06b6d4, #3b82f6, #ec4899)`,
          boxShadow: "0 0 10px #06b6d4, 0 0 20px #3b82f6, 0 0 30px #ec4899",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col justify-between p-3 relative z-10 h-full w-full">
        {/* School Logo & Name */}
        {(fields.logo !== false || fields.schoolName !== false) && (
          <div className="flex flex-col items-center gap-1 text-center">
            {fields.logo !== false && (
              <img
                src={school?.logoDataUrl || "/generic-school-logo.png"}
                alt="School Logo"
                className="h-10 w-10 rounded-full border-2 border-cyan-400 shadow-lg object-cover"
                crossOrigin="anonymous"
                loading="eager"
              />
            )}
            {fields.schoolName !== false && (
              <p className="text-sm font-bold text-cyan-400 truncate">
                {school?.schoolName || "School Name"}
              </p>
            )}
          </div>
        )}

        {/* Student Photo */}
        {fields.photoUrl !== false && (
          <div className="flex justify-center my-2">
            <div className="rounded-lg border-2 border-purple-500 p-[3px] shadow-xl bg-gray-900">
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
        <div className="flex flex-col text-center space-y-1 mt-1">
          {fields.name !== false && (
            <p className="text-lg font-bold text-purple-400 truncate">
              {student?.name || "Student Name"}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-xs mt-1 justify-items-center text-gray-300">
            {fields.id !== false && (
              <p>
                <span className="text-cyan-400 font-semibold">ID:</span>{" "}
                {student?.id || "—"}
              </p>
            )}
            {fields.className !== false && (
              <p>
                <span className="text-cyan-400 font-semibold">Class:</span>{" "}
                {student?.className || "—"}
              </p>
            )}
            {fields.section !== false && (
              <p>
                <span className="text-cyan-400 font-semibold">Section:</span>{" "}
                {student?.section || "—"}
              </p>
            )}
            {fields.dob !== false && (
              <p>
                <span className="text-cyan-400 font-semibold">DOB:</span>{" "}
                {student?.dob || "—"}
              </p>
            )}
            {fields.phone !== false && (
              <p className="col-span-2">
                <span className="text-cyan-400 font-semibold">Phone:</span>{" "}
                {student?.phone || "—"}
              </p>
            )}
            {fields.studentAddress !== false && (
              <p
                className="col-span-2 text-gray-300 truncate"
                style={{ maxHeight: "2.4em", lineHeight: "1.2" }}
              >
                <span className="text-cyan-400 font-semibold">Address:</span>{" "}
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
              <p className="text-[9px] text-gray-400 leading-none">Principal</p>
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
              <p className="text-[9px] text-gray-400 leading-none">
                Authorized Stamp
              </p>
            </div>
          )}
        </div>

        {/* Contact */}
        {fields.contact !== false && (
          <p className="text-[9px] text-gray-400 text-center mt-1 leading-none">
            Contact: {school?.contact || "—"}
          </p>
        )}
      </div>
    </div>
  );
}
