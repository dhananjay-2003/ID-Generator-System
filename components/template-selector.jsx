"use client"
import { TEMPLATE_LIST } from "./templates"

export function TemplateSelector({ templateKey, setTemplateKey, Templates }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-2 text-lg font-medium">Templates</h2>
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATE_LIST.map((key) => {
          const isActive = key === templateKey
          return (
            <button
              key={key}
              className={`rounded-md border ${isActive ? "ring-2 ring-primary" : ""}`}
              onClick={() => setTemplateKey(key)}
              aria-pressed={isActive}
            >
              <img
                src={`/id-card-template-.jpg?height=90&width=160&query=ID%20Card%20Template%20${encodeURIComponent(
                  key,
                )}`}
                alt={`Template ${key}`}
                className="h-[90px] w-full rounded-md object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
