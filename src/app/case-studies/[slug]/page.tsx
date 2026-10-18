"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Layers3,
  MonitorSmartphone,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import CustomerSupport from "@/components/home/CustomerSupport";

type Feature = { title: string; description: string };

type Project = {
  title: string;
  category: string;
  introduction: string;
  industry: string;
  type: string;
  engagement: string;
  duration: string;
  staff: string;
  platforms: string;
  challenges: string[];
  solution: string[];
  features: Feature[];
  specialFeatures: string;
  results: string;
  technologies: string[];
};

type QuoteForm = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

const projects: Record<string, Project> = {
  "medical-practice-billing": {
    title: "Medical Practice & Billing Software",
    category: "Healthcare",
    introduction:
      "A healthcare management solution for organizing patient records, appointments, clinical workflows, and billing.",
    industry: "Healthcare",
    type: "Web Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Desktop, Tablet & Mobile",
    challenges: [
      "Patient details, appointment information, clinical notes, and billing records can become scattered across separate tools or paper-based processes.",
      "Reception teams need a clearer way to register patients, coordinate schedules, and prepare for daily appointments.",
      "Doctors and administrative staff need access to relevant information without repeatedly asking patients for the same details.",
    ],
    solution: [
      "Maintain patient profiles and visit history in a centralized workspace.",
      "Schedule appointments, coordinate check-ins, and organize daily calendars.",
      "Give authorized medical staff a structured way to review patient details and record consultation notes.",
      "Organize invoices and billing records alongside appointment information.",
    ],
    features: [
      {
        title: "Patient Records",
        description:
          "Maintain patient profiles, contact details, intake information, and visit records for authorized staff.",
      },
      {
        title: "Appointments & Scheduling",
        description:
          "Arrange appointments, review schedules, manage check-ins, and coordinate patient flow.",
      },
      {
        title: "Clinical Workflow",
        description:
          "Give medical teams a structured place to review relevant patient details and record consultation notes.",
      },
      {
        title: "Billing Administration",
        description:
          "Organize invoices and billing information so front-office staff can track payment-related tasks.",
      },
    ],
    specialFeatures:
      "Role-based access, configurable forms, document handling, and integrations can be tailored to the clinic's confirmed workflow. Medical data storage and access should follow applicable privacy and security requirements.",
    results:
      "The intended outcome is a more coordinated clinic workflow, less repeated data entry, and easier access to patient, appointment, and billing information. Specific performance claims should be added only after results are measured.",
    technologies: [
      "Patient Management",
      "Appointment Scheduling",
      "Billing Workflow",
      "Document Management",
      "Access Control",
      "Third-Party Integrations",
    ],
  },

  "ecommerce-platform": {
    title: "E-commerce Platform for Small Businesses",
    category: "Business",
    introduction:
      "An online selling solution for managing product catalogs, stock, customer orders, and day-to-day store operations.",
    industry: "Retail & E-commerce",
    type: "Web Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Desktop, Tablet & Mobile",
    challenges: [
      "Product details, prices, and stock quantities can be difficult to keep consistent when managed manually.",
      "Store owners need a reliable way to review new orders, update their progress, and organize customer information.",
      "Handling product updates and order administration across separate tools can consume valuable time as a store grows.",
    ],
    solution: [
      "Manage product listings, categories, descriptions, prices, and images from a central area.",
      "Review incoming orders, update order statuses, and organize fulfillment.",
      "Give customers a clear storefront for browsing categories and viewing product details.",
      "Manage core store information through a responsive administrative interface.",
    ],
    features: [
      {
        title: "Product & Catalog Management",
        description:
          "Maintain product names, descriptions, images, prices, categories, and catalog information.",
      },
      {
        title: "Inventory Management",
        description:
          "Track stock quantities and review inventory information in one organized place.",
      },
      {
        title: "Order Management",
        description:
          "Review orders, organize processing, and update statuses through fulfillment.",
      },
      {
        title: "Shopping Experience",
        description:
          "Provide a responsive storefront with product discovery, category browsing, and clear product information.",
      },
      {
        title: "Store Administration",
        description:
          "Manage key store settings and business information through an organized interface.",
      },
    ],
    specialFeatures:
      "Depending on the agreed scope, the platform can be extended with stock alerts, discount rules, payment gateways, delivery integrations, customer accounts, and sales reports. Only implemented features should be presented as available.",
    results:
      "The solution is intended to simplify catalog updates and order handling, reduce dependence on scattered records, and provide customers with a clearer shopping experience. Measured improvements should be added only when verified.",
    technologies: [
      "E-commerce",
      "Product Catalog",
      "Inventory Workflow",
      "Order Management",
      "Responsive Interface",
      "Payment & Delivery Integrations",
    ],
  },

  "education-software": {
    title: "Education Management Software",
    category: "Education",
    introduction:
      "A digital management platform for organizing student information, academic activities, communication, and administration.",
    industry: "Education",
    type: "Web Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Desktop, Tablet & Mobile",
    challenges: [
      "Student records, attendance, class schedules, and academic information can be spread across separate files and manual processes.",
      "Teachers and administrators need a consistent way to maintain student information and coordinate academic activities.",
      "Students and guardians may need clearer access to relevant notices, schedules, and learning information.",
    ],
    solution: [
      "Maintain student profiles and organize academic information in a central system.",
      "Arrange class schedules, record attendance, and structure classroom information.",
      "Provide authorized users with access to relevant academic updates and learning resources.",
      "Organize routine administrative tasks and communication more consistently.",
    ],
    features: [
      {
        title: "Student Information",
        description:
          "Maintain student profiles, enrollment details, class assignments, and academic records.",
      },
      {
        title: "Attendance & Scheduling",
        description:
          "Record attendance and organize class timetables for easier review.",
      },
      {
        title: "Academic Records",
        description:
          "Structure grades, results, and progress information around institutional requirements.",
      },
      {
        title: "Notices & Communication",
        description:
          "Publish notices and share updates with relevant student, teacher, or guardian groups.",
      },
    ],
    specialFeatures:
      "The platform can be configured around institution-specific roles, academic terms, grading rules, reports, and communication workflows. Parent portals, online payments, or integrations should be listed only when included in the confirmed scope.",
    results:
      "The intended benefit is a more organized administrative process and easier access to academic information. Any claimed reduction in workload or improvement in outcomes should be supported by measured project data.",
    technologies: [
      "Student Management",
      "Attendance Tracking",
      "Academic Records",
      "Role-Based Access",
      "Reporting",
      "Responsive Interface",
    ],
  },

  "cloud-platform-security": {
    title: "Security for Cloud-Based Platforms",
    category: "Security",
    introduction:
      "A security-focused platform approach for organizing user access, reviewing application activity, and managing cloud security workflows.",
    industry: "Technology",
    type: "Cloud / Web Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Cloud & Web",
    challenges: [
      "As cloud applications grow, teams may find it difficult to keep user permissions and access policies consistent.",
      "Security events and configuration details can be spread across multiple services and dashboards.",
      "Teams need a repeatable process for reviewing risks and following up on identified issues.",
    ],
    solution: [
      "Organize user roles and permission policies around access requirements.",
      "Bring selected activity and configuration information into a structured review workflow.",
      "Document security concerns, assign follow-up actions, and track status where implemented.",
    ],
    features: [
      {
        title: "Access & Permissions",
        description:
          "Define and review user roles to support least-privilege access practices.",
      },
      {
        title: "Activity Visibility",
        description:
          "Organize relevant logs, events, or security information for clearer reviews.",
      },
      {
        title: "Risk Review",
        description:
          "Record security concerns, prioritize follow-up work, and track remediation status.",
      },
      {
        title: "Security Administration",
        description:
          "Keep security policies and operational procedures organized for authorized teams.",
      },
    ],
    specialFeatures:
      "Depending on the architecture, the solution may include audit trails, alerts, identity-provider integrations, backup procedures, and security reporting. No certification or protection guarantee should be claimed without independent evidence.",
    results:
      "The goal is to improve security visibility and make access reviews more systematic. Security effectiveness must be evaluated through implementation details, testing, and ongoing monitoring.",
    technologies: [
      "Cloud Platforms",
      "Identity & Access Management",
      "Audit Logging",
      "Security Monitoring",
      "API Integration",
      "Risk Management",
    ],
  },

  "elearning-platform": {
    title: "E-Learning Platform Development",
    category: "Education",
    introduction:
      "An online learning experience that helps learners discover courses, access educational content, and follow learning activities.",
    industry: "Education & Training",
    type: "Web Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Desktop, Tablet & Mobile",
    challenges: [
      "Learners need a straightforward way to discover courses and find the materials for each lesson.",
      "Course content can become difficult to maintain when lessons, resources, and learner records are stored separately.",
      "Educators and administrators need visibility into course organization and learner progress where tracking is required.",
    ],
    solution: [
      "Allow learners to browse courses and access organized lessons and learning resources.",
      "Structure course content into modules or lessons and maintain learning materials.",
      "Support learning progress and resumption where included in the implementation.",
      "Provide an administrative workflow for maintaining course information.",
    ],
    features: [
      {
        title: "Course & Lesson Management",
        description:
          "Create course structures, organize lessons, and maintain associated learning resources.",
      },
      {
        title: "Learner Access",
        description:
          "Provide a consistent interface for discovering courses and accessing permitted materials.",
      },
      {
        title: "Progress Tracking",
        description:
          "Track completed lessons or course progress when this functionality is included.",
      },
      {
        title: "Learning Administration",
        description:
          "Manage course details and educational content through a structured interface.",
      },
    ],
    specialFeatures:
      "Possible extensions include quizzes, certificates, instructor dashboards, course discussions, subscriptions, and live-class integrations. The final case study should identify which features were actually implemented.",
    results:
      "The intended result is a more accessible learning experience and a clearer way to maintain course content. Engagement and completion-rate claims should be based on actual analytics.",
    technologies: [
      "Learning Management",
      "Course Administration",
      "Content Delivery",
      "Progress Tracking",
      "Responsive Interface",
      "Third-Party Integrations",
    ],
  },

  "restaurant-review-rating": {
    title: "Restaurant Review & Rating System",
    category: "Food & Hospitality",
    introduction:
      "A restaurant discovery and feedback platform for exploring dining options, comparing details, and sharing experiences.",
    industry: "Food & Hospitality",
    type: "Web Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Desktop, Tablet & Mobile",
    challenges: [
      "Restaurant information may be scattered across multiple sources, making it harder for diners to compare options.",
      "Visitors need a clear way to find restaurant details such as location, cuisine, opening hours, and services.",
      "Restaurant feedback needs to be presented consistently and moderated according to platform rules.",
    ],
    solution: [
      "Let visitors browse restaurant profiles and review key information.",
      "Present ratings and customer reviews alongside relevant restaurant details.",
      "Allow administrators to maintain restaurant information and manage feedback where moderation is implemented.",
    ],
    features: [
      {
        title: "Restaurant Discovery",
        description:
          "Organize restaurant listings by cuisine, location, and category.",
      },
      {
        title: "Reviews & Ratings",
        description:
          "Display customer feedback and rating information consistently.",
      },
      {
        title: "Restaurant Profiles",
        description:
          "Maintain descriptions, contact details, location, opening hours, and supported information.",
      },
      {
        title: "Review Administration",
        description:
          "Support authorized review of reported content when moderation tools are implemented.",
      },
    ],
    specialFeatures:
      "Potential additions include verified reviews, review reporting, search filters, map integration, owner-managed profiles, and reservation links. Only confirmed features should be described as live.",
    results:
      "The platform is intended to make restaurant information easier to explore and customer feedback easier to understand. Claims about increased visits or engagement should be based on verified usage data.",
    technologies: [
      "Restaurant Discovery",
      "Review Management",
      "Rating System",
      "Search & Filtering",
      "Responsive Interface",
      "Maps / External Integrations",
    ],
  },

  "ai-solutions": {
    title: "AI-Powered Business Solutions",
    category: "Artificial Intelligence",
    introduction:
      "AI-assisted tools that help businesses handle selected communication, information-processing, and repetitive operational tasks.",
    industry: "Business & Technology",
    type: "AI Application",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Web & Cloud",
    challenges: [
      "Teams can spend significant time answering repetitive questions and sorting incoming information.",
      "Important requests may need to be categorized or routed before the right person can respond.",
      "Businesses want to introduce AI without losing control over sensitive actions or customer communication.",
    ],
    solution: [
      "Generate suggested responses to supported customer questions using approved business information.",
      "Classify and route incoming requests where required integrations are available.",
      "Allow staff to review AI-generated suggestions and handle cases requiring human judgment.",
      "Connect AI capabilities to selected business tools through defined APIs and workflow rules.",
    ],
    features: [
      {
        title: "AI-Assisted Responses",
        description:
          "Generate suggested replies for supported questions using configured information and instructions.",
      },
      {
        title: "Information Processing",
        description:
          "Summarize or categorize supported incoming text to help teams review requests.",
      },
      {
        title: "Business Integrations",
        description:
          "Connect workflows to selected forms, CRMs, communication channels, or internal tools.",
      },
      {
        title: "Human Review & Controls",
        description:
          "Define review steps and boundaries for sensitive actions and business processes.",
      },
    ],
    specialFeatures:
      "AI behavior depends on its model, instructions, connected data, integrations, and safeguards. Human escalation, logging, and approval steps can be designed around the use case.",
    results:
      "The objective is to reduce repetitive handling and help teams process supported requests more consistently. Accuracy, response-time, and productivity claims should be made only after testing against real tasks.",
    technologies: [
      "Artificial Intelligence",
      "Large Language Models",
      "Prompt & Knowledge Design",
      "API Integration",
      "Workflow Automation",
      "Human-in-the-Loop Review",
    ],
  },

  "workflow-automation": {
    title: "Intelligent Workflow Automation",
    category: "Automation",
    introduction:
      "A workflow automation solution that connects business tools and moves routine tasks through consistent, clearly defined steps.",
    industry: "Business Operations",
    type: "Automation System",
    engagement: "Defined during discovery",
    duration: "Based on project scope",
    staff: "Scoped to requirements",
    platforms: "Web & Cloud",
    challenges: [
      "Staff may need to copy information manually between forms, spreadsheets, email, and customer-management tools.",
      "Follow-ups and internal notifications can be missed when they depend on someone remembering each step.",
      "Teams need to understand whether an automated process succeeded and what to do when a step fails.",
    ],
    solution: [
      "Capture incoming information from supported forms, webhooks, or connected applications.",
      "Validate, classify, and route information using defined rules.",
      "Create or update records and send notifications through connected services.",
      "Review workflow runs and investigate failed steps where monitoring is configured.",
    ],
    features: [
      {
        title: "Automated Data Intake",
        description:
          "Capture incoming leads, requests, or records from supported forms and applications.",
      },
      {
        title: "Rules & Task Routing",
        description:
          "Apply defined conditions to send each item to the relevant workflow or team.",
      },
      {
        title: "Notifications & Follow-Ups",
        description:
          "Trigger emails or internal notifications based on agreed rules and timing.",
      },
      {
        title: "System Integrations",
        description:
          "Move supported information between tools through APIs, webhooks, and integrations.",
      },
      {
        title: "Execution Monitoring",
        description:
          "Review run status and errors when logging and monitoring are included.",
      },
    ],
    specialFeatures:
      "Depending on the use case, workflows can include scheduled jobs, retry rules, duplicate checks, error notifications, approval steps, and CRM or database updates. The final scope should document actual triggers, conditions, and connected services.",
    results:
      "The intended benefit is fewer repetitive manual steps and a more consistent process for moving work between systems. Time savings and error reductions should be reported only after measurement.",
    technologies: [
      "Workflow Automation",
      "Webhooks",
      "API Integration",
      "Scheduled Jobs",
      "CRM & Database Integration",
      "Error Handling & Monitoring",
    ],
  },
};

