"use client";

export function Template8({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="relative flex h-[260px] w-[410px] flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
    >
      <div className="flex flex-1 items-stretch p-3">
        <div className="flex w-3/5 flex-col gap-2">
          <div className="flex items-center gap-2">
            {school.logoDataUrl ? (
              <img
                src={school.logoDataUrl || "/placeholder.svg"}
                alt="School logo"
                className="h-8 w-8 rounded object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <img
                src="/generic-school-logo.png"
                alt=""
                className="h-8 w-8 rounded object-contain"
              />
            )}
            <div className="min-w-0">
              <p className="  text-sm font-semibold">{school.schoolName}</p>
              <p className=" truncate  text-xs text-muted-foreground">
                {school.address}
              </p>
            </div>
          </div>
          {fields.name && (
            <p className="text-lg font-semibold">
              {student.name || "Student Name"}
            </p>
          )}
          <div className="grid grid-cols-2 gap-x-3 text-xs">
            {fields.studentId && (
              <p>
                <span className="text-muted-foreground">ID:</span>{" "}
                {student.id || "—"}
              </p>
            )}
            {fields.className && (
              <p>
                <span className="text-muted-foreground">Class:</span>{" "}
                {student.className || "—"}
              </p>
            )}
            {fields.section && (
              <p>
                <span className="text-muted-foreground">Section:</span>{" "}
                {student.section || "—"}
              </p>
            )}
            {fields.dob && (
              <p>
                <span className="text-muted-foreground">DOB:</span>{" "}
                {student.dob || "—"}
              </p>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center">
          {student.photoUrl ? (
            <img
              src={student.photoUrl || "/placeholder.svg"}
              alt={`${student.name || "Student"} photo`}
              className="h-[180px] w-[120px] rounded-md object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <img
              src="/student-photo.jpg"
              alt=""
              className="h-[180px] w-[120px] rounded-md object-cover"
            />
          )}
        </div>
      </div>
      <div
        className="p-2 text-center text-xs text-primary-foreground"
        style={{ background: "var(--accent, #0ea5e9)" }}
      >
        {school.contact}
      </div>
    </div>
  );
}
