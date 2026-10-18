"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  {
    title: "Disconnected systems",
    description:
      "Separate tools make information difficult to manage and business operations harder to coordinate.",
    solution: "Connected systems and unified workflows",
  },
  {
    title: "Repetitive manual work",
    description:
      "Routine tasks consume valuable time and slow down your team's day-to-day operations.",
    solution: "Automation built around your processes",
  },
  {
    title: "Digital products that fall short",
    description:
      "Outdated websites and limited software create friction for customers and internal teams.",
    solution: "Purpose-built websites and software",
  },
];

export default function Problems() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(elements, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            scale: 0.88,
            y: 16,
            transformOrigin: "center center",
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.15,
            delay: Number(element.dataset.delay ?? 0) / 1000,
            ease: "expo.out",
            force3D: true,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="problems-heading"
      className="relative overflow-hidden bg-[#f5f4ef] text-[#242424]"
    >
      <div/>

      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-[6vw] md:pb-24">
        {/* Heading */}
        <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end md:gap-10">
          <div data-reveal data-delay="0">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#77786f]">
              What we solve
            </p>

            <h2
              id="problems-heading"
              className="max-w-[620px] text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.055em]"
            >
              Business challenges.
              <br />
              <span className="text-[#77786f]">Engineered solutions.</span>
            </h2>
          </div>

          <p
            data-reveal
            data-delay="150"
            className="max-w-[490px] text-base leading-7 text-[#5f6059] md:justify-self-end md:text-lg md:leading-8"
          >
            We help businesses remove operational friction through better
            websites, connected systems and practical automation.
          </p>
        </div>

        {/* Organized problem / solution layout */}
        <div className="mt-10 border-t border-[#242424]/25 sm:mt-12">
          {challenges.map((challenge, index) => (
            <article
              key={challenge.title}
              data-reveal
              data-delay={index * 150}
              className="grid gap-4 border-b border-[#242424]/20 py-6 sm:py-7 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 lg:gap-20"
            >
              <h3 className="max-w-[480px] text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-tight tracking-[-0.04em]">
                {challenge.title}
              </h3>

              <div className="grid gap-3 sm:grid-cols-[1fr_0.9fr] sm:gap-6">
                <p className="text-[15px] leading-7 text-[#65665f] sm:text-base">
                  {challenge.description}
                </p>

                <p className="border-l-2 border-[#091c32] pl-4 text-[15px] font-semibold leading-7 text-[#30352f] sm:text-base">
                  {challenge.solution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
