"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  PanelsTopLeft,
  Code2,
  FlaskConical,
  Rocket,
  ShieldCheck,
  Gauge,
  GitBranch,
  Workflow,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProcessStep = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

type Principle = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const processSteps: ProcessStep[] = [
  {
    title: "Understand",
    description:
      "Every project begins with understanding the business, its users and the problem that needs to be solved.",
    detail:
      "Business goals, existing workflows, user needs and project requirements.",
    icon: Search,
  },
  {
    title: "Strategy & Design",
    description:
      "We turn requirements into a clear plan, choosing an appropriate technical direction before development begins.",
    detail:
      "Solution architecture, user experience, scope and implementation priorities.",
    icon: PanelsTopLeft,
  },
  {
    title: "Engineering",
    description:
      "We build the solution around the agreed requirements, with attention to maintainability, usability and performance.",
    detail:
      "Frontend, backend, integrations, data structures and business logic.",
    icon: Code2,
  },
  {
    title: "Testing & Refinement",
    description:
      "We check how the solution behaves, identify issues and refine the experience before it is released.",
    detail:
      "Functional checks, responsive behaviour, error handling and performance.",
    icon: FlaskConical,
  },
  {
    title: "Delivery & Support",
    description:
      "We prepare the solution for real use and provide handover and ongoing support according to the project agreement.",
    detail: "Deployment, handover, maintenance and agreed operational support.",
    icon: Rocket,
  },
];

const principles: Principle[] = [
  {
    title: "Built for Real Workflows",
    description:
      "Solutions should fit the way a business operates instead of adding unnecessary complexity.",
    icon: Workflow,
  },
  {
    title: "Reliable by Design",
    description:
      "Security, error handling and predictable behaviour are considered throughout development.",
    icon: ShieldCheck,
  },
  {
    title: "Designed to Evolve",
    description:
      "A clear structure makes software easier to maintain and adapt as requirements change.",
    icon: GitBranch,
  },
  {
    title: "Performance Matters",
    description:
      "Responsiveness, loading behaviour and efficient resource use are part of the engineering process.",
    icon: Gauge,
  },
];

