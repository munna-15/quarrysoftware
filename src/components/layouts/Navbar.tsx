"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";


const navigation = [
  {
    label: "Services",
    items: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "AI & Automation", href: "/services/ai-automation" },
      { label: "Cloud & Server", href: "/services/cloud-server" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Quarry", href: "/about" },
      { label: "Our Approach", href: "/approach" },
    ],
  },
];

const easing = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const directionStartY = useRef(0);
  const scrollDirection = useRef<"up" | "down" | null>(null);
  const mobileOpenRef = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  // Scroll-aware navbar animation.
  useEffect(() => {

    console.log("[Navbar] scroll effect initialized", {
      time: performance.now(),
      pathname: window.location.pathname,
    });
    
    let frame = 0;

    const syncInitialPosition = () => {
      const y = Math.max(0, window.scrollY);
      lastScrollY.current = y;
      directionStartY.current = y;
      setScrolled(y > 24);
    };

    frame = window.requestAnimationFrame(syncInitialPosition);

    const updateScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 24);

      if (currentY <= 24) {
        setVisible(true);
        scrollDirection.current = null;
        directionStartY.current = currentY;
      } else if (!mobileOpenRef.current && Math.abs(delta) > 1) {
        const nextDirection = delta > 0 ? "down" : "up";

        if (scrollDirection.current !== nextDirection) {
          scrollDirection.current = nextDirection;
          directionStartY.current = currentY;
        }

        const distance = Math.abs(currentY - directionStartY.current);

        if (nextDirection === "down" && currentY > 120 && distance > 16) {
          setVisible(false);
          setActiveDropdown(null);
        }

        if (nextDirection === "up" && distance > 8) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      frame = window.requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
      ticking.current = false;
    };
  }, []);

  // Close desktop dropdown on outside click.
  useEffect(() => {
    if (!activeDropdown || mobileOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeDropdown, mobileOpen]);

  // Escape closes menus.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock page scrolling without changing the layout width.
  useEffect(() => {
    if (!mobileOpen) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousScrollBehavior = html.style.scrollBehavior;

    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);

    const computedPaddingRight =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    // Compensate for the scrollbar before hiding it.
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
    }

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      html.style.scrollBehavior = previousScrollBehavior;
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((label: string) => {
    setActiveDropdown((current) => (current === label ? null : label));
  }, []);

  const handleNavigationClick = useCallback(
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      closeMenus();

      if (pathname === href) {
        event.preventDefault();

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    },
    [closeMenus, pathname],
  );

  const mainLinkClass =
    "flex min-h-[64px] w-full items-center border-b border-white/15 text-left text-[21px] font-medium leading-none tracking-[-0.025em] !text-white transition-colors duration-200 sm:min-h-[68px] sm:text-[22px]";

  const dropdownLinkClass =
    "flex min-h-[50px] w-full items-center rounded-lg px-4 text-[15px] font-medium leading-snug !text-white/80 transition-colors duration-200 hover:bg-white/[0.06] hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

  return (
    <>
      <header
        className={`fixed inset-x-0 z-[1000] w-full transition-transform duration-[850ms] ${easing} will-change-transform ${
          scrolled && !mobileOpen ? "top-3" : "top-0"
        } ${
          visible || mobileOpen
            ? "translate-y-0"
            : "-translate-y-[calc(100%+24px)]"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto w-full border-b transition-[width,border-radius,background-color,box-shadow] duration-700 ${easing} ${
            scrolled && !mobileOpen
              ? "xl:w-[80%] xl:rounded-b-[18px]"
              : "w-full rounded-none"
          } ${
            mobileOpen
              ? "border-transparent bg-[#09111b]"
              : scrolled
                ? "border-white/10 bg-[#09111b]/95 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto grid h-[64px] w-full max-w-[1800px] grid-cols-[1fr_auto] items-center gap-3 px-5 sm:h-[70px] sm:px-7 xl:h-[80px] xl:grid-cols-[minmax(130px,1fr)_auto_minmax(174px,1fr)] xl:px-6 2xl:px-10">
            <Link
              href="/"
              aria-label="Quarry Software home"
              onClick={handleNavigationClick("/")}
              className="flex w-fit min-w-0 shrink-0 items-center"
            >
              <Image
                src="/images/quarry/logo-white.png"
                alt="Quarry Software"
                width={220}
                height={70}
                priority
                className="h-auto w-[150px] object-contain sm:w-[175px]"
              />
            </Link>

            {/* Desktop navigation */}
            <div
              ref={dropdownRef}
              className="hidden h-full min-w-0 items-center justify-center xl:flex"
            >
              {navigation.map((item) => {
                const isOpen = activeDropdown === item.label;

                return (
                  <div key={item.label} className="relative h-full shrink-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex h-full items-center gap-2 whitespace-nowrap px-3 text-[13px] font-semibold transition-colors 2xl:px-4 2xl:text-[14px] ${
                        isOpen
                          ? "!text-white"
                          : "!text-white/85 hover:!text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        strokeWidth={1.8}
                        className={`shrink-0 !text-white/75 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`invisible absolute left-1/2 top-full z-[1010] w-[320px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-out ${
                        isOpen ? "!visible !translate-y-0 !opacity-100" : ""
                      }`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c141e] p-2 shadow-[0_28px_75px_rgba(0,0,0,0.42)]">
                        <p className="px-4 pb-3 pt-3 text-[10px] font-semibold uppercase tracking-[0.22em] !text-white/45">
                          {item.label === "Services"
                            ? "What we do"
                            : "Get to know us"}
                        </p>

                        <div className="border-t border-white/[0.08] pt-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={handleNavigationClick(subItem.href)}
                              tabIndex={isOpen ? 0 : -1}
                              className="flex min-h-[52px] items-center rounded-xl px-4 text-[15px] font-medium !text-white/85 transition-[background-color,color,padding-left] duration-200 hover:bg-white/[0.06] hover:!text-white hover:pl-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link
                href="/case-studies"
                onClick={handleNavigationClick("/case-studies")}
                className="flex h-full shrink-0 items-center whitespace-nowrap px-3 text-[13px] font-semibold !text-white/85 transition-colors hover:!text-white 2xl:px-4 2xl:text-[14px]"
              >
                Case Studies
              </Link>
            </div>

            <div className="hidden min-w-0 justify-self-end xl:block">
              <Link
                href="/contact"
                onClick={handleNavigationClick("/contact")}
                className="inline-flex h-[44px] w-[174px] items-center justify-center whitespace-nowrap rounded-full border border-white/75 bg-transparent px-4 text-[13px] font-semibold !text-white transition-colors duration-300 hover:border-white hover:!bg-white hover:!text-[#09111b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Discuss a project
              </Link>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="quarry-mobile-navigation"
              onClick={() => {
                setMobileOpen((open) => !open);
                setActiveDropdown(null);
              }}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 !text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              {mobileOpen ? (
                <X size={21} strokeWidth={1.6} />
              ) : (
                <Menu size={21} strokeWidth={1.6} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="quarry-mobile-navigation"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-[990] bg-[#09111b] !text-white transition-[transform,visibility] duration-500 ${easing} xl:hidden ${
          mobileOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto overscroll-contain px-6 pb-8 pt-[100px] sm:px-9 sm:pt-[110px]">
          <Link
            href="/contact"
            onClick={handleNavigationClick("/contact")}
            tabIndex={mobileOpen ? 0 : -1}
            className="mb-7 flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/75 bg-white px-5 text-[14px] font-semibold !text-[#09111b] transition-colors duration-300 hover:bg-transparent hover:!text-white"
          >
            Discuss a project
          </Link>

          <div className="border-t border-white/15">
            {navigation.map((item) => {
              const isOpen = activeDropdown === item.label;

              return (
                <div key={item.label} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleDropdown(item.label)}
                    className={mainLinkClass}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={20}
                      strokeWidth={1.7}
                      className={`ml-auto shrink-0 !text-white/65 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mb-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={handleNavigationClick(subItem.href)}
                            tabIndex={mobileOpen && isOpen ? 0 : -1}
                            className={dropdownLinkClass}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href="/case-studies"
              onClick={handleNavigationClick("/case-studies")}
              tabIndex={mobileOpen ? 0 : -1}
              className={mainLinkClass}
            >
              Case Studies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
