"use client";

import { useState } from "react";

const serviceOptions = [
  "Tank installation or relocation",
  "Routine maintenance and cleaning",
  "Parameter logging and health checks",
  "Equipment installation or upgrade",
  "Troubleshooting an existing issue",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

type BookingFormProps = {
  accessKey: string;
};

export default function BookingForm({ accessKey }: BookingFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isConfigured = Boolean(accessKey);

  const fieldClassName =
    "flat-field w-full px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:outline-none";

  const optionCardClassName =
    "flat-option flex items-start gap-3 px-3 py-2.5 text-sm text-muted transition-colors";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Form is not configured yet. Please try again later.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", accessKey);
    formData.append("subject", "New consultation request");
    formData.append("from_name", "West Coast Aquarium Services");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to submit the form. Please try again.");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold">Consultation request</h2>
        <p className="mt-2 text-sm text-muted">
          Share the details of your aquarium and we’ll follow up with
          availability and a tailored quote.
        </p>
      </div>

      {!isConfigured && (
        <div className="flat-alert bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Add your Web3Forms access key to{" "}
          <span className="font-semibold">form_access_key</span> in your{" "}
          <span className="font-semibold">.env</span> file to enable
          submissions. You can also use{" "}
          <span className="font-semibold">NEXT_PUBLIC_WEB3FORMS_KEY</span>.
        </div>
      )}

      {status === "success" && (
        <div
          aria-live="polite"
          className="flat-alert bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          Thanks for the details. We’ll be in touch shortly.
        </div>
      )}

      {status === "error" && (
        <div
          aria-live="polite"
          className="flat-alert bg-rose-50 px-4 py-3 text-sm text-rose-900"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Full name
          <input
            required
            name="name"
            className={fieldClassName}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Email
          <input
            required
            type="email"
            name="email"
            className={fieldClassName}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Phone
          <input
            required
            type="tel"
            name="phone"
            className={fieldClassName}
            placeholder="04xx xxx xxx"
            autoComplete="tel"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Suburb
          <input
            required
            name="suburb"
            className={fieldClassName}
            placeholder="Perth suburb"
            autoComplete="address-level2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Tank type
          <select
            name="tank_type"
            className={fieldClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select tank type
            </option>
            <option value="Freshwater">Freshwater</option>
            <option value="Marine">Marine</option>
            <option value="Reef">Reef</option>
            <option value="Not sure">Not sure</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          Approx volume (litres)
          <input
            name="tank_volume"
            className={fieldClassName}
            placeholder="e.g. 300"
            inputMode="numeric"
          />
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Service required</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option}
              className={optionCardClassName}
            >
              <input
                type="checkbox"
                name="services"
                value={option}
                className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="space-y-2 text-sm font-medium">
        Preferred days or times
        <input
          name="preferred_times"
          className={fieldClassName}
          placeholder="Weekday mornings, after 4pm, etc."
        />
      </label>

      <label className="space-y-2 text-sm font-medium">
        Message
        <textarea
          name="message"
          rows={4}
          className={fieldClassName}
          placeholder="Tell us about your tank, livestock, or any issues."
        />
      </label>

      <input type="checkbox" name="botcheck" className="hidden" />

      <button
        type="submit"
        disabled={!isConfigured || status === "submitting"}
        className="ocean-gradient inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Submit request"}
      </button>
    </form>
  );
}
