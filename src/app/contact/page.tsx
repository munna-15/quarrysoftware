"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Web Development",
  "Custom Software",
  "AI Solutions",
  "Business Automation",
  "Cloud & Server Solutions",
  "System Integration",
  "Not Sure Yet",
] as const;

const budgets = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not Decided",
] as const;

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type ApiResponse = {
  success?: boolean;
  saved?: boolean;
  emailSent?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

const inputClass =
  "mt-2.5 w-full rounded-xl border border-[#dedfe4] bg-white px-4 py-3.5 text-[14px] text-[#20232b] outline-none transition duration-200 placeholder:text-[#9699a3] focus:border-[#263b68] focus:ring-4 focus:ring-[#263b68]/[0.08] disabled:cursor-not-allowed disabled:bg-[#f4f5f7]";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  } else if (values.name.trim().length > 100) {
    errors.name = "Name must be under 100 characters.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.trim().length > 254
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (values.company.trim().length > 120) {
    errors.company = "Company name is too long.";
  }

  if (!(services as readonly string[]).includes(values.service)) {
    errors.service = "Please select a service.";
  }

  if (
    values.budget &&
    !(budgets as readonly string[]).includes(values.budget)
  ) {
    errors.budget = "Please select a valid budget range.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Please share a little more about your project.";
  } else if (values.message.trim().length > 5000) {
    errors.message = "Project details must be under 5,000 characters.";
  }

  return errors;
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <p className="mt-1.5 text-xs text-red-600" role="alert">
      {children}
    </p>
  );
}

function ScrollTriggerReveal(root: HTMLElement) {
  const elements = root.querySelectorAll<HTMLElement>(
    "[data-reveal]:not([data-hero-reveal])",
  );

  elements.forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
    });
  });
}

