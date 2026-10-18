"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { MessagesSquare, DraftingCompass, Code2, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const processSteps = [
  {
    title: "Discovery",
    description:
      "We learn about your business, understand the challenges, and define what success should look like.",
    detail: "Understand the problem",
    icon: MessagesSquare,
    image: "/images/quarry/discovery.png",
  },
  {
    title: "Strategy & Design",
    description:
      "We shape the right solution, map the experience, and plan a clear direction before development begins.",
    detail: "Plan the right solution",
    icon: DraftingCompass,
    image: "/images/quarry/strategy.png",
  },
  {
    title: "Engineering",
    description:
      "We build, test, and refine reliable digital products around your requirements and real workflows.",
    detail: "Build with purpose",
    icon: Code2,
    image: "/images/quarry/engineering.png",
  },
  {
    title: "Launch & Support",
    description:
      "We deploy the solution, help ensure everything works as expected, and support future improvements.",
    detail: "Deliver and evolve",
    icon: Rocket,
    image: "/images/quarry/launch.png",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>(
        "[data-process-eyebrow]",
      );

      const heading = section.querySelector<HTMLElement>(
        "[data-process-heading]",
      );

      const description = section.querySelector<HTMLElement>(
        "[data-process-description]",
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-process-card]",
        section,
      );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [eyebrow, heading, description, ...cards].filter(
            (element): element is HTMLElement => element !== null,
          ),
          {
            autoAlpha: 1,
            clearProps: "all",
          },
        );

        return;
      }

      // Reveal the heading without scaling the entire section.
      gsap.set([eyebrow, heading, description].filter(Boolean), {
        autoAlpha: 0,
        y: 14,
      });

      // Each process card starts small and becomes full-size individually.
      gsap.set(cards, {
        autoAlpha: 0,
        scale: 0.82,
        y: 22,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      if (eyebrow) {
        timeline.to(
          eyebrow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            clearProps: "transform",
          },
          0,
        );
      }

      if (heading) {
        timeline.to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            clearProps: "transform",
          },
          0.12,
        );
      }

      if (description) {
        timeline.to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            clearProps: "transform",
          },
          0.28,
        );
      }

      // Stagger each card for the same cascading reveal as Solutions.

      const cardStart = 0.48;
      const cardDuration = 1.05;
      const cardDelay = 0.3;

      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: cardDuration,
            ease: "power3.out",
            force3D: true,
            onComplete: () => {
              gsap.set(card, {
                clearProps: "transform,opacity,visibility",
              });
            },
          },
          cardStart + index * cardDelay,
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => timeline.play(),
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="overflow-hidden bg-[#f5f3ee] text-[#242424]"
    >
      <div className="mx-auto max-w-[1800px] px-5 py-16 sm:px-8 sm:py-20 md:px-[6vw] md:py-24">
        {/* Left-aligned section heading */}
        <div className="w-full text-left">
          <div data-process-eyebrow>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#77746c] sm:text-xs">
              <span className="h-px w-6 bg-[#77746c]" />
              HOW WE WORK
            </p>
          </div>

          <h2
            id="process-heading"
            data-process-heading
            className="mt-6 max-w-[1050px] text-left text-[clamp(2.5rem,5.5vw,5.3rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#242424]"
          >
            From a business challenge
            <br />
            <span className="text-[#858178]">to a working solution.</span>
          </h2>

          <p
            data-process-description
            className="mt-5 max-w-[510px] text-left text-sm leading-6 text-[#68665f] sm:text-base sm:leading-7"
          >
            A clear, collaborative process that turns business requirements into
            dependable digital solutions.
          </p>
        </div>

        {/* Process cards */}
        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                data-process-card
                className="
                  group flex min-w-0 flex-col items-center
                  rounded-2xl border border-[#242424]/[0.09]
                  bg-white p-6 text-center sm:p-7
                  shadow-[0_8px_25px_rgba(36,36,36,0.07)]
                  transition-[box-shadow,border-color]
                  duration-300 ease-out
                  hover:z-10
                  hover:border-[#242424]/[0.16]
                  hover:shadow-[0_20px_42px_rgba(36,36,36,0.13)]
                  motion-reduce:transition-none
                "
              >
                {/* Step illustration */}
                <div className="mb-6 flex h-14 w-full items-center justify-center">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt=""
                      aria-hidden="true"
                      width={84}
                      height={84}
                      className="h-[84px] w-[84px] object-contain"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#242424]/[0.08] bg-[#f5f3ee]">
                      <Icon
                        size={30}
                        strokeWidth={1.4}
                        aria-hidden="true"
                        className="text-[#343b42]"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#242424] sm:text-[22px]">
                  {step.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[#68665f]">
                  {step.description}
                </p>

                <div className="mt-6 w-full border-t border-[#242424]/[0.09] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#858178]">
                    {step.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
