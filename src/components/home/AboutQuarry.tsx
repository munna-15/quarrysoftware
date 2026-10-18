"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutQuarry() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-grow]");

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(elements, { scale: 1, autoAlpha: 1 });
        return;
      }

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            scale: 0.88,
            autoAlpha: 0,
            transformOrigin: "center center",
          },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
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
      aria-labelledby="about-quarry-heading"
      className="relative overflow-hidden bg-[#191917] py-24 text-[#F3F0E8] sm:py-32 lg:py-40"
    >
      <div className="page-gutter">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div data-grow className="origin-center">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B7A58A]" />

              <p className="text-[10px] font-medium tracking-[0.22em] text-[#B7A58A] sm:text-xs">
                THE QUARRY APPROACH
              </p>
            </div>

            <p className="max-w-[280px] text-sm leading-7 text-[#AAA79F] sm:text-base sm:leading-8">
              Technology should make business clearer, not more complicated.
            </p>
          </div>

          <div data-grow className="origin-center">
            <h2
              id="about-quarry-heading"
              className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.07em]"
            >
              We start with
              <br />
              the problem.
              <br />
              <span className="text-[#96938B]">Not the technology.</span>
            </h2>

            <div className="mt-9 max-w-[560px] space-y-5 text-sm leading-7 text-[#AAA79F] sm:mt-12 sm:text-base sm:leading-8">
              <p>
                Every business has its own challenges, constraints, and
                ambitions. The right solution begins by understanding them—not
                by forcing a technology into the picture.
              </p>

              <p>
                At Quarry, we bring design, software engineering, and automation
                together to build digital solutions around real operational
                needs.
              </p>
            </div>

            <div className="mt-10 border-t border-white/15 pt-6 sm:mt-14 sm:pt-8">
              <p className="text-xs font-medium tracking-[0.16em] text-[#F3F0E8] sm:text-sm">
                CLARITY IN THINKING. PRECISION IN ENGINEERING.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
