"use client";

import { useEffect, useRef } from "react";

const principles = [
  {
    number: "01",
    title: "Understand the business",
    description:
      "We start with your goals, workflows and operational challenges—not assumptions about which technology you need.",
  },
  {
    number: "02",
    title: "Engineer the right solution",
    description:
      "We shape the architecture, experience and integrations around the problem, keeping the solution practical and scalable.",
  },
  {
    number: "03",
    title: "Build for real-world use",
    description:
      "We focus on reliability, usability and maintainability so the result works beyond the initial launch.",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll("[data-approach-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.animate(
            [
              { opacity: 0, transform: "translateY(28px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 850,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "both",
            },
          );

          observer.unobserve(element);
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f3ee] text-[#242424]"
      aria-labelledby="approach-heading"
    >
      <div className="mx-auto max-w-[1800px] px-[22px] py-24 sm:py-28 md:px-[6vw] md:py-36">
        {/* Section introduction */}
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
          <div data-approach-reveal>
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#686860] sm:text-xs">
              <span className="h-px w-7 bg-[#85857b]" />A DIFFERENT WAY TO BUILD
            </p>
          </div>

          <div data-approach-reveal>
            <h2
              id="approach-heading"
              className="max-w-[850px] text-[clamp(2.5rem,5.3vw,5.4rem)] font-medium leading-[1.04] tracking-[-0.065em]"
            >
              Technology matters.
              <br />
              <span className="text-[#85857b]">
                The thinking behind it matters more.
              </span>
            </h2>

            <p className="mt-7 max-w-[520px] text-sm leading-7 text-[#686860] sm:mt-9 sm:text-base sm:leading-8">
              Every business has different challenges. We bring business
              understanding and software engineering together to build digital
              solutions that serve a clear purpose.
            </p>
          </div>
        </div>

        {/* Engineering principles */}
        <div className="mt-20 border-t border-[#242424]/20 sm:mt-28 md:mt-36">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              data-approach-reveal
              className="group grid gap-4 border-b border-[#242424]/20 py-8 sm:py-10 md:grid-cols-[70px_1fr_1fr] md:items-start md:gap-8 lg:gap-16 lg:py-12"
            >
              <span className="pt-1 text-[11px] tracking-[0.12em] text-[#85857b]">
                {principle.number}
              </span>

              <h3 className="max-w-[420px] text-2xl font-medium leading-tight tracking-[-0.045em] transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-3xl lg:text-[2.5rem]">
                {principle.title}
              </h3>

              <p className="max-w-[440px] text-sm leading-7 text-[#686860] md:justify-self-end md:pt-1 sm:text-base sm:leading-8">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div
          data-approach-reveal
          className="mt-10 flex flex-col gap-3 sm:mt-14 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-[580px] text-sm leading-7 text-[#686860] sm:text-base sm:leading-8">
            No unnecessary complexity. No technology for technology’s sake. Just
            thoughtful engineering built around what matters.
          </p>

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#686860]">
            Purpose first. Engineering always.
          </span>
        </div>
      </div>
    </section>
  );
}
