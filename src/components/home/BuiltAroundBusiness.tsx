
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Customer-facing experiences",
    description:
      "Websites and digital platforms that make your business easier to understand, access and engage with.",
  },
  {
    title: "Connected business systems",
    description:
      "Custom applications that bring your workflows, operational data and day-to-day activities together.",
  },
  {
    title: "Intelligent automation",
    description:
      "Practical integrations and automated workflows that reduce manual work across business operations.",
  },
];

export default function BuiltAroundBusiness() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelectorAll<HTMLElement>(
        "[data-what-heading]",
      );
      const visual = section.querySelectorAll<HTMLElement>(
        "[data-what-visual]",
      );
      const rows = gsap.utils.toArray<HTMLElement>(
        "[data-what-row]",
        section,
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([...heading, ...visual, ...rows], {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      gsap.set([...heading, ...visual, ...rows], {
        autoAlpha: 0,
        scale: 0.94,
        y: 20,
        transformOrigin: "center center",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .to(heading, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1,
        })
        .to(
          visual,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
          },
          "-=0.55",
        )
        .to(
          rows,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.2,
          },
          "-=0.35",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="what-quarry-heading"
      className="bg-[#f5f4ef] px-5 py-24 text-[#242424] sm:px-8 sm:py-28 lg:px-[7vw] lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-what-heading>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#77746d] sm:text-sm">
              What Quarry
            </p>

            <h2
              id="what-quarry-heading"
              className="max-w-xl text-[clamp(2.8rem,5.3vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.06em]"
            >
              We engineer the systems behind your business.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#62615c] sm:text-lg sm:leading-9">
              Quarry brings websites, business software and automation
              together to solve practical problems and support the way
              organisations operate.
            </p>
          </div>

          <div className="min-w-0">
            <div
              data-what-visual
              className="relative aspect-[16/9] overflow-hidden bg-[#e7e6e0]"
            >
              <Image
                src="/images/quarry/image-03.jpg"
                alt="Quarry digital engineering and connected business systems"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 sm:mt-10">
              {capabilities.map((capability) => (
                <article
                  key={capability.title}
                  data-what-row
                  className="grid gap-2 border-t border-[#242424]/20 py-6 sm:grid-cols-[0.8fr_1fr] sm:gap-8 sm:py-7"
                >
                  <h3 className="text-lg font-semibold leading-snug tracking-[-0.025em] sm:text-xl">
                    {capability.title}
                  </h3>

                  <p className="max-w-lg text-base leading-7 text-[#62615c] sm:text-[17px] sm:leading-8">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
