"use client";

import { useState } from "react";
import Link from "next/link";
import { CoaCard } from "@/components/coa-badge";
import { coas, growHouses, strains } from "@/lib/strains";

export default function CoaUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedGrowHouse, setSelectedGrowHouse] = useState("");
  const [selectedStrain, setSelectedStrain] = useState("");
  const [batchId, setBatchId] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setUploadedFile(files[0].name);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.[0]) {
      setUploadedFile(files[0].name);
    }
  }

  const sortedCoas = [...coas].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            COA Management
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Upload and manage Certificates of Analysis for your batches
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 dark:bg-green-900/20">
          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
            {coas.filter((c) => c.status === "verified").length}
          </span>
          <span className="text-xs text-green-600 dark:text-green-500">verified</span>
        </div>
      </div>

      {/* Upload Form */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Upload New COA
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Upload a lab report PDF. Must include batch ID and be from a licensed testing lab.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Grow House
            </label>
            <select
              value={selectedGrowHouse}
              onChange={(e) => setSelectedGrowHouse(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="">Select grow house...</option>
              {growHouses.map((gh) => (
                <option key={gh.id} value={gh.id}>
                  {gh.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Strain
            </label>
            <select
              value={selectedStrain}
              onChange={(e) => setSelectedStrain(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="">Select strain...</option>
              {strains.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.type})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Batch ID
            </label>
            <input
              type="text"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              placeholder="e.g. GV-BD-2026-042"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
            dragActive
              ? "border-green-500 bg-green-50/50 dark:bg-green-900/10"
              : uploadedFile
                ? "border-green-300 bg-green-50/30 dark:border-green-700 dark:bg-green-900/10"
                : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <>
              <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-400">
                {uploadedFile}
              </p>
              <button
                onClick={() => setUploadedFile(null)}
                className="mt-2 text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                Remove and upload a different file
              </button>
            </>
          ) : (
            <>
              <svg className="h-10 w-10 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Drag and drop your COA file here
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                PDF, PNG, or JPG up to 10MB
              </p>
              <label className="mt-4 cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-300 transition-colors hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-600 dark:hover:bg-zinc-700">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
              </label>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={!uploadedFile || !selectedGrowHouse || !selectedStrain || !batchId}
            className="rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-green-600 dark:hover:bg-green-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
          >
            Upload COA for Review
          </button>
        </div>
      </div>

      {/* Existing COAs */}
      <div className="mt-12">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            All Certificates
          </h2>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {coas.length}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sortedCoas.map((coa) => {
            const strain = strains.find((s) => s.id === coa.strainId);
            const gh = growHouses.find((g) => g.id === coa.growHouseId);
            return (
              <div key={coa.id}>
                <div className="mb-1 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                  {strain && <span>{strain.name}</span>}
                  {gh && (
                    <>
                      <span>from</span>
                      <Link
                        href={`/grow-houses/${gh.slug}`}
                        className="text-zinc-600 hover:text-green-700 dark:text-zinc-400"
                      >
                        {gh.name}
                      </Link>
                    </>
                  )}
                </div>
                <CoaCard coa={coa} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
