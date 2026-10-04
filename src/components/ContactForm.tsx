"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROJECT_OPTIONS, ROLE_OPTIONS } from "@/lib/site";

const base =
  "text-fluid-field w-full rounded-lg border border-line bg-white px-3 font-light text-charcoal shadow-[0_1px_1.5px_rgba(13,13,18,0.05),0_1px_1px_rgba(13,13,18,0.04)] outline-none placeholder:text-charcoal/50 focus:border-marine";
const field = `${base} py-[11px]`;
const label = "text-[16px] leading-8 font-normal text-charcoal";

type Status = "idle" | "sending" | "sent" | "error";

function Select({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        name={name}
        required
        defaultValue=""
        className={`${base} h-10 appearance-none pr-9 invalid:text-charcoal/50`}
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-charcoal">
            {o}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="#818898"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
      // Goes through the page-transition curtain when it is active (event is cancelled when handled).
      const handled = !window.dispatchEvent(
        new CustomEvent("azure:navigate", {
          detail: "/thank-you",
          cancelable: true,
        }),
      );
      if (!handled) router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 flex-col">
          <span className={label}>First Name</span>
          <input
            name="firstName"
            required
            placeholder="John"
            className={field}
          />
        </label>
        <label className="flex flex-1 flex-col">
          <span className={label}>Last Name</span>
          <input name="lastName" required placeholder="Doe" className={field} />
        </label>
      </div>
      <label className="flex flex-col">
        <span className={label}>Phone Number</span>
        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone Number"
          className={field}
        />
      </label>
      <label className="flex flex-col">
        <span className={label}>Email Address</span>
        <input
          name="email"
          type="email"
          required
          placeholder="johndoe@gmail.com"
          className={field}
        />
      </label>
      <label className="flex flex-col">
        <span className={label}>Select Project</span>
        <Select name="project" options={PROJECT_OPTIONS} />
      </label>
      <label className="flex flex-col">
        <span className={label}>What best describes you ?</span>
        <Select name="role" options={ROLE_OPTIONS} />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="text-fluid-small w-full rounded-full border border-marine bg-marine py-3 font-light text-white shadow-[0_1px_3px_rgba(13,13,18,0.05),0_1px_2px_rgba(13,13,18,0.04)] transition-colors hover:bg-white hover:text-marine disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {(status === "sent" || status === "error") && (
        <p
          role="status"
          className="text-center text-[14px] font-light text-charcoal"
        >
          {status === "sent"
            ? "Thank you, we will be in touch shortly."
            : "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
