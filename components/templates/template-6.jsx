"use client"

export function Template6({ student, school, fields, ...props }) {
  return (
    <div
      {...props}
      className="flex h-[260px] w-[410px] items-stretch overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
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
        {fields.name && <p className="text-lg font-semibold">{student.name || "Student Name"}</p>}
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
        </div>
        <div className="mt-auto text-[10px] text-muted-foreground">{school.contact}</div>
      </div>
      <div className="flex w-2/5 items-center justify-center p-2">
        <div className="rounded-md border-2 p-1" style={{ borderColor: "var(--accent, #0ea5e9)" }}>
          {student.photoUrl ? (
            <img
              src={student.photoUrl || "/placeholder.svg"}
              alt={`${student.name || "Student"} photo`}
              className="h-[170px] w-[110px] rounded object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <img src="/student-photo.jpg" alt="" className="h-[170px] w-[110px] rounded object-cover" />
          )}
        </div>
      </div>
    </div>
  )
}
