"use client";
import { useMemo, useState } from "react";
import { DataUploader } from "./data-uploader";
import { TemplateSelector } from "./template-selector";
import { CardEditor } from "./card-editor";
import { IDCardPreview } from "./id-card-preview";
import { DownloadButtons } from "./download-buttons";
import { TEMPLATES } from "./templates";

const defaultSchool = {
  schoolName: "smt S.B.J English High School",
  address: "ManoramaNagar, Thane West, Maharashtra 400607",
  contact: "8745321654",
  logoDataUrl: "",
  accent: "#0ea5e9",
};

const defaultFields = {
  name: true,
  studentId: true,
  className: true,
  section: true,
  dob: true,
  phone: false,
  address: false,
};

const defaultStudents = [
  {
    id: "S-1001",
    name: "Ava Johnson",
    className: "10",
    section: "A",
    dob: "2009-04-12",
    phone: "555-455-1212",
    address: "River Road 24",
    photoUrl: "",
  },
];

export function StudentIDApp() {
  const [students, setStudents] = useState(defaultStudents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [school, setSchool] = useState(defaultSchool);
  const [fields, setFields] = useState(defaultFields);
  const [templateKey, setTemplateKey] = useState(Object.keys(TEMPLATES)[0]);
  const [activeTab, setActiveTab] = useState(0); // 0 = Templates, 1 = Editor

  const currentStudent = students[currentIndex] || null;
  const Templates = useMemo(() => TEMPLATES, []);

  const tabs = ["Template & Preview", "Editor & Export"];

  return (
    <div className="mx-auto w-full p-6 md:p-8">
      {/* ---------- HEADER ---------- */}
      <header className="mb-2 text-center">
        <h1 className="text-balance text-2xl font-semibold md:text-3xl">
          Student ID Card Generator
        </h1>
      </header>

      {/* ---------- TAB NAVIGATION ---------- */}
      <div className="flex justify-center border-b mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-2 font-medium transition-colors ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---------- TAB CONTENT ---------- */}
      <div className="mt-4">
        {/* TAB 1 — TEMPLATE & PREVIEW */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="mt-6">
              <IDCardPreview
                templateKey={templateKey}
                Templates={Templates}
                school={school}
                fields={fields}
                students={students}
                currentIndex={currentIndex}
              />
            </div>

            <h2 className="text-xl font-semibold">Choose Template</h2>
            <TemplateSelector
              templateKey={templateKey}
              setTemplateKey={setTemplateKey}
              Templates={Templates}
            />
          </div>
        )}

        {/* TAB 2 — EDITOR, UPLOADER & EXPORT */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-[50%_50%] gap-6">
            {/* LEFT SECTION — FORM (70%) */}
            <div className="space-y-6">
              <DataUploader
                students={students}
                setStudents={setStudents}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                school={school}
                setSchool={setSchool}
              />

              <DownloadButtons
                templateKey={templateKey}
                Templates={Templates}
                school={school}
                fields={fields}
                students={students}
              />
            </div>

            {/* RIGHT SECTION — PREVIEW (30%) */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="text-lg font-medium mb-3">Live Preview</h3>
              <IDCardPreview
                templateKey={templateKey}
                Templates={Templates}
                school={school}
                fields={fields}
                students={students}
                currentIndex={currentIndex}
              />
              <div className="mt-4">
                <CardEditor
                  school={school}
                  setSchool={setSchool}
                  fields={fields}
                  setFields={setFields}
                  students={students}
                  setStudents={setStudents}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
