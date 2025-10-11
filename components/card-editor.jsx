"use client"

export function CardEditor({
  school,
  setSchool,
  fields,
  setFields,
  students,
  setStudents,
  currentIndex,
  setCurrentIndex,
}) {
  function toggleField(k) {
    setFields({ ...fields, [k]: !fields[k] })
  }
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-2 text-lg font-medium">Editor</h2>

      <div className="space-y-2">
        <p className="text-sm font-medium">Visible fields</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.keys(fields).map((k) => (
            <label key={k} className="flex items-center gap-2">
              <input type="checkbox" checked={fields[k]} onChange={() => toggleField(k)} />
              <span className="capitalize">{k}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium">Preview student</p>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-2 py-1"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {students.length}
          </span>
          <button
            className="rounded-md border px-2 py-1"
            onClick={() => setCurrentIndex(Math.min(students.length - 1, currentIndex + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
