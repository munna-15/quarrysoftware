"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomerSupport from "@/components/home/CustomerSupport";

const NAV_HEIGHT = 88;

const capabilities = [
  {
    number: "01",
    title: "Business Websites",
    description:
      "A clear, credible digital presence that communicates your services and helps customers take the next step.",
    image: "/images/quarry/services/web-development/business-websites.png",
    alt: "Business website design visualization",
  },
  {
    number: "02",
    title: "E-commerce Development",
    description:
      "Product catalogs, shopping carts, checkout, payments and order management in one connected experience.",
    image: "/images/quarry/services/web-development/ecommerce.png",
    alt: "E-commerce system visualization",
  },
  {
    number: "03",
    title: "Custom Web Applications",
    description:
      "Purpose-built dashboards, portals and internal tools designed around your team's real workflows.",
    image: "/images/quarry/services/web-development/web-applications.png",
    alt: "Custom web application visualization",
  },
  {
    number: "04",
    title: "Responsive Experiences",
    description:
      "Interfaces that adapt naturally to mobile, tablet and desktop without compromising usability.",
    image: "/images/quarry/services/web-development/responsive.png",
    alt: "Responsive web design visualization",
  },
];

const engineering = [
  {
    title: "Performance",
    description:
      "Optimized assets, efficient rendering and thoughtful loading performance.",
    image: "/images/quarry/services/web-development/performance.png",
    alt: "Web performance visualization",
  },
  {
    title: "System Integration",
    description:
      "Connect APIs, databases, payment providers and essential business tools.",
    image: "/images/quarry/services/web-development/integrations.png",
    alt: "System integration visualization",
  },
  {
    title: "Security & Delivery",
    description:
      "Testing, secure configuration, deployment and ongoing technical maintenance.",
    image: "/images/quarry/services/web-development/security.png",
    alt: "Security and deployment visualization",
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

export default function WebDevelopmentPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motion.matches) return;

    const ctx = gsap.context(() => {
      // Hero: calm, controlled entrance.
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

      // Section headings grow gently into place.
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

      // Reveal each service's text first, then its image.
      root
        .querySelectorAll<HTMLElement>("[data-capability]")
        .forEach((card, index) => {
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

      // Engineering items reveal one after another as they enter view.
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

      // Final project invitation.
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
              Digital Solutions <span className="mx-2 text-white/35">/</span>{" "}
              Web Development
            </p>

            <h1 className="hero-content mt-5 text-[36px] font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[52px]">
              Web Development
            </h1>

            <p className="hero-content mt-5 max-w-2xl text-[16px] leading-8 text-white/80 sm:text-[18px] sm:leading-9">
              Websites and web applications engineered around your business,
              your customers and the way your team works.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full bg-white/20"
        />
      </section>

      {/* WHAT WE BUILD */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div data-section-heading className="mb-10 max-w-3xl sm:mb-14 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#697582] sm:text-[13px]">
            What We Build
          </p>

          <h2 className="mt-4 text-[30px] font-bold leading-[1.18] tracking-[-0.035em] text-[#202832] sm:text-[36px] lg:text-[42px]">
            Digital products built for real work.
          </h2>

          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#56616D] sm:text-[17px]">
            From a business website to a complete web application, we build
            around your requirements instead of forcing your business into a
            template.
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

      {/* ENGINEERING */}
      <section className="relative bg-[#0B2340] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
          <div data-section-heading className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#B4C5D8] sm:text-[13px]">
              Engineering & Delivery
            </p>

            <h2 className="mt-4 text-[30px] font-bold leading-[1.18] tracking-[-0.035em] text-white sm:text-[36px] lg:text-[42px]">
              Built beyond the interface.
            </h2>

            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#CFD9E5] sm:text-[17px]">
              Good design is only one part of a dependable website. The
              underlying systems need to perform, connect securely and remain
              maintainable.
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
                Have a web project in mind?
              </h3>

              <p className="mt-2 text-[16px] leading-7 text-[#CFD9E5]">
                Let’s discuss what you need to build.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex min-h-12 w-fit items-center border-b-2 border-white/70 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white hover:text-[#CFD9E5] sm:text-[16px]"
            >
              Discuss your project
            </a>
          </div>
        </div>
      </section>
      <CustomerSupport />
    </main>
  );
}
