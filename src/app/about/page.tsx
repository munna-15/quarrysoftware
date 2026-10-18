"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Blocks,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Layers3,
  Network,
  Settings2,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CardItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
};

const principles: CardItem[] = [
  {
    image: "/images/quarry/company/build.png",
    imageAlt: "built",
    title: "Built around real needs",
    description:
      "We start with the business problem, then shape a solution around what actually needs to work.",
  },
  {
    image: "/images/quarry/company/design.png",
    imageAlt: "design",
    title: "Designed for the long term",
    description:
      "Clear structure and maintainable code help software evolve as requirements change.",
  },
  {
    image: "/images/quarry/company/security.png",
    imageAlt: "security",
    title: "Reliability by design",
    description:
      "Performance, security and dependable operation belong in the engineering process from the beginning.",
  },
];

const capabilities: CardItem[] = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Business websites and web applications designed around users, performance and business goals.",
  },
  {
    icon: Layers3,
    title: "Custom Software",
    description:
      "Purpose-built systems that support specific workflows and operational requirements.",
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Practical AI capabilities integrated into products and workflows where they provide real value.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description:
      "Connected workflows that reduce repetitive tasks and help teams work more efficiently.",
  },
  {
    icon: Network,
    title: "System Integration",
    description:
      "Applications and services connected to exchange information and work together.",
  },
  {
    icon: Settings2,
    title: "Cloud & Server Solutions",
    description:
      "Deployment, infrastructure management, maintenance and operational support.",
  },
];

const approach: CardItem[] = [
  {
    image: "/images/quarry/company/understand.png",
    imageAlt: "understand",
    title: "Understand",
    description:
      "Clarify the business goals, users, existing processes and the problem to solve.",
  },
  {
    image: "/images/quarry/company/plan.png",
    imageAlt: "plan",
    title: "Plan",
    description:
      "Define the solution, technical architecture, priorities and implementation scope.",
  },
  {
    image: "/images/quarry/company/engineer.png",
    imageAlt: "engineer",
    title: "Engineer",
    description:
      "Build, test and refine the solution with attention to usability and reliability.",
  },
  {
    image: "/images/quarry/company/support.png",
    imageAlt: "support",
    title: "Deliver & Support",
    description:
      "Deploy the solution and provide agreed handover, maintenance and ongoing support.",
  },
];

function AboutCard({
  item,
  variant = "light",
}: {
  item: CardItem;
  variant?: "light" | "dark";
}) {
  const Icon = item.icon;
  const dark = variant === "dark";

  return (
    <article
      data-about-card
      className={[
        "group flex min-h-[285px] flex-col items-center justify-center",
        "rounded-xl border px-6 py-9 text-center",
        "will-change-transform",
        "transition-[border-color,box-shadow,background-color] duration-300",
        dark
          ? [
              "border-white/10 bg-white/[0.06] text-white",
              "shadow-[0_10px_30px_rgba(0,0,0,0.14)]",
              "hover:border-white/25 hover:bg-white/[0.10]",
              "hover:shadow-[0_22px_48px_rgba(0,0,0,0.24)]",
            ].join(" ")
          : [
              "border-[#e7eaf0] bg-white text-[#252a30]",
              "shadow-[0_8px_28px_rgba(11,35,64,0.075)]",
              "hover:border-[#c9d3df]",
              "hover:shadow-[0_22px_50px_rgba(11,35,64,0.14)]",
            ].join(" "),
        "sm:px-8 sm:py-10",
      ].join(" ")}
    >
      <div className="mb-6 flex h-[120px] w-full shrink-0 items-center justify-center overflow-visible transition-transform duration-300 group-hover:scale-110">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt || item.title}
            width={180}
            height={180}
            className="h-[180px] w-[180px] object-contain"
          />
        ) : Icon ? (
          <Icon size={48} strokeWidth={1.6} />
        ) : null}
      </div>

      <h3
        className={[
          "max-w-[300px] text-xl font-semibold leading-snug",
          "tracking-[-0.025em]",
          dark ? "text-white" : "text-[#252a30]",
        ].join(" ")}
      >
        {item.title}
      </h3>

      <p
        className={[
          "mt-4 max-w-[310px] text-sm leading-7 sm:text-base",
          dark ? "text-white/65" : "text-[#686e76]",
        ].join(" ")}
      >
        {item.description}
      </p>
    </article>
  );
}

