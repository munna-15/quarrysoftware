"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Built around your requirements",
    description:
      "We start by understanding how your business operates, then build a solution around your actual needs and goals.",
    image: "/images/quarry/why/requirements.png",
    alt: "Business requirements and solution planning",
  },
  {
    title: "Engineered for everyday use",
    description:
      "We build practical, maintainable software with clear workflows that your team can use confidently every day.",
    image: "/images/quarry/why/engineering.png",
    alt: "Software engineering and system development",
  },
  {
    title: "A clear, collaborative process",
    description:
      "You stay involved throughout the project, with transparent communication, clear decisions and visible progress.",
    image: "/images/quarry/why/collaboration.png",
    alt: "Collaboration and project communication",
  },
];

export default function WhyQuarry() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading =
        section.querySelectorAll<HTMLElement>("[data-why-heading]");

      const cards = gsap.utils.toArray<HTMLElement>("[data-why-card]", section);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const animatedElements = [...heading, ...cards];

      if (prefersReducedMotion) {
        gsap.set(animatedElements, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      gsap.set(heading, {
        autoAlpha: 0,
        scale: 0.96,
        y: 18,
        transformOrigin: "center center",
      });

      gsap.set(cards, {
        autoAlpha: 0,
        scale: 0.88,
        y: 28,
        transformOrigin: "center center",
      });

      const reveal = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      reveal
        .to(heading, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.05,
        })
        .to(
          cards,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.32,
            ease: "back.out(1.15)",
          },
          "-=0.2",
        );

      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => reveal.play(),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f5f4ef]">
      <div
        aria-labelledby="why-quarry-heading"
        className="relative isolate overflow-hidden bg-[#091c32] px-5 py-28 text-[#f5f4ef] sm:px-8 sm:py-32 lg:px-[7vw] lg:py-36"
        style={{
          clipPath: "polygon(0 0, 100% 3.5%, 100% 100%, 0 96.5%)",
        }}
      >
        <div className="mx-auto max-w-[1440px] py-5 sm:py-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div data-why-heading className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/65 sm:text-sm">
                Why Quarry
              </p>

              <h2
                id="why-quarry-heading"
                className="max-w-2xl text-[clamp(2.7rem,5.2vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.055em] text-white"
              >
                Software built around your business.
              </h2>

              <p className="mt-7 max-w-lg text-base leading-8 text-white/75 sm:text-lg sm:leading-9">
                The best solution starts with understanding the problem. We
                combine practical thinking, solid engineering and clear
                collaboration to build software that works for your business.
              </p>
            </div>

            <div className="min-w-0">
              {principles.map((principle) => (
                <article
                  key={principle.title}
                  data-why-card
                  className="grid grid-cols-[minmax(0,1fr)_100px] items-center gap-5 border-t border-white/20 py-8 sm:grid-cols-[minmax(0,1fr)_145px] sm:gap-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_170px] lg:gap-10 lg:py-11"
                >
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-white sm:text-2xl">
                      {principle.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-base leading-7 text-white/70 sm:text-[17px] sm:leading-8">
                      {principle.description}
                    </p>
                  </div>

                  <div className="relative aspect-square w-full">
                    <Image
                      src={principle.image}
                      alt={principle.alt}
                      fill
                      sizes="(max-width: 640px) 100px, (max-width: 1024px) 145px, 170px"
                      className="object-contain"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
