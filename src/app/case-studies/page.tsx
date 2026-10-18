"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {  ArrowUpRight } from "lucide-react";
import CustomerSupport from "@/components/home/CustomerSupport";


const caseStudies = [
  {
    title: "E-commerce Platform for Small Businesses",
    type: "Businesses",
    slug: "ecommerce-platform",
    image: "/images/case-studies/e-commerce.avif",
  },
  {
    title: "Medical Practice and Billing Software",
    type: "Healthcare",
    slug: "medical-practice-billing",
    image: "/images/case-studies/medical.avif",
  },
  {
    title: "Education Software",
    type: "Education",
    slug: "education-software",
    image: "/images/case-studies/education.avif",
  },
  {
    title: "Security of Cloud-Based Platforms",
    type: "Security",
    slug: "cloud-platform-security",
    image: "/images/case-studies/cloud.jpg",
  },
  {
    title: "E-Learning Platform Development",
    type: "Education",
    slug: "elearning-platform",
    image: "/images/case-studies/elearning.jpg",
  },
  {
    title: "Restaurant Review & Rating System",
    type: "Food",
    slug: "restaurant-review-rating",
    image: "/images/case-studies/food.jpg",
  },
  {
    title: "AI-Powered Business Solutions",
    type: "AI",
    slug: "ai-solutions",
    image: "/images/case-studies/ai.jpg",
  },
  {
    title: "Intelligent Workflow Automation",
    type: "Automation",
    slug: "workflow-automation",
    image: "/images/case-studies/automation.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.24,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
      y: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
      scale: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  },
};

export default function CaseStudiesPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#292C25]">
      {/* Hero: original image colors, no overlay */}
      <section className="relative flex h-[30vh] min-h-[240px] items-end overflow-hidden bg-[#17232d]">
        <Image
          src="/images/quarry/ai.jpg"
          alt="Modern server infrastructure"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 md:px-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/70">
            Quarry / Selected Work
          </p>

          <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-white md:text-5xl">
            Case Studies
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
            Reliable infrastructure for modern digital products.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="scroll-mt-20 px-4 py-10 sm:px-7 sm:py-12 lg:py-14"
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78816B]">
                Selected Projects
              </p>

              <h2 className="text-xl font-medium tracking-[-0.035em] sm:text-2xl">
                Work built around real needs.
              </h2>
            </div>

            <p className="hidden pb-1 text-xs text-neutral-500 sm:block">
              Digital products & solutions
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.02,
              margin: "0px 0px -20px 0px",
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.slug}
                custom={index}
                variants={
                  shouldReduceMotion
                    ? {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }
                    : cardVariants
                }
                className="group min-w-0 overflow-hidden rounded-[2px] bg-neutral-700 shadow-[0_3px_12px_rgba(30,32,25,0.06)] transition-shadow duration-500 hover:shadow-[0_12px_28px_rgba(30,32,25,0.16)]"
              >
                {/* Image */}
                <Link
                  href={`/case-studies/${study.slug}`}
                  aria-label={`View ${study.title}`}
                  className="relative block aspect-[1.45/1] overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </Link>

                {/* Neutral 700 information panel */}
                <div className="flex min-h-[112px] flex-col justify-between gap-3 bg-neutral-700 px-3.5 py-3.5 sm:min-h-[120px] sm:px-4">
                  <h3 className="line-clamp-2 text-[13px] font-medium leading-[1.45] tracking-[-0.01em] text-white sm:text-sm">
                    {study.title}
                  </h3>

                  <div className="flex items-center justify-between gap-2 border-t border-white/20 pt-3">
                    <span className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-300 sm:text-[10px]">
                      {study.type}
                    </span>

                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="!text-white inline-flex shrink-0 items-center gap-1 text-[10px] font-medium transition-colors duration-300 hover:!text-[#D4DEC9] sm:text-[11px]"
                    >
                      Learn More
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.7}
                        className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <CustomerSupport/>
    </main>
  );
}
