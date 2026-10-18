"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomerSupport from "@/components/home/CustomerSupport";

const NAV_HEIGHT = 88;

const capabilities = [
  {
    number: "01",
    title: "AI-Powered Business Tools",
    description:
      "Turn business data into useful insights with AI-powered tools designed around your team's daily decisions and operations.",
    image: "/images/quarry/services/ai-automation/ai-business-tools.png",
    alt: "AI-powered business tools visualization",
  },
  {
    number: "02",
    title: "Workflow Automation",
    description:
      "Connect repetitive tasks, approvals and business processes to reduce manual work and keep operations moving consistently.",
    image: "/images/quarry/services/ai-automation/workflow-automation.png",
    alt: "Connected workflow automation visualization",
  },
  {
    number: "03",
    title: "AI Chatbots & Assistants",
    description:
      "Create intelligent assistants that help answer questions, organize requests and support customers or internal teams.",
    image: "/images/quarry/services/ai-automation/ai-assistants.png",
    alt: "AI assistant and chatbot interface visualization",
  },
  {
    number: "04",
    title: "Data Processing Automation",
    description:
      "Streamline document handling, information extraction and routine data processing with structured automated workflows.",
    image: "/images/quarry/services/ai-automation/data-processing.png",
    alt: "Automated data processing visualization",
  },
];

const engineering = [
  {
    title: "AI & API Integration",
    description:
      "Connect AI models and external APIs with your existing software, business platforms and data sources.",
    image: "/images/quarry/services/ai-automation/ai-integration.png",
    alt: "AI model and API integration visualization",
  },
  {
    title: "Workflow Design",
    description:
      "Build connected automation flows with clear triggers, business rules and practical exception handling.",
    image: "/images/quarry/services/ai-automation/workflow-design.png",
    alt: "Business workflow design visualization",
  },
  {
    title: "Monitoring & Reliability",
    description:
      "Keep automated processes dependable through validation, error handling and ongoing technical improvements.",
    image: "/images/quarry/services/ai-automation/monitoring-reliability.png",
    alt: "Automation monitoring and reliability visualization",
  },
];

function TechnicalImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div data-image-reveal className={`relative overflow-hidden ${className}`}>
      <div data-image-inner className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function AIAutomationPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motion.matches) return;

    const ctx = gsap.context(() => {
      const heroItems = root.querySelectorAll<HTMLElement>(".hero-content");

      gsap.fromTo(
        heroItems,
        {
          autoAlpha: 0,
          y: 22,
          scale: 0.96,
          transformOrigin: "left center",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.14,
          delay: 0.22,
          ease: "power3.out",
          clearProps: "transform",
        },
      );

      root
        .querySelectorAll<HTMLElement>("[data-section-heading]")
        .forEach((heading) => {
          gsap.fromTo(
            heading,
            {
              autoAlpha: 0,
              y: 24,
              scale: 0.96,
              transformOrigin: "left top",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: heading,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

      root
        .querySelectorAll<HTMLElement>("[data-capability]")
        .forEach((card) => {
          const copy = card.querySelector<HTMLElement>("[data-copy-reveal]");
          const image = card.querySelector<HTMLElement>("[data-image-reveal]");
          const imageInner =
            card.querySelector<HTMLElement>("[data-image-inner]");

          const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.out" },
          });

          if (copy) {
            timeline.fromTo(
              copy,
              {
                autoAlpha: 0,
                y: 24,
                scale: 0.95,
                transformOrigin: "left center",
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                clearProps: "transform",
              },
              0,
            );
          }

          if (image) {
            timeline.fromTo(
              image,
              { clipPath: "inset(0 0 100% 0 round 3px)" },
              {
                clipPath: "inset(0 0 0% 0 round 3px)",
                duration: 0.9,
              },
              0.12,
            );
          }

          if (imageInner) {
            timeline.fromTo(
              imageInner,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.05,
                ease: "power2.out",
              },
              0.12,
            );
          }

          ScrollTrigger.create({
            trigger: card,
            start: "top 82%",
            once: true,
            onEnter: () => timeline.play(),
          });
        });

      root
        .querySelectorAll<HTMLElement>("[data-engineering]")
        .forEach((card) => {
          const copy = card.querySelector<HTMLElement>("[data-copy-reveal]");
          const image = card.querySelector<HTMLElement>("[data-image-reveal]");
          const imageInner =
            card.querySelector<HTMLElement>("[data-image-inner]");

          const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.out" },
          });

          if (image) {
            timeline.fromTo(
              image,
              { clipPath: "inset(0 0 100% 0 round 3px)" },
              {
                clipPath: "inset(0 0 0% 0 round 3px)",
                duration: 0.85,
              },
              0,
            );
          }

          if (imageInner) {
            timeline.fromTo(
              imageInner,
              { scale: 1.07 },
              { scale: 1, duration: 1, ease: "power2.out" },
              0,
            );
          }

          if (copy) {
            timeline.fromTo(
              copy,
              {
                autoAlpha: 0,
                y: 20,
                scale: 0.96,
                transformOrigin: "left center",
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.75,
                clearProps: "transform",
              },
              0.16,
            );
          }

          ScrollTrigger.create({
            trigger: card,
            start: "top 84%",
            once: true,
            onEnter: () => timeline.play(),
          });
        });

      const contact = root.querySelector<HTMLElement>("[data-contact-reveal]");

      if (contact) {
        gsap.fromTo(
          contact,
          { autoAlpha: 0, y: 24, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: contact,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-white text-[#202832]"
      style={
        {
          "--quarry-nav-height": `${NAV_HEIGHT}px`,
        } as React.CSSProperties
      }
    >
      {/* HERO */}
      <section
        className="relative flex min-h-[390px] items-center overflow-hidden bg-[#091A2B] pb-12"
        style={{
          paddingTop: "calc(var(--quarry-nav-height) + 30px)",
        }}
      >
        <Image
          src="/images/quarry/image-01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#061322]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071523]/85 via-[#071523]/45 to-[#071523]/10" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
          <div className="max-w-3xl">
            <p className="hero-content text-xs font-semibold uppercase tracking-[0.19em] text-white/70 sm:text-[13px]">
              Digital Solutions <span className="mx-2 text-white/35">/</span> AI
              & Automation
            </p>

            <h1 className="hero-content mt-5 text-[36px] font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[52px]">
              AI & Automation
            </h1>

            <p className="hero-content mt-5 max-w-2xl text-[16px] leading-8 text-white/80 sm:text-[18px] sm:leading-9">
              Smarter business operations powered by practical AI solutions and
              connected automation built around the way your team works.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full bg-white/20"
        />
      </section>

      {/* WHAT WE AUTOMATE */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div data-section-heading className="mb-10 max-w-3xl sm:mb-14 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#697582] sm:text-[13px]">
            What We Automate
          </p>

          <h2 className="mt-4 text-[30px] font-bold leading-[1.18] tracking-[-0.035em] text-[#202832] sm:text-[36px] lg:text-[42px]">
            Less repetitive work. More meaningful progress.
          </h2>

          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#56616D] sm:text-[17px]">
            We identify where AI and automation can make a practical difference,
            then build solutions that fit your existing operations and business
            goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {capabilities.map((item, index) => (
            <article
              key={item.number}
              data-capability
              className={[
                "group grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(120px,0.82fr)] items-center gap-5 border-t border-[#DCE2E8] py-8 sm:grid-cols-[minmax(0,1fr)_minmax(155px,0.85fr)] sm:gap-8 sm:py-10 lg:gap-10 lg:py-12",
                index % 2 === 0
                  ? "md:border-r md:pr-7 lg:pr-12"
                  : "md:pl-7 lg:pl-12",
              ].join(" ")}
            >
              <div data-copy-reveal className="min-w-0">
                <p className="mb-4 text-xs font-semibold tracking-[0.13em] text-[#84909C] sm:text-[13px]">
                  {item.number}
                </p>

                <h3 className="text-[20px] font-bold leading-snug tracking-[-0.025em] text-[#202832] sm:text-[22px] lg:text-[24px]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-[1.85] text-[#56616D] sm:text-[16px]">
                  {item.description}
                </p>
              </div>

              <TechnicalImage
                src={item.image}
                alt={item.alt}
                className="aspect-square w-full"
              />
            </article>
          ))}
        </div>
      </section>

      {/* ENGINEERING & INTEGRATION */}
      <section className="relative bg-[#0B2340] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
          <div data-section-heading className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#B4C5D8] sm:text-[13px]">
              Engineering & Integration
            </p>

            <h2 className="mt-4 text-[30px] font-bold leading-[1.18] tracking-[-0.035em] text-white sm:text-[36px] lg:text-[42px]">
              Automation that works with your business.
            </h2>

            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#CFD9E5] sm:text-[17px]">
              Effective automation needs more than an AI model. It requires
              thoughtful workflow design, reliable integrations and systems that
              can be monitored and maintained.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:mt-14 sm:grid-cols-3 sm:gap-7 lg:gap-10">
            {engineering.map((item) => (
              <article
                key={item.title}
                data-engineering
                className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-5 border-t border-white/20 py-7 sm:grid-cols-1 sm:items-start sm:gap-6 sm:py-8"
              >
                <TechnicalImage
                  src={item.image}
                  alt={item.alt}
                  className="aspect-square w-[88px] sm:w-full sm:max-w-[220px]"
                />

                <div data-copy-reveal>
                  <h3 className="text-[20px] font-bold leading-snug tracking-[-0.02em] text-white sm:text-[22px]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-[1.85] text-[#CFD9E5] sm:text-[16px]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div
            data-contact-reveal
            className="mt-10 flex flex-col gap-5 border-t border-white/20 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-[22px] font-bold tracking-[-0.025em] text-white sm:text-[26px]">
                Have an automation project in mind?
              </h3>

              <p className="mt-2 text-[16px] leading-7 text-[#CFD9E5]">
                Let&apos;s discuss where AI and automation can help your
                business.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-12 w-fit items-center border-b-2 border-white/70 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white hover:text-[#CFD9E5] sm:text-[16px]"
            >
              Discuss your project
            </Link>
          </div>
        </div>
      </section>

      <CustomerSupport />
    </main>
  );
}
