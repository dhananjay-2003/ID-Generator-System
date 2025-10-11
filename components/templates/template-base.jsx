"use client"

export function TemplateBase({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[260px] w-[410px] items-stretch overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex w-3/5 flex-col gap-2 p-3">
        <div className="flex items-center gap-2">
          {school.logoDataUrl ? (
            <img
              src={school.logoDataUrl || "/placeholder.svg"}
              alt="School logo"
              className="h-8 w-8 rounded object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <img src="/generic-school-logo.png" alt="" className="h-8 w-8 rounded object-contain" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{school.schoolName}</p>
            <p className="truncate text-xs text-muted-foreground">{school.address}</p>
          </div>
        </div>

        <div className="mt-1">
          {fields.name && <p className="text-pretty text-lg font-semibold">{student.name || "Student Name"}</p>}
          <div className="grid grid-cols-2 gap-x-3 text-xs">
            {fields.studentId && (
              <p>
                <span className="text-muted-foreground">ID:</span> {student.id || "—"}
              </p>
            )}
            {fields.className && (
              <p>
                <span className="text-muted-foreground">Class:</span> {student.className || "—"}
              </p>
            )}
            {fields.section && (
              <p>
                <span className="text-muted-foreground">Section:</span> {student.section || "—"}
              </p>
            )}
            {fields.dob && (
              <p>
                <span className="text-muted-foreground">DOB:</span> {student.dob || "—"}
              </p>
            )}
            {fields.phone && (
              <p className="col-span-2">
                <span className="text-muted-foreground">Phone:</span> {student.phone || "—"}
              </p>
            )}
            {fields.address && (
              <p className="col-span-2 text-pretty">
                <span className="text-muted-foreground">Address:</span> {student.address || "—"}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto text-[10px] text-muted-foreground">{school.contact}</div>
      </div>

      <div
        className="flex w-2/5 items-center justify-center"
        style={{ background: "var(--accent, #0ea5e9)" }}
        aria-hidden="true"
      >
        {student.photoUrl ? (
          <img
            src={student.photoUrl || "/placeholder.svg"}
            alt={`${student.name || "Student"} photo`}
            className="h-[180px] w-[120px] rounded-md object-cover"
            crossOrigin="anonymous"
          />
        ) : (
          <img src="/student-photo.jpg" alt="" className="h-[180px] w-[120px] rounded-md object-cover" />
        )}
      </div>
    </div>
  )
}
