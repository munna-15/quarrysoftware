"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "LeadFlow AI",
    category: "AI & AUTOMATION",
    description:
      "An intelligent lead-response system designed to help businesses capture enquiries and respond faster.",
    image: "/images/quarry/work/lead-flow.png",
    type: "AI-Powered System",
  },
  {
    name: "Z-Core",
    category: "DIGITAL SOLUTIONS",
    description:
      "A digital agency experience built around clear positioning, purposeful design and modern engineering.",
    image: "/images/quarry/work/z-core.png",
    type: "Brand & Web Experience",
  },
  {
    name: "RestaurantOS",
    category: "RESTAURANT TECHNOLOGY",
    description:
      "A restaurant-focused digital platform connecting online ordering with a streamlined customer experience.",
    image: "/images/quarry/work/restaurant-os.png",
    type: "Business Platform",
  },
  {
    name: "Avenor",
    category: "REAL ESTATE",
    description:
      "A premium property experience designed to present properties through a refined digital experience.",
    image: "/images/quarry/work/sm-builders.png",
    type: "Real Estate Experience",
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const scenes = scenesRef.current.slice(0, projects.length);

    if (!section || !stage || scenes.length !== projects.length) return;

    const context = gsap.context(() => {
      const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (motionPreference.matches) {
        // Keep the projects accessible without scroll-driven motion.
        gsap.set(stage, {
          clearProps: "height",
          height: "auto",
          overflow: "visible",
        });

        gsap.set(scenes, {
          clearProps: "all",
          position: "relative",
          inset: "auto",
          height: "100svh",
          width: "100%",
        });

        return;
      }

      // Each scene occupies the complete canvas.
      gsap.set(scenes, {
        yPercent: 100,
        scale: 1,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.set(scenes[0], {
        yPercent: 0,
        scale: 1,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          pin: stage,
          start: "top top",
          end: () => `+=${window.innerHeight * (projects.length - 1)}`,
          scrub: 1.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 1; index < scenes.length; index++) {
        const previous = scenes[index - 1];
        const current = scenes[index];
        const at = index - 1;

        // The previous scene recedes behind the incoming canvas.
        timeline.to(
          previous,
          {
            scale: 0.94,
            yPercent: -2,
            duration: 1,
          },
          at,
        );

        // The new scene covers the viewport from below.
        timeline.to(
          current,
          {
            yPercent: 0,
            scale: 1,
            duration: 1,
          },
          at,
        );
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-label="Selected projects"
      className="relative isolate bg-[#242424] text-[#f5f1e8]"
    >
      <div
        ref={stageRef}
        className="relative h-svh min-h-[620px] w-full overflow-hidden bg-[#242424]"
      >
        {projects.map((project, index) => (
          <article
            key={project.name}
            ref={(element) => {
              if (element) scenesRef.current[index] = element;
            }}
            aria-label={`${project.name} — ${project.category}`}
            className="absolute inset-0 h-full w-full overflow-hidden bg-[#242424]"
            style={{
              zIndex: index + 1,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Responsive project screenshot */}
            <div className="absolute inset-0 overflow-hidden bg-[#242424]">
              <Image
                src={project.image}
                alt={`${project.name} project preview`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-contain object-center md:object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent"
              />
            </div>

            {/* Minimal canvas header */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-7 sm:px-9 sm:pt-9 lg:px-[6vw] lg:pt-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/90 sm:text-xs">
                QUARRY SOFTWARE
              </p>

              <p className="text-right text-[9px] font-medium uppercase tracking-[0.19em] text-white/75 sm:text-[10px]">
                {project.category}
              </p>
            </div>

            {/* Project identity over the visual */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:px-9 sm:pb-11 lg:px-[6vw] lg:pb-[6vh]">
              <div className="grid items-end gap-5 lg:grid-cols-[1fr_330px] lg:gap-12">
                <div>
                  <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.22em] text-white/75 sm:mb-5 sm:text-[10px]">
                    {project.type}
                  </p>

                  <h2 className="max-w-[1050px] text-[clamp(3.5rem,10.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.085em] text-[#f5f1e8]">
                    {project.name}
                  </h2>
                </div>

                <p className="max-w-[330px] text-sm leading-6 text-white/80 sm:text-base sm:leading-7 lg:pb-2">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
