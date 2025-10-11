"use client"

import type { TemplateProps } from "./index"

function Photo({ src, alt }: { src?: string; alt: string }) {
  const fallback = "/student-photo-portrait.jpg"
  return (
    <img
      src={src || fallback}
      alt={alt}
      className="h-28 w-20 sm:h-32 sm:w-24 object-cover rounded-md border"
      crossOrigin="anonymous"
    />
  )
}

function Logo({ src }: { src?: string | null }) {
  const size = "h-10 w-10"
  if (!src) {
    return <div className={`${size} rounded-md bg-muted border`} aria-hidden />
  }
  return (
    <img
      src={src || "/placeholder.svg"}
      alt="School logo"
      className={`${size} rounded-md object-contain`}
      crossOrigin="anonymous"
    />
  )
}

export function TemplateFrame({ student, styleConfig, variant }: TemplateProps & { variant: number }) {
  const fontClass = styleConfig.font === "mono" ? "font-mono" : "font-sans"

  return (
    <div
      data-template-frame
      className={`${fontClass} relative overflow-hidden`}
      style={{
        width: 336,
        height: 528,
        color: styleConfig.textColor,
        background: styleConfig.bgColor,
        borderRadius: 12,
        border: `1px solid var(--color-border)`,
        boxSizing: "border-box",
      }}
    >
      {variant === 1 && (
        <div className="h-full flex flex-col">
          <div
            className="h-14 flex items-center justify-between px-3"
            style={{ background: styleConfig.accentColor, color: "#fff" }}
          >
            <Logo src={styleConfig.logoDataUrl || undefined} />
            <div className="text-sm font-semibold tracking-wide">Student ID Card</div>
            <div className="w-10" />
          </div>
          <div className="flex-1 p-3 flex gap-3 items-start">
            <Photo src={student.photoUrl} alt={`${student.name} photo`} />
            <div className="text-sm space-y-1">
              <div className="font-semibold text-base">{student.name}</div>
              <div className="opacity-90">ID: {student.studentId || "—"}</div>
              <div className="opacity-90">
                Class: {student.className || "—"} {student.section || ""}
              </div>
              <div className="opacity-90">DOB: {student.dob || "—"}</div>
            </div>
          </div>
          <div className="h-10 px-3 flex items-center justify-center text-xs opacity-80">© Your School</div>
        </div>
      )}

      {variant === 2 && (
        <div className="h-full flex flex-col">
          <div className="h-20 p-3 flex items-center gap-2">
            <Logo src={styleConfig.logoDataUrl || undefined} />
            <div className="text-base font-semibold">Your School</div>
          </div>
          <div className="flex-1 px-3 pb-3">
            <div className="rounded-md p-2 flex gap-3" style={{ background: styleConfig.accentColor, color: "#fff" }}>
              <Photo src={student.photoUrl} alt={`${student.name} photo`} />
              <div className="text-sm space-y-1">
                <div className="font-semibold text-base">{student.name}</div>
                <div>ID: {student.studentId || "—"}</div>
                <div>
                  Class: {student.className || "—"} {student.section || ""}
                </div>
              </div>
            </div>
          </div>
          <div className="h-10 px-3 flex items-center justify-between text-xs">
            <span>DOB: {student.dob || "—"}</span>
            <span>signature</span>
          </div>
        </div>
      )}

      {variant === 3 && (
        <div className="h-full grid grid-rows-[64px_1fr_48px]">
          <div
            className="px-3 flex items-center justify-between"
            style={{ borderBottom: "2px solid var(--color-border)" }}
          >
            <div className="text-base font-semibold">Student</div>
            <Logo src={styleConfig.logoDataUrl || undefined} />
          </div>
          <div className="p-3 flex flex-col items-center justify-center gap-2">
            <Photo src={student.photoUrl} alt={`${student.name} photo`} />
            <div className="text-center">
              <div className="font-semibold">{student.name}</div>
              <div className="text-xs opacity-80">ID: {student.studentId || "—"}</div>
              <div className="text-xs opacity-80">
                Class: {student.className || "—"} {student.section || ""}
              </div>
            </div>
          </div>
          <div
            className="px-3 flex items-center justify-center text-xs"
            style={{ background: styleConfig.accentColor, color: "#fff" }}
          >
            {student.dob ? `DOB: ${student.dob}` : "—"}
          </div>
        </div>
      )}

      {/* New distinct layouts for 4–6 */}
      {variant === 4 && (
        <div className="h-full relative flex flex-col">
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
            style={{ background: styleConfig.accentColor }}
            aria-hidden
          />
          <div className="p-3 flex items-center gap-2">
            <Logo src={styleConfig.logoDataUrl || undefined} />
            <div className="text-base font-semibold">Your School</div>
          </div>
          <div className="px-3 flex gap-3 items-start">
            <Photo src={student.photoUrl} alt={`${student.name} photo`} />
            <div className="text-sm space-y-1">
              <div className="font-semibold text-base">{student.name}</div>
              <div>ID: {student.studentId || "—"}</div>
              <div>
                Class: {student.className || "—"} {student.section || ""}
              </div>
              <div>DOB: {student.dob || "—"}</div>
            </div>
          </div>
          <div className="mt-auto h-10 px-3 flex items-center justify-center text-xs opacity-80">© Your School</div>
        </div>
      )}

      {variant === 5 && (
        <div className="h-full grid grid-rows-[80px_1fr_40px]">
          <div className="px-3 flex items-center gap-2" style={{ background: styleConfig.accentColor, color: "#fff" }}>
            <Logo src={styleConfig.logoDataUrl || undefined} />
            <div className="text-base font-semibold tracking-wide">ID PASS</div>
          </div>
          <div className="p-3 grid grid-cols-[auto_1fr] gap-3">
            <Photo src={student.photoUrl} alt={`${student.name} photo`} />
            <div className="text-sm space-y-1">
              <div className="font-semibold text-base">{student.name}</div>
              <div className="opacity-90">ID: {student.studentId || "—"}</div>
              <div className="opacity-90">
                Class: {student.className || "—"} {student.section || ""}
              </div>
            </div>
          </div>
          <div className="px-3 text-xs flex items-center justify-between">
            <span>DOB: {student.dob || "—"}</span>
            <span>signature</span>
          </div>
        </div>
      )}

      {variant === 6 && (
        <div className="h-full relative flex flex-col">
          <div
            className="h-16"
            style={{
              background: `linear-gradient(90deg, ${styleConfig.accentColor}, ${styleConfig.bgColor})`,
            }}
            aria-hidden
          />
          <div className="p-3 -mt-8 flex gap-3 items-start">
            <Photo src={student.photoUrl} alt={`${student.name} photo`} />
            <div className="text-sm space-y-1 bg-background/60 rounded-md p-2">
              <div className="font-semibold text-base">{student.name}</div>
              <div>ID: {student.studentId || "—"}</div>
              <div>
                Class: {student.className || "—"} {student.section || ""}
              </div>
              <div>DOB: {student.dob || "—"}</div>
            </div>
          </div>
          <div className="mt-auto h-10 px-3 flex items-center justify-between text-xs opacity-80">
            <span>© Your School</span>
            <Logo src={styleConfig.logoDataUrl || undefined} />
          </div>
        </div>
      )}

      {/* Variants 7..25 keep systematic diversity */}
      {variant >= 7 && variant <= 25 && (
        <div className="h-full flex flex-col">
          <div
            className="h-14 px-3 flex items-center gap-2"
            style={{
              background: variant % 2 === 0 ? styleConfig.accentColor : styleConfig.bgColor,
              color: variant % 2 === 0 ? "#fff" : styleConfig.textColor,
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <Logo src={styleConfig.logoDataUrl || undefined} />
            <div className="font-semibold text-base">Your School</div>
          </div>
          <div className="flex-1 p-3 grid grid-cols-2 gap-3">
            <div className="col-span-1 flex items-start justify-start">
              <Photo src={student.photoUrl} alt={`${student.name} photo`} />
            </div>
            <div className="col-span-1 text-sm space-y-1">
              <div className="font-semibold text-base">{student.name}</div>
              <div>ID: {student.studentId || "—"}</div>
              <div>
                Class: {student.className || "—"} {student.section || ""}
              </div>
              {variant % 3 === 0 && <div>DOB: {student.dob || "—"}</div>}
              {variant % 5 === 0 && (
                <div
                  className="mt-1 rounded-md px-2 py-1 text-xs"
                  style={{ background: styleConfig.accentColor, color: "#fff" }}
                >
                  VALID
                </div>
              )}
            </div>
          </div>
          <div className="h-10 px-3 flex items-center justify-between text-xs opacity-80">
            <span>© Your School</span>
            <span>signature</span>
          </div>
        </div>
      )}
    </div>
  )
}
