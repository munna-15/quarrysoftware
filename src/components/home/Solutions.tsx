"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Globe2, Code2, Bot, Workflow, Server, Network } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const solutions = [
  {
    title: "Web Development",
    description:
      "High-performance websites and web applications built around your customers and business goals.",
    icon: Globe2,
    image: "/images/quarry/web-development.png",
  },
  {
    title: "Custom Software",
    description:
      "Purpose-built business software that fits your operations instead of forcing you into rigid tools.",
    icon: Code2,
    image: "/images/quarry/custom-software.png",
  },
  {
    title: "AI Solutions",
    description:
      "Practical AI capabilities that improve how your business handles information and serves customers.",
    icon: Bot,
    image: "/images/quarry/ai-solutions.png",
  },
  {
    title: "Business Automation",
    description:
      "Connected workflows that reduce repetitive work and make everyday operations more efficient.",
    icon: Workflow,
    image: "/images/quarry/automation.png",
  },
  {
    title: "Cloud & Server Solutions",
    description:
      "Deployment, infrastructure and server management designed for dependable digital operations.",
    icon: Server,
    image: "/images/quarry/cloud-server.png",
  },
  {
    title: "System Integration",
    description:
      "Connect your applications and data so your business systems work together as one.",
    icon: Network,
    image: "/images/quarry/integration.png",
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>(
        "[data-solutions-eyebrow]",
      );

      const heading = section.querySelector<HTMLElement>(
        "[data-solutions-heading]",
      );

      const description = section.querySelector<HTMLElement>(
        "[data-solutions-description]",
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-solution-card]",
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

      // Heading starts subtly hidden without changing its layout.
      gsap.set([eyebrow, heading, description].filter(Boolean), {
        autoAlpha: 0,
        y: 14,
      });

      // Every card starts independently at a smaller scale.
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

      // Reveal cards one by one with a premium scale-up.
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
            force3D: false,
            clearProps: "opacity,visibility,transform",
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
      id="solutions"
      aria-labelledby="solutions-heading"
      className="overflow-hidden bg-[#06182d] text-white"
    >
      <div className="mx-auto w-full max-w-[1800px] px-5 py-20 sm:px-8 sm:py-24 md:px-[6vw] md:py-28">
        {/* Section heading */}
        <div className="w-full text-left">
          <div data-solutions-eyebrow>
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 sm:text-xs">
              <span className="h-px w-6 bg-white/50" />
              OUR SOLUTIONS
            </p>
          </div>

          <h2
            id="solutions-heading"
            data-solutions-heading
            className="mt-6 max-w-[1050px] text-left text-[clamp(2.5rem,5.5vw,5.3rem)] font-bold leading-[1.02] tracking-[-0.045em]"
          >
            The Right Technology
            <br />
            <span className="text-white/55">For What Comes Next.</span>
          </h2>

          <p
            data-solutions-description
            className="mt-5 max-w-[510px] text-left text-sm leading-6 text-white/65 sm:text-base sm:leading-7"
          >
            From customer-facing digital products to the systems behind your
            operations, we engineer solutions around your business.
          </p>
        </div>

        {/* Solution cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <article
                key={solution.title}
                data-solution-card
                className="
                  group relative min-w-0 rounded-2xl
                  border border-white/10
                  bg-white/[0.045]
                  p-6 sm:p-7 lg:p-8
                  shadow-[0_8px_24px_rgba(0,0,0,0.22)]
                  transition-[box-shadow,border-color,background-color]
                  duration-300 ease-out
                  hover:z-10 hover:border-white/20
                  hover:bg-white/[0.075]
                  hover:shadow-[0_22px_55px_rgba(0,0,0,0.4)]
                  motion-reduce:transition-none
                "
              >
                {/* Illustration */}
                <div className="mb-6 flex h-24 items-center">
                  {solution.image ? (
                    <Image
                      src={solution.image}
                      alt=""
                      aria-hidden="true"
                      width={112}
                      height={96}
                      className="
                        h-24 w-28 object-contain object-left
                        transition-transform duration-300
                        group-hover:scale-105
                        motion-reduce:transition-none
                        motion-reduce:group-hover:scale-100
                      "
                    />
                  ) : (
                    <Icon
                      size={36}
                      strokeWidth={1.3}
                      aria-hidden="true"
                      className="text-white/70 transition-colors duration-300 group-hover:text-white"
                    />
                  )}
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                  {solution.title}
                </h3>

                <p className="mt-3 max-w-[340px] text-sm leading-6 text-white/60">
                  {solution.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