export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
useEffect(() => {
  const root = pageRef.current;
  if (!root) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const ctx = gsap.context(() => {
    if (reducedMotion) {
      gsap.set("[data-reveal]", {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    gsap.set("[data-reveal]", {
      autoAlpha: 0,
      y: 22,
      scale: 0.985,
    });

    gsap.to("[data-hero-reveal]", {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.13,
      ease: "power3.out",
      delay: 0.12,
    });

    const elements = root.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-hero-reveal])",
    );

    elements.forEach((element) => {
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    });
  }, root);

  return () => {
    ctx.revert();
  };
}, []);


  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = validate(values);

    setErrors(nextErrors);
    setStatus("idle");
    setStatusMessage("");

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];

      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
        }),
      });

      let result: ApiResponse;

      try {
        result = (await response.json()) as ApiResponse;
      } catch {
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok || !result.success) {
        if (result.errors) {
          const serverErrors: FormErrors = {};

          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages?.[0] && key in initialValues) {
              serverErrors[key as keyof FormValues] = messages[0];
            }
          }

          setErrors(serverErrors);
        }

        setStatus("error");
        setStatusMessage(
          result.message || "Something went wrong. Please try again.",
        );

        return;
      }

      setStatus("success");
      setStatusMessage(
        result.message || "Your inquiry has been received successfully.",
      );

      setValues(initialValues);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage(
        "We couldn't connect to the contact service. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#f7f7f5] text-[#20232b]">
      {/* Hero */}
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-[#111b31] py-24 sm:min-h-[490px] sm:py-28">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/quarry/image-01.jpg')",
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 -z-10 bg-[#111b31]/85" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#111b31]/20 via-[#111b31]/50 to-[#111b31]" />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div
              data-reveal
              data-hero-reveal
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#aab9d7]" />
              Contact Quarry
            </div>

            <h1
              data-reveal
              data-hero-reveal
              className="text-balance text-4xl font-bold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[68px]"
            >
              Let&apos;s talk about
              <span className="mt-1 block text-white/65">
                what you&apos;re building.
              </span>
            </h1>

            <p
              data-reveal
              data-hero-reveal
              className="mx-auto mt-6 max-w-xl text-sm leading-7 font-medium text-white/65 sm:text-base sm:leading-8"
            >
              Tell us about your project, the challenges you&apos;re solving,
              and where you want to go. We&apos;ll help you work out the next
              step.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
      </section>

      {/* Main content */}
      <section className="relative px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 xl:gap-24">
          {/* Contact information */}
          <aside className="lg:sticky lg:top-28">
            <div data-reveal className="max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#666b77]">
                Start a conversation
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-[#20232b] sm:text-4xl">
                Good work starts with a clear conversation.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#696d77] sm:text-base sm:leading-8">
                Whether you need a new digital product, a better business
                system, or help connecting the tools you already use, tell us
                what you have in mind.
              </p>
            </div>

            <div className="mt-9 space-y-3 sm:mt-11">
              <a
                data-reveal
                href="mailto:quarrysoftware@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-[#e6e6e2] bg-white p-4 transition duration-300 hover:border-[#c6ccda] hover:shadow-[0_12px_35px_rgba(25,35,55,0.05)] sm:p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef0f5] text-[#293b60]">
                  <Mail size={20} strokeWidth={1.7} />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm text-[#777b85]">
                    Email us directly
                  </span>
                  <span className="mt-1 block break-all text-sm font-semibold text-[#252833]">
                    quarrysoftware@gmail.com
                  </span>
                </span>
              </a>

              <div
                data-reveal
                className="flex items-center gap-4 rounded-2xl border border-[#e6e6e2] bg-white p-4 sm:p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef0f5] text-[#293b60]">
                  <MessageSquareText size={20} strokeWidth={1.7} />
                </span>

                <span>
                  <span className="block text-sm text-[#777b85]">
                    What to expect
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#252833]">
                    A conversation about your project
                  </span>
                </span>
              </div>

              <div
                data-reveal
                className="flex items-center gap-4 rounded-2xl border border-[#e6e6e2] bg-white p-4 sm:p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef0f5] text-[#293b60]">
                  <ShieldCheck size={20} strokeWidth={1.7} />
                </span>

                <span>
                  <span className="block text-sm text-[#777b85]">
                    Your information
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#252833]">
                    Used to review your inquiry
                  </span>
                </span>
              </div>
            </div>

            <div
              data-reveal
              className="mt-8 flex items-start gap-3 border-t border-[#e1e2df] pt-6"
            >
              <Clock3
                size={18}
                className="mt-0.5 shrink-0 text-[#626b7c]"
                strokeWidth={1.7}
              />

              <p className="text-xs leading-6 text-[#777b85]">
                Share as much detail as you can. Clear project information helps
                us understand what you need before we respond.
              </p>
            </div>
          </aside>

          {/* Form card */}
          <div
            data-reveal
            className="rounded-[24px] border border-[#e7e7e3] bg-white p-5 shadow-[0_22px_75px_rgba(24,31,46,0.055)] sm:rounded-[28px] sm:p-8 md:p-10 lg:p-11"
          >
            <div className="mb-8 border-b border-[#ecece8] pb-7 sm:mb-9 sm:pb-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0f5] text-[#293b60]">
                  <Sparkles size={19} strokeWidth={1.7} />
                </span>

                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#20232b] sm:text-2xl">
                    Tell us about your project
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-[#777b85] sm:text-sm">
                    Fields marked with * are required.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div
                aria-hidden="true"
                className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[#30333c]"
                  >
                    Full name <span className="text-[#626b7c]">*</span>
                  </label>

                  <input
                    className={inputClass}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    maxLength={100}
                    value={values.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={isSubmitting}
                    required
                  />

                  <div id="name-error">
                    <FieldError>{errors.name}</FieldError>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#30333c]"
                  >
                    Work email <span className="text-[#626b7c]">*</span>
                  </label>

                  <input
                    className={inputClass}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    maxLength={254}
                    value={values.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isSubmitting}
                    required
                  />

                  <div id="email-error">
                    <FieldError>{errors.email}</FieldError>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-[#30333c]"
                  >
                    Company <span className="text-[#9396a0]">(optional)</span>
                  </label>

                  <input
                    className={inputClass}
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or business name"
                    maxLength={120}
                    value={values.company}
                    onChange={(event) =>
                      updateField("company", event.target.value)
                    }
                    aria-invalid={Boolean(errors.company)}
                    disabled={isSubmitting}
                  />

                  <FieldError>{errors.company}</FieldError>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="text-sm font-medium text-[#30333c]"
                  >
                    Service needed <span className="text-[#626b7c]">*</span>
                  </label>

                  <select
                    className={`${inputClass} appearance-none`}
                    id="service"
                    name="service"
                    value={values.service}
                    onChange={(event) =>
                      updateField("service", event.target.value)
                    }
                    aria-invalid={Boolean(errors.service)}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select a service</option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  <FieldError>{errors.service}</FieldError>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="budget"
                    className="text-sm font-medium text-[#30333c]"
                  >
                    Estimated budget{" "}
                    <span className="text-[#9396a0]">(optional)</span>
                  </label>

                  <select
                    className={`${inputClass} appearance-none`}
                    id="budget"
                    name="budget"
                    value={values.budget}
                    onChange={(event) =>
                      updateField("budget", event.target.value)
                    }
                    aria-invalid={Boolean(errors.budget)}
                    disabled={isSubmitting}
                  >
                    <option value="">Choose a budget range</option>

                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>

                  <FieldError>{errors.budget}</FieldError>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-end justify-between gap-3">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-[#30333c]"
                    >
                      Project details <span className="text-[#626b7c]">*</span>
                    </label>

                    <span className="text-[11px] tabular-nums text-[#898c95]">
                      {values.message.length}/5000
                    </span>
                  </div>

                  <textarea
                    className={`${inputClass} min-h-[150px] resize-y leading-6 sm:min-h-[175px]`}
                    id="message"
                    name="message"
                    placeholder="What are you building? What problem should it solve? Share any requirements or timelines you already have in mind."
                    minLength={20}
                    maxLength={5000}
                    rows={5}
                    value={values.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    disabled={isSubmitting}
                    required
                  />

                  <div id="message-error">
                    <FieldError>{errors.message}</FieldError>
                  </div>
                </div>
              </div>

              {status !== "idle" && (
                <div
                  role={status === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`mt-6 flex items-start gap-3 rounded-xl border p-4 ${
                    status === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                  ) : (
                    <MessageSquareText size={20} className="mt-0.5 shrink-0" />
                  )}

                  <p className="text-sm leading-6">{statusMessage}</p>
                </div>
              )}

              <div className="mt-7 sm:mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#18243d] px-6 py-4 transition duration-300 hover:bg-[#263858] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#263858]/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                      <span className="!text-white text-sm font-semibold opacity-100">
                        Sending your inquiry...
                      </span>
                    </>
                  ) : (
                    <span className="!text-white text-sm font-semibold opacity-100">
                      Submit project inquiry
                    </span>
                  )}
                </button>

                <p className="mt-4 flex items-start justify-center gap-2 text-center text-[11px] leading-5 text-[#81848d] sm:text-xs">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0"
                    strokeWidth={1.8}
                  />
                  Your project details are submitted securely for review.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="bg-[#111b31] px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div
          data-reveal
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
              Prefer email?
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-white sm:text-3xl">
              Start the conversation your way.
            </h2>
          </div>

          <Link
            href="mailto:quarrysoftware@gmail.com"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold !text-white opacity-100 transition-colors duration-300 hover:border-white/50 hover:bg-white/10"
          >
            <Globe2
              size={17}
              strokeWidth={1.7}
              className="shrink-0 !text-white"
            />
            <span className="!text-white opacity-100">
              Email Quarry Software
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
