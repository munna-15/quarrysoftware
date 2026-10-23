"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutionLinks = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "Business Automation", href: "/services/business-automation" },
  { label: "Cloud & Server Solutions", href: "/web-server" },
  { label: "System Integration", href: "/services/system-integration" },
];

const companyLinks = [
  { label: "About Quarry", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-footer-reveal]",
        footer,
      );

      const wordmark = footer.querySelector<HTMLElement>(
        "[data-footer-wordmark]",
      );

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clearProps: "transform",
        });

        if (wordmark) {
          gsap.set(wordmark, { autoAlpha: 1, y: 0, scale: 1 });
        }

        return;
      }

      gsap.set(items, {
        autoAlpha: 0,
        y: 18,
        scale: 0.99,
      });

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
      });

      if (wordmark) {
        gsap.fromTo(
          wordmark,
          { autoAlpha: 0, scale: 0.97, y: 16 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wordmark,
              start: "top 95%",
              once: true,
            },
          },
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden bg-[#F3F1E9] px-5 pb-5 pt-12 text-[#252923] sm:px-8 sm:pb-6 sm:pt-16 lg:px-[7vw] lg:pt-20"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Main footer columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-[#252923]/15 pb-10 sm:gap-x-10 sm:gap-y-12 sm:pb-12 lg:grid-cols-[1.35fr_0.9fr_0.7fr_1fr] lg:gap-12">
          {/* Brand */}
          <div data-footer-reveal className="col-span-2 max-w-md lg:col-span-1">
            <Link
              href="/"
              aria-label="Quarry Software home"
              className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#456653]"
            >
              <Image
                src="/images/quarry/logo.png"
                alt="Quarry Software"
                width={220}
                height={40}
                priority
                className="h-auto w-[210px] object-contain sm:w-[210px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-base leading-7 text-[#454A44] sm:text-[17px] sm:leading-8">
              Websites, business systems and automation engineered around the
              way your business works.
            </p>

            <p className="mt-5 text-xs font-semibold uppercase leading-6 tracking-[0.12em] text-[#686D66] sm:text-sm">
              Software Engineering · Web · AI · Automation
            </p>
          </div>

          {/* Solutions */}
          <nav data-footer-reveal aria-label="Solutions">
            <h3 className="mb-5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              Solutions
            </h3>

            <ul className="space-y-3.5">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-base leading-6 text-[#50564F] transition-colors duration-200 hover:text-[#244B3C] focus-visible:text-[#244B3C] sm:text-[17px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav data-footer-reveal aria-label="Company">
            <h3 className="mb-5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              Company
            </h3>

            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block text-base leading-6 text-[#50564F] transition-colors duration-200 hover:text-[#244B3C] focus-visible:text-[#244B3C] sm:text-[17px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div data-footer-reveal className="col-span-2 lg:col-span-1">
            <h3 className="mb-5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
              Get in touch
            </h3>

            <a
              href="mailto:quarrysoftware@gmail.com"
              className="break-all text-base leading-7 text-[#454A44] underline decoration-[#252923]/30 underline-offset-4 transition-colors hover:text-[#244B3C] hover:decoration-[#244B3C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244B3C] sm:text-[17px]"
            >
              quarrysoftware@gmail.com
            </a>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#777C74] sm:text-sm">
              Location
            </p>

            <p className="mt-2 text-base leading-7 text-[#454A44] sm:text-[17px]">
              Savar, Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Large brand signature */}
        <div
          aria-hidden="true"
          className="pointer-events-none -mx-5 overflow-hidden pt-10 sm:-mx-8 sm:pt-12 lg:-mx-[7vw] lg:pt-14"
        >
          <p
            data-footer-wordmark
            className="select-none whitespace-nowrap text-center text-[23vw] font-bold leading-[0.8] tracking-[-0.09em] text-[#244B3C]/[0.075] sm:text-[21vw] lg:text-[19vw]"
          >
            QUARRY
          </p>
        </div>

        {/* Copyright */}
        <div
          data-footer-reveal
          className="flex flex-col gap-2.5 border-t border-[#252923]/15 pt-5 text-sm leading-6 text-[#62675F] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <p>© 2026 Quarry Software. All rights reserved.</p>
          <p>Built with care. Engineered for business.</p>
        </div>
      </div>
    </footer>
  );
}
