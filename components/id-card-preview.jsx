"use client"
import { TemplateBase } from "./templates/template-base"
import { TEMPLATES } from "./templates"

export function IDCardPreview({ templateKey, Templates, school, fields, students, currentIndex }) {
  const Comp = TEMPLATES[templateKey] || TemplateBase
  const student = students[currentIndex]

  if (!student) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm text-muted-foreground">No student selected.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-3 text-lg font-medium">Preview</h2>
      <div data-html2canvas-card className="inline-block" style={{ "--accent": school.accent }}>
        <Comp data-template-frame school={school} fields={fields} student={student} />
      </div>
    </div>
  )
}
