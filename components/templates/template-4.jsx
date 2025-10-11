"use client"

export function Template4({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[260px] w-[410px] flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
    >
      <div className="flex items-center justify-center gap-2 p-2" style={{ background: "var(--accent, #0ea5e9)" }}>
        {school.logoDataUrl ? (
          <img
            src={school.logoDataUrl || "/placeholder.svg"}
            alt="School logo"
            className="h-8 w-8 rounded-full object-cover"
            crossOrigin="anonymous"
          />
        ) : (
          <img src="/generic-school-logo.png" alt="" className="h-8 w-8 rounded-full object-cover" />
        )}
        <p className="text-sm font-semibold text-primary-foreground">{school.schoolName}</p>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        <div className="col-span-1 flex items-center justify-center">
          <div className="h-[120px] w-[120px] overflow-hidden rounded-full border bg-background">
            {student.photoUrl ? (
              <img
                src={student.photoUrl || "/placeholder.svg"}
                alt={`${student.name || "Student"} photo`}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <img src="/student-photo.jpg" alt="" className="h-full w-full object-cover" />
            )}
          </div>
        </div>
        <div className="col-span-2">
          {fields.name && <p className="text-lg font-semibold">{student.name || "Student Name"}</p>}
          <div className="mt-1 grid grid-cols-2 gap-x-3 text-xs">
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
          </div>
          <p className="mt-auto text-[10px] text-muted-foreground">{school.contact}</p>
        </div>
      </div>
    </div>
  )
}
