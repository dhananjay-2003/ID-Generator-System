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
  logoDataUrl: "", // set via uploader
  accent: "#0ea5e9", // used as --accent; kept in style vars, not Tailwind classes
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

  const currentStudent = students[currentIndex] || null;
  const Templates = useMemo(() => TEMPLATES, []);

  return (
    <div className="mx-auto w-full max-w-6xl p-6 md:p-8">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold md:text-3xl">
          Student ID Card Generator
        </h1>
        <p className="text-muted-foreground">
          Upload data, choose a template, customize, and export as PNG/PDF/ZIP.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <DataUploader
            students={students}
            setStudents={setStudents}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            school={school}
            setSchool={setSchool}
          />

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

        <div className="md:col-span-2">
          <IDCardPreview
            templateKey={templateKey}
            Templates={Templates}
            school={school}
            fields={fields}
            students={students}
            currentIndex={currentIndex}
          />

          <div className="mt-4">
            <DownloadButtons
              templateKey={templateKey}
              Templates={Templates}
              school={school}
              fields={fields}
              students={students}
            />
          </div>

          <div className="mt-6">
            <TemplateSelector
              templateKey={templateKey}
              setTemplateKey={setTemplateKey}
              Templates={Templates}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
