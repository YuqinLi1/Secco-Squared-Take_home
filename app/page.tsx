"use client";
import { useState } from "react";
import { submitLead } from "./actions";

export default function Home() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await submitLead(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error); // show duplicate email or network failure
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
          <p>Your info has been saved.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-md text-black"
      >
        <h1 className="text-2xl font-bold mb-6">Lead Capture</h1>

        {status === "error" && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            name="company"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Source</label>
          <select name="source" className="w-full border p-2 rounded bg-white">
            <option value="">Select...</option>
            <option value="Google">Google</option>
            <option value="Referral">Referral</option>
            <option value="Social">Social</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            rows={3}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