function ProcessCard({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  return (
    <article
      data-approach-card
      className="group relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#e1e6ec] bg-white px-7 py-9 text-center shadow-[0_8px_30px_rgba(11,35,64,0.045)] transition-[border-color,box-shadow,background-color] duration-500 hover:border-[#bdcbd9] hover:bg-[#fcfdff] hover:shadow-[0_22px_55px_rgba(11,35,64,0.11)] sm:min-h-[410px] sm:px-8"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#c9d5e1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-7 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl border border-[#e4eaf0] bg-[#f4f7fa] text-[#263d57] transition-all duration-500 group-hover:border-[#d4e0eb] group-hover:bg-[#eaf0f6] group-hover:scale-105">
        <Icon size={34} strokeWidth={1.5} />
      </div>

      <h3 className="max-w-[280px] text-[22px] font-semibold leading-tight tracking-[-0.035em] text-[#252a30] sm:text-2xl">
        {step.title}
      </h3>

      <p className="mt-4 max-w-[340px] text-sm leading-7 text-[#69717b] sm:text-[15px]">
        {step.description}
      </p>

      <div className="mt-7 w-full max-w-[340px] border-t border-[#e8edf2] pt-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#87919c]">
          Key focus
        </p>

        <p className="text-[13px] leading-6 text-[#424c57]">{step.detail}</p>
      </div>
    </article>
  );
}

function PrincipleCard({ principle }: { principle: Principle }) {
  const Icon = principle.icon;

  return (
    <article
      data-approach-card
      className="group relative flex min-h-[290px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] px-6 py-9 text-center transition-[border-color,background-color,box-shadow] duration-500 hover:border-white/20 hover:bg-white/[0.085] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:px-7"
    >
      <div className="mb-6 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/90 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.11]">
        <Icon size={31} strokeWidth={1.5} />
      </div>

      <h3 className="max-w-[260px] text-lg font-semibold leading-snug tracking-[-0.025em] text-white sm:text-xl">
        {principle.title}
      </h3>

      <p className="mt-4 max-w-[290px] text-sm leading-7 text-white/65 sm:text-[15px]">
        {principle.description}
      </p>
    </article>
  );
}

export default function ApproachPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>(
        "[data-approach-hero]",
        page,
      );

      const revealItems = gsap.utils.toArray<HTMLElement>(
        "[data-approach-reveal]",
        page,
      );

      const cardGroups = gsap.utils.toArray<HTMLElement>(
        "[data-approach-card-group]",
        page,
      );

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(
          [
            ...heroItems,
            ...revealItems,
            ...cardGroups.flatMap((group) =>
              gsap.utils.toArray<HTMLElement>("[data-approach-card]", group),
            ),
          ],
          {
            autoAlpha: 1,
            clearProps: "transform,opacity,visibility",
          },
        );

        return;
      }

      gsap.set(heroItems, {
        autoAlpha: 0,
        y: 20,
        scale: 0.98,
      });

      gsap.to(heroItems, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.16,
        delay: 0.12,
        ease: "power3.out",
        overwrite: true,
      });

      revealItems.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 25,
            scale: 0.985,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      cardGroups.forEach((group) => {
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-approach-card]",
          group,
        );

        if (!cards.length) return;

        gsap.set(cards, {
          autoAlpha: 0,
          y: 35,
          scale: 0.94,
          transformOrigin: "center center",
        });

        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: {
            each: 0.19,
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

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-white text-[#252a30]">
      {/* Hero */}
      <section className="relative isolate flex min-h-[340px] items-end overflow-hidden bg-[#0b2340] sm:min-h-[390px] lg:min-h-[420px]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/quarry/image-01.jpg')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-[#071a2d]/65" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2d]/65 via-transparent to-transparent" />

        <div className="mx-auto w-full max-w-[1280px] px-5 pb-12 pt-28 sm:px-8 sm:pb-14 md:px-12 lg:pb-16">
          <div className="max-w-3xl">
            <p
              data-approach-hero
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs"
            >
              How We Work
            </p>

            <h1
              data-approach-hero
              className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl"
            >
              A clear path from idea to solution.
            </h1>

            <p
              data-approach-hero
              className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8"
            >
              A thoughtful engineering process turns business requirements into
              useful, reliable and maintainable software.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[7vw] lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div data-approach-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a828b] sm:text-xs">
              Our Approach
            </p>

            <h2 className="max-w-[540px] text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#22272d]">
              The right solution starts with the right questions.
            </h2>
          </div>

          <div data-approach-reveal className="lg:pt-8">
            <p className="text-lg leading-8 text-[#505963] sm:text-xl sm:leading-9">
              Good software is not just about writing code. It starts with
              understanding what a business needs, identifying constraints and
              choosing a practical way forward.
            </p>

            <p className="mt-5 text-[15px] leading-8 text-[#6b737c] sm:text-base">
              We approach each project with a clear scope, considered technical
              decisions and regular attention to how the solution performs in
              real use.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#f3f5f7] px-5 py-16 sm:px-8 sm:py-20 lg:px-[7vw] lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div data-approach-reveal className="mb-10 max-w-[760px] sm:mb-14">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a828b] sm:text-xs">
              The Process
            </p>

            <h2 className="text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#22272d]">
              Each stage has a clear purpose.
            </h2>

            <p className="mt-5 max-w-[650px] text-base leading-7 text-[#626b75] sm:text-lg sm:leading-8">
              From the initial conversation to deployment, every stage helps
              keep the work aligned with the business goal.
            </p>
          </div>

          <div
            data-approach-card-group
            className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {processSteps.map((step) => (
              <ProcessCard key={step.title} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="relative overflow-hidden bg-[#0b2340] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-[7vw] lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full border border-white/[0.055]" />
        <div className="pointer-events-none absolute -right-16 -top-24 h-[290px] w-[290px] rounded-full border border-white/[0.055]" />

        <div className="relative mx-auto max-w-[1280px]">
          <div data-approach-reveal className="mb-10 max-w-[760px] sm:mb-14">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-xs">
              Engineering Principles
            </p>

            <h2 className="text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
              Quality is built into the process.
            </h2>

            <p className="mt-5 max-w-[650px] text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              We consider the structure, reliability and long-term use of a
              solution—not only whether it works on launch day.
            </p>
          </div>

          <div
            data-approach-card-group
            className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {principles.map((principle) => (
              <PrincipleCard key={principle.title} principle={principle} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-[7vw] lg:py-24">
        <div
          data-approach-reveal
          className="mx-auto flex max-w-[1280px] flex-col gap-8 border-t border-[#e2e6eb] pt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:pt-12"
        >
          <div className="max-w-[700px]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a828b] sm:text-xs">
              Start With a Conversation
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#22272d] sm:text-4xl">
              Let’s understand what your business needs.
            </h2>

            <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#68717b] sm:text-base">
              Tell us about your challenge, workflow or idea. We can discuss the
              requirements and explore a practical next step.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-sm bg-[#0b2340] px-6 py-3 text-sm font-semibold !text-white opacity-100 transition-colors duration-300 hover:bg-[#183b60] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b2340] sm:self-auto"
          >
            Start a Conversation
            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
