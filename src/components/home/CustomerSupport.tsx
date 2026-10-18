"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const supportItems = [
  {
    image: "/images/quarry/support/support.png",
    alt: "Customer support and assistance",
    title: "Ongoing Support",
    description:
      "Get help with questions and issues as you continue using your solution.",
  },
  {
    image: "/images/quarry/support/maintenance.png",
    alt: "Software maintenance and technical care",
    title: "Maintenance & Updates",
    description:
      "Keep your software maintained and ready for changing business needs.",
  },
  {
    image: "/images/quarry/support/communication.png",
    alt: "Ongoing project communication",
    title: "Clear Communication",
    description:
      "Stay informed about updates, improvements and ongoing technical work.",
  },
];

export default function CustomerSupport() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelectorAll<HTMLElement>(
        "[data-support-heading]",
      );

      const stars = section.querySelectorAll<HTMLElement>(
        "[data-support-stars]",
      );

      const content = section.querySelectorAll<HTMLElement>(
        "[data-support-content]",
      );

      const items = gsap.utils.toArray<HTMLElement>(
        "[data-support-item]",
        section,
      );

      const animatedElements = [...heading, ...stars, ...content, ...items];

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(animatedElements, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      gsap.set(animatedElements, {
        autoAlpha: 0,
        scale: 0.9,
        y: 18,
        transformOrigin: "center center",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
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
          duration: 0.9,
        })
        .to(
          stars,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.4",
        )
        .to(
          content,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.15",
        )
        .to(
          items,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "back.out(1.15)",
          },
          "-=0.35",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="customer-support-heading"
      className="relative overflow-hidden bg-[#f5f4ef] px-5 pb-20 pt-36 text-[#242424] sm:px-8 sm:pb-24 sm:pt-40 lg:px-[7vw] lg:pb-28 lg:pt-44"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mx-auto max-w-4xl text-center">
          <p
            data-support-heading
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#77746d] sm:text-sm"
          >
            Customer Support
          </p>

          <h2
            id="customer-support-heading"
            data-support-heading
            className="text-[clamp(2.6rem,5.5vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#20252b]"
          >
            Support beyond delivery.
          </h2>

          <div
            data-support-stars
            className="mt-6 flex items-center justify-center gap-2"
            role="img"
            aria-label="Five decorative gold stars"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                viewBox="0 0 24 24"
                className="h-6 w-6 drop-shadow-[0_1px_1px_rgba(115,78,15,0.2)] sm:h-7 sm:w-7"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id={`support-gold-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFF0A6" />
                    <stop offset="28%" stopColor="#E8C766" />
                    <stop offset="62%" stopColor="#C69A32" />
                    <stop offset="100%" stopColor="#94691C" />
                  </linearGradient>
                </defs>

                <path
                  d="m12 2.8 2.8 5.67 6.26.91-4.53 4.42 1.07 6.24L12 17.09l-5.6 2.95 1.07-6.24-4.53-4.42 6.26-.91L12 2.8Z"
                  fill={`url(#support-gold-${index})`}
                  stroke="#B38729"
                  strokeWidth="0.45"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>

          <p
            data-support-content
            className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#62615c] sm:mt-7 sm:text-lg sm:leading-8"
          >
            Launching your software is only part of the journey. We help you
            maintain, improve and support your digital solutions as your
            business continues to grow.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-[1040px] grid-cols-3 items-start gap-3 sm:mt-16 sm:gap-8 lg:mt-20 lg:gap-14">
          {supportItems.map((item) => (
            <article
              key={item.title}
              data-support-item
              className="min-w-0 text-center"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[112px] sm:max-w-[150px] lg:max-w-[175px]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 30vw, (max-width: 1023px) 150px, 175px"
                  className="object-contain"
                />
              </div>

              <h3 className="mt-3 text-sm font-semibold leading-snug tracking-[-0.02em] text-[#252a30] sm:mt-5 sm:text-lg lg:text-xl">
                {item.title}
              </h3>

              <p className="mx-auto mt-2 hidden max-w-[280px] text-sm leading-6 text-[#68665f] sm:block sm:text-[15px] sm:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-[1040px] grid-cols-3 gap-3 sm:hidden">
          {supportItems.map((item) => (
            <p
              key={item.title}
              className="text-center text-xs leading-5 text-[#68665f]"
            >
              {item.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