function CardGrid({
  items,
  columns,
  variant = "light",
}: {
  items: CardItem[];
  columns: string;
  variant?: "light" | "dark";
}) {
  return (
    <div data-about-card-group className={`grid gap-5 ${columns}`}>
      {items.map((item) => (
        <AboutCard key={item.title} item={item} variant={variant} />
      ))}
    </div>
  );
}

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const heroItems = gsap.utils.toArray<HTMLElement>(
        "[data-about-hero]",
        page,
      );

      const revealItems = gsap.utils.toArray<HTMLElement>(
        "[data-about-reveal]",
        page,
      );

      const cardGroups = gsap.utils.toArray<HTMLElement>(
        "[data-about-card-group]",
        page,
      );

      const allCards = cardGroups.flatMap((group) =>
        gsap.utils.toArray<HTMLElement>("[data-about-card]", group),
      );

      if (reducedMotion) {
        gsap.set([...heroItems, ...revealItems, ...allCards], {
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility",
        });
        return;
      }

      // Hero: one controlled entrance timeline.
      gsap.set(heroItems, {
        autoAlpha: 0,
        y: 22,
        scale: 0.97,
      });

      gsap.to(heroItems, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.12,
        overwrite: true,
      });

      // Section headings and copy: independent from card animation.
      revealItems.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            overwrite: true,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Cards: one group trigger, sequential entrance, no duplicate triggers.
      cardGroups.forEach((group) => {
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-about-card]",
          group,
        );

        if (!cards.length) return;

        gsap.set(cards, {
          autoAlpha: 0,
          y: 52,
          scale: 0.94,
          transformOrigin: "center bottom",
        });

        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: {
            each: 0.2,
            from: "start",
          },
          ease: "power3.out",
          overwrite: true,
          scrollTrigger: {
            trigger: group,
            start: "top 78%",
            once: true,
          },
        });
      });
    }, page);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-white text-[#24282e]">
      {/* Hero */}
      <section className="relative isolate flex h-[30vh] min-h-[280px] max-h-[420px] items-end overflow-hidden bg-[#0b2340] sm:min-h-[320px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/quarry/image-01.jpg')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-black/55" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-7 sm:px-8 sm:pb-9 md:px-12 md:pb-10">
          <div className="max-w-3xl">
            <p
              data-about-hero
              className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/70 sm:text-xs"
            >
              About Quarry
            </p>

            <h1
              data-about-hero
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              About Quarry Software
            </h1>

            <p
              data-about-hero
              className="mt-2 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7"
            >
              Websites, business systems and automation built around real
              business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Company overview */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-[7vw] lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div data-about-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#777b81] sm:text-sm">
              Who We Are
            </p>

            <h2 className="max-w-[520px] text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-[#22272d]">
              Technology should solve a real problem.
            </h2>
          </div>

          <div data-about-reveal className="lg:pt-8">
            <p className="text-lg leading-8 text-[#50565e] sm:text-xl sm:leading-9">
              Quarry Software is a digital solutions agency focused on building
              useful, dependable software for businesses.
            </p>

            <p className="mt-5 text-base leading-8 text-[#6b7077]">
              From business websites to custom internal systems, our work starts
              with understanding what needs to improve. We consider the people
              using the solution, the processes behind it and how the technology
              will be maintained over time.
            </p>

            <p className="mt-4 text-base leading-8 text-[#6b7077]">
              Our goal is to deliver solutions that fit the business, work as
              intended and adapt as requirements evolve.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-[#f3f5f7] px-5 py-16 sm:px-8 sm:py-24 lg:px-[7vw] lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div data-about-reveal className="mb-10 max-w-[720px] sm:mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#777b81] sm:text-sm">
              Our Principles
            </p>

            <h2 className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-[#22272d]">
              Good engineering starts with good decisions.
            </h2>

            <p className="mt-5 max-w-[620px] text-base leading-7 text-[#626971] sm:text-lg sm:leading-8">
              The way a solution is planned and built matters just as much as
              what it looks like when it launches.
            </p>
          </div>

          <CardGrid items={principles} columns="md:grid-cols-3" />
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-[7vw] lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div
            data-about-reveal
            className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[1fr_0.7fr] lg:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#777b81] sm:text-sm">
                What We Do
              </p>

              <h2 className="max-w-[700px] text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-[#22272d]">
                Connected capabilities. Practical outcomes.
              </h2>
            </div>

            <p className="max-w-[480px] text-base leading-7 text-[#626971] lg:justify-self-end">
              We bring together software, infrastructure and automation to
              support different business requirements.
            </p>
          </div>

          <CardGrid
            items={capabilities}
            columns="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[#0b2340] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-[7vw] lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div data-about-reveal className="mb-10 max-w-[760px] sm:mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-sm">
              How We Work
            </p>

            <h2 className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-white">
              From business need to working software.
            </h2>

            <p className="mt-5 max-w-[650px] text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              A clear process keeps the work aligned with the original goal,
              from the first discussion through delivery and support.
            </p>
          </div>

          <CardGrid
            items={approach}
            columns="sm:grid-cols-2 lg:grid-cols-4"
            variant="dark"
          />

          <div
            data-about-reveal
            className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/20 pt-8 sm:mt-16 sm:flex-row sm:items-center"
          >
            <p className="max-w-[620px] text-base leading-7 text-white/75 sm:text-lg">
              Have a business challenge that needs a software solution?
            </p>

            <Link
              href="/contact"
              className="relative z-10 inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-sm bg-white px-6 py-3 text-sm font-semibold !text-[#0b2340] opacity-100 transition-colors duration-300 hover:bg-[#e9edf2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
