"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const image = imageRef.current;
    const eyebrow = eyebrowRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;

    if (
      !section ||
      !background ||
      !image ||
      !eyebrow ||
      !heading ||
      !description
    ) {
      return;
    }

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([background, eyebrow, heading, description], {
          autoAlpha: 1,
          clearProps: "all",
        });

        gsap.set(image, {
          scale: 1,
          clearProps: "transform",
        });

        return;
      }

      gsap.set(background, { autoAlpha: 0 });

      gsap.set(image, {
        scale: 1.055,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(eyebrow, {
        autoAlpha: 0,
        y: 7,
      });

      gsap.set(heading, {
        autoAlpha: 0,
        clearProps: "transform",
      });

      gsap.set(description, {
        autoAlpha: 0,
        y: 9,
      });

      const timeline = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
      });

      timeline
        .to(background, {
          autoAlpha: 1,
          duration: 0.9,
          ease: "power1.out",
        })
        .to(
          image,
          {
            scale: 1,
            duration: 3.2,
            ease: "power2.out",
            force3D: true,
          },
          0,
        )
        .to(
          eyebrow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.35,
        )
        .to(
          heading,
          {
            autoAlpha: 1,
            duration: 1.15,
            ease: "power1.out",
          },
          0.5,
        )
        .to(
          description,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            clearProps: "transform",
          },
          0.95,
        )
        .set(image, {
          clearProps: "transform",
        });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="quarry-hero-heading"
      className="relative isolate flex h-[100svh] min-h-[620px] max-h-[1100px] items-center overflow-hidden bg-[#071629] text-white sm:min-h-[680px]"
    >
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="absolute inset-0 opacity-0 invisible"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/quarry/image-01.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#061426]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061426]/85 via-[#061426]/55 to-[#061426]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061426]/65 via-transparent to-[#061426]/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-12 pt-28 sm:px-10 sm:pb-16 md:px-14 lg:px-20">
        <div className="max-w-[1050px]">
          <p
            ref={eyebrowRef}
            className="invisible mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:mb-8 sm:text-xs"
          >
            Quarry Software
          </p>

          <h1
            ref={headingRef}
            id="quarry-hero-heading"
            className="invisible max-w-[1000px] text-[clamp(3.15rem,7.4vw,7.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white [text-wrap:balance]"
          >
            Software,
            <br />
            Built Around
            <br />
            <span className="text-white/75">Your Business.</span>
          </h1>

          <p
            ref={descriptionRef}
            className="invisible mt-7 max-w-[540px] text-sm leading-7 text-white/75 sm:mt-9 sm:text-base sm:leading-8 md:text-lg"
          >
            Websites, custom software and intelligent automation designed around
            the way your business works.
          </p>
        </div>
      </div>
    </section>
  );
}
