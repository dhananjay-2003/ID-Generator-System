"use client";
import { useState } from "react";
import { TEMPLATE_LIST } from "./templates";

export function TemplateSelector({ templateKey, setTemplateKey }) {
  const [activeTab, setActiveTab] = useState("vertical");

  // Filter templates by tab (vertical/horizontal)
  const filteredTemplates = TEMPLATE_LIST.filter((key) =>
    activeTab === "vertical"
      ? key.startsWith("vertical")
      : key.startsWith("template")
  );

  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium">Templates</h2>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("vertical")}
            className={`px-3 py-1 text-sm rounded-md border ${
              activeTab === "vertical"
                ? "bg-primary text-white"
                : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            Vertical
          </button>

          <button
            onClick={() => setActiveTab("horizontal")}
            className={`px-3 py-1 text-sm rounded-md border ${
              activeTab === "horizontal"
                ? "bg-primary text-white"
                : "bg-background text-foreground hover:bg-muted"
            }`}
          >
            Horizontal
          </button>
        </div>
      </div>

      {/* Templates */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {filteredTemplates.map((key) => {
          const isActive = key === templateKey;
          return (
            <button
              key={key}
              onClick={() => setTemplateKey(key)}
              aria-pressed={isActive}
              className={`flex-none rounded-md border ${
                isActive ? "ring-2 ring-primary" : ""
              }`}
            >
              <img
                src={`/id-card-template-.jpg?height=160&width=100&query=ID%20Card%20Template%20${encodeURIComponent(
                  key
                )}`}
                alt={`Template ${key}`}
                className="h-[160px] w-[100px] rounded-md object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