const emptyForm: QuoteForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={reduceMotion ? undefined : fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-xs">
        <span className="h-px w-7 bg-neutral-400" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-left text-[clamp(1.9rem,3.4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#242424]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-white/20 bg-white/[0.06] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/70 focus:bg-white/[0.09]";

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const [slug, setSlug] = useState<string | null>(
    typeof params === "object" &&
      "slug" in params &&
      typeof params.slug === "string"
      ? params.slug
      : null,
  );
  const [form, setForm] = useState<QuoteForm>(emptyForm);
  const [emailPrepared, setEmailPrepared] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.resolve(params)
      .then((resolved) => {
        if (active) setSlug(resolved.slug);
      })
      .catch(() => {
        if (active) setSlug("");
      });

    return () => {
      active = false;
    };
  }, [params]);

  const project = slug ? projects[slug] : undefined;

  function updateField(field: keyof QuoteForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!project) return;

    const subject = encodeURIComponent(`Project Inquiry: ${project.title}`);
    const body = encodeURIComponent(
      [
        `Project: ${project.title}`,
        "",
        `Full Name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        "",
        "Project Details:",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:quarrysoftware@gmail.com?subject=${subject}&body=${body}`;

    setEmailPrepared(true);
  }

  if (!slug) {
    return (
      <main className="min-h-screen bg-[#f5f4f0]">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-5 sm:px-8 lg:px-12">
          <p className="text-sm text-neutral-500">Loading case study…</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#f5f4f0] text-[#242424]">
        <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Quarry / Case Studies
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            This case study is not available yet.
          </h1>
          <Link
            href="/case-studies"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-[#071a30] px-5 py-3 text-sm font-semibold !text-white shadow-md transition-colors hover:bg-[#132d49] hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52644b] focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Back to case studies
          </Link>
        </section>
        <CustomerSupport />
      </main>
    );
  }

  const overview = [
    { label: "Industry", value: project.industry, icon: Layers3 },
    { label: "Project type", value: project.type, icon: MonitorSmartphone },
    { label: "Engagement", value: project.engagement, icon: Users },
    { label: "Duration", value: project.duration, icon: Clock3 },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f4f0] text-[#242424]">
      <header className="relative isolate flex min-h-[30vh] items-center overflow-hidden bg-[#071a30] pt-20 text-white sm:pt-24">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/quarry/ai.jpg')" }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061326]/95 via-[#071a30]/85 to-[#071a30]/65"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071a30]/45 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-8 sm:py-8 md:px-[6vw]">
          <Reveal>
            <Link
              href="/case-studies"
              className="inline-flex min-h-8 items-center gap-2 rounded-sm border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs font-medium !text-white/85 transition-colors duration-300 hover:border-white/50 hover:bg-white/10 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft size={14} />
              All case studies
            </Link>

            <div className="mt-4 max-w-4xl sm:mt-5">
              <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-xs">
                <span className="h-px w-6 bg-white/60" />
                {project.category}
              </p>

              <h1 className="mt-2 max-w-4xl text-left text-[clamp(1.8rem,3.8vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.045em] text-white">
                {project.title}
              </h1>
            </div>
          </Reveal>
        </div>
      </header>

      <section
        id="project-details"
        className="scroll-mt-20 border-b border-black/[0.08] bg-white"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-5 py-7 sm:px-8 md:grid-cols-2 md:gap-4 md:px-[6vw] lg:grid-cols-4 lg:py-8">
          {overview.map((item) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.label}>
                <div className="group flex h-full items-start gap-4 rounded-md border border-black/[0.07] bg-[#fbfaf7] p-5 shadow-[0_3px_12px_rgba(20,28,35,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.13] hover:bg-white hover:shadow-[0_12px_30px_rgba(20,28,35,0.09)]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-black/[0.07] bg-white shadow-sm transition-colors duration-300 group-hover:border-[#52644b]/25 group-hover:bg-[#f0f2ed]">
                    <Icon
                      size={19}
                      strokeWidth={1.6}
                      className="text-[#52644b]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#242424]">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:px-[6vw] md:py-16 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-14 lg:py-20">
        <article className="min-w-0 space-y-14 sm:space-y-16">
          <Reveal>
            <section>
              <SectionHeading
                eyebrow="The Challenge"
                title="Understanding the problem before building the solution."
                description="Every effective digital product starts with a clear understanding of the operational challenges it needs to address."
              />
              <div className="mt-7 grid gap-3">
                {project.challenges.map((paragraph, index) => (
                  <div
                    key={paragraph}
                    className="flex gap-4 rounded-md border border-black/[0.07] bg-white/75 p-5 shadow-[0_4px_16px_rgba(20,28,35,0.035)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(20,28,35,0.07)] sm:p-6"
                  >
                    <span className="mt-0.5 text-xs font-semibold tracking-[0.12em] text-[#52644b]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="border-t border-black/10 pt-10 sm:pt-12">
              <SectionHeading
                eyebrow="The Solution"
                title="A practical system designed around real workflows."
                description="The solution brings relevant tasks and information into a more structured digital experience."
              />
              <div className="mt-7 divide-y divide-black/[0.08] rounded-md border border-black/[0.07] bg-white/75 px-5 shadow-[0_5px_20px_rgba(20,28,35,0.04)] sm:px-7">
                {project.solution.map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 py-5 first:pt-6 last:pb-6"
                  >
                    <CheckCircle2
                      size={19}
                      strokeWidth={1.7}
                      className="mt-1 shrink-0 text-[#52644b]"
                      aria-hidden="true"
                    />
                    <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="border-t border-black/10 pt-10 sm:pt-12">
              <SectionHeading
                eyebrow="Core Capabilities"
                title="Tools that support everyday operations."
                description="A closer look at the core capabilities described for this solution."
              />
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <article
                    key={feature.title}
                    className="group relative overflow-hidden rounded-md border border-black/[0.08] bg-white p-6 shadow-[0_5px_20px_rgba(20,28,35,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#52644b]/30 hover:shadow-[0_16px_34px_rgba(20,28,35,0.11)] sm:p-7"
                  >
                    <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#52644b] transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="mb-6 block h-px w-10 bg-[#52644b]/70 transition-[width] duration-300 group-hover:w-16" />
                    <h3 className="text-lg font-bold tracking-[-0.025em] text-[#242424] sm:text-xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="border-t border-black/10 pt-10 sm:pt-12">
              <SectionHeading
                eyebrow="Implementation Details"
                title="Flexible enough for your business requirements."
              />
              <div className="mt-7 rounded-md border border-black/[0.07] bg-white p-6 shadow-[0_5px_20px_rgba(20,28,35,0.04)] sm:p-8">
                <div className="mb-5 h-1 w-12 rounded-full bg-[#52644b]" />
                <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                  {project.specialFeatures}
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="border-t border-black/10 pt-10 sm:pt-12">
              <SectionHeading
                eyebrow="Expected Outcomes"
                title="Designed to make work clearer and more manageable."
              />
              <div className="mt-7 rounded-md border border-black/[0.07] bg-white p-6 shadow-[0_5px_20px_rgba(20,28,35,0.04)] sm:p-8">
                <p className="max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                  {project.results}
                </p>
                <p className="mt-5 border-t border-black/[0.07] pt-4 text-xs leading-6 text-neutral-500">
                  Outcomes depend on the final implementation and how the
                  solution is used. Quantitative results should be published
                  only when supported by verified project data.
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="border-t border-black/10 pt-10 sm:pt-12">
              <SectionHeading
                eyebrow="Technology & Capabilities"
                title="The building blocks behind the solution."
                description="Relevant technologies and capabilities for this project category."
              />
              <div className="mt-7 flex flex-wrap gap-2.5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-sm border border-black/[0.08] bg-white px-4 py-2.5 text-xs font-medium text-neutral-700 shadow-[0_2px_8px_rgba(20,28,35,0.025)] transition-all duration-200 hover:border-[#52644b]/35 hover:bg-[#f0f2ed] hover:text-[#242424] sm:text-sm"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="relative isolate overflow-hidden rounded-md bg-[#071a30] p-7 text-white shadow-[0_18px_48px_rgba(7,26,48,0.18)] sm:p-9 lg:p-11">
              <div
                className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <div
                className="absolute -right-5 -top-5 -z-10 h-36 w-36 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <div className="relative max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-xs">
                  Have a similar challenge?
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                  Let’s build the right solution for your business.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                  Tell us what you are trying to solve, and we can discuss the
                  scope and a practical next step.
                </p>
                <Link
                  href="#request-quote"
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-white bg-white px-5 py-3 text-sm font-semibold !text-[#071a30] shadow-lg transition-all duration-300 hover:border-[#e9ecef] hover:bg-[#e9ecef] hover:!text-[#071a30] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a30]"
                >
                  Discuss your project
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </section>
          </Reveal>
        </article>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <section className="rounded-md border border-black/[0.08] bg-white p-6 shadow-[0_8px_28px_rgba(20,28,35,0.07)] sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-xs">
                Project Overview
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-[#242424]">
                At a glance
              </h2>
              <div className="mt-5 divide-y divide-black/[0.08]">
                {[
                  ["Industry", project.industry],
                  ["Project type", project.type],
                  ["Engagement", project.engagement],
                  ["Duration", project.duration],
                  ["Team", project.staff],
                  ["Platforms", project.platforms],
                ].map(([label, value]) => (
                  <div key={label} className="py-3.5 first:pt-0 last:pb-0">
                    <p className="text-xs text-neutral-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#242424]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section
              id="request-quote"
              className="mt-5 scroll-mt-24 rounded-md bg-[#071a30] p-6 text-white shadow-[0_14px_36px_rgba(7,26,48,0.18)] sm:p-7"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-xs">
                Start a Conversation
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-white">
                Tell us about your project.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Share a few details and start a conversation with Quarry.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-xs font-medium text-white/85"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium text-white/85"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-medium text-white/85"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium text-white/85"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-between gap-3 rounded-sm border border-white bg-white px-5 py-3.5 text-left text-sm font-bold !text-[#071a30] shadow-md transition-all duration-300 hover:border-[#e9ecef] hover:bg-[#e9ecef] hover:!text-[#071a30] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a30]"
                >
                  <span>Prepare Email</span>
                  <ArrowUpRight size={17} className="shrink-0" />
                </button>

                {emailPrepared && (
                  <p
                    role="status"
                    className="flex items-start gap-2 text-xs leading-5 text-white/80"
                  >
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                    Your email application should open with the inquiry details.
                    Send the email there to complete your request.
                  </p>
                )}

                <p className="text-xs leading-5 text-white/55">
                  This form opens your email application. It does not directly
                  send or store information on a server.
                </p>
              </form>
            </section>
          </Reveal>
        </aside>
      </div>

      <CustomerSupport />
    </main>
  );
}
