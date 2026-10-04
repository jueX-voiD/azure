"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HEADER_LINKS, MENU_LINKS } from "@/lib/site";

// Burger that morphs into a cross (same technique as the Taipo site): the middle line fades,
// the outer lines move to the centre and rotate. Geometry follows the Azure 28px icon.
function BurgerIcon({ open, color }: { open: boolean; color: string }) {
  const line =
    "absolute block h-[1.415px] rounded-full transition-all duration-300 ease-in-out origin-center";
  return (
    <span className="relative block size-7">
      <span
        className={line}
        style={{
          backgroundColor: color,
          top: 6.3,
          left: open ? 4 : 4.375,
          width: open ? 20 : 18.375,
          transform: open ? "translateY(7px) rotate(45deg)" : "none",
        }}
      />
      <span
        className={line}
        style={{
          backgroundColor: color,
          top: 13.3,
          left: 7.875,
          width: 14.875,
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className={line}
        style={{
          backgroundColor: color,
          top: 20.3,
          left: open ? 4 : 11.383,
          width: open ? 20 : 11.375,
          transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
        }}
      />
    </span>
  );
}

// "overlay": white text over the home hero. "light": in-flow bar with dark text for inner pages.
export default function Header({
  variant = "overlay",
}: {
  variant?: "overlay" | "light";
}) {
  const [open, setOpen] = useState(false);
  const light = variant === "light";

  // Lock page scroll while the full-screen menu is open; Escape closes it.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open]);

  function toggle() {
    // The bar scrolls away with the page, so make sure the cross lands where the burger was.
    if (!open && window.scrollY > 0) window.scrollTo({ top: 0 });
    setOpen((o) => !o);
  }

  return (
    <header
      className={light ? "relative z-30" : "absolute inset-x-0 top-0 z-30"}
    >
      <div className={light ? "px-4 py-3" : "py-3 px-4"}>
        <div
          className={`mx-auto flex max-w-[1240px] items-center justify-between ${light ? "" : "px-0"}`}
        >
          <Link
            href="/"
            aria-label="Azure Properties"
            className="block size-[90px]"
          >
            <Image
              src={
                light ? "/images/azure-logo-dark.svg" : "/images/azure-logo.svg"
              }
              alt=""
              width={90}
              height={90}
              priority
              className="size-[90px]"
            />
          </Link>

          <nav className="hidden items-center gap-20 md:flex">
            {HEADER_LINKS.map((l) => (
              <div
                key={l.href}
                className="group border-b border-transparent hover:border-marine"
              >
                <Link
                  href={l.href}
                  className={`text-fluid-small font-light transition-colors duration-[400ms] group-hover:text-marine ${
                    light ? "text-black" : "text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Always above the overlay so it can turn into the close button. */}
          <button
            type="button"
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[60] cursor-pointer transition-opacity hover:opacity-80 md:hidden"
          >
            <BurgerIcon
              open={open}
              color={light && !open ? "#090909" : "#ffffff"}
            />
          </button>
        </div>
      </div>

      {/* Full-screen menu: slides down from the top. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 h-screen overflow-auto bg-marine bg-[url(/images/footer-wave.svg)] bg-contain bg-bottom bg-no-repeat transition-all duration-500 ease-out md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-full opacity-0"
        }`}
      >
        <div className="px-5 pt-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Azure Properties"
            className="block w-[90px]"
          >
            <Image
              src="/images/site-logo.png"
              alt=""
              width={90}
              height={89}
              className="h-[89px] w-[90px]"
            />
          </Link>
        </div>
        <nav className="mt-[52px] flex flex-col items-center gap-8">
          {MENU_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-fluid-h3 font-light text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
