"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, HamburgerIcon } from "./icons";
import { HEADER_LINKS, MENU_LINKS } from "@/lib/site";

// "overlay": white text over the home hero. "light": in-flow bar with dark text for inner pages.
export default function Header({
  variant = "overlay",
}: {
  variant?: "overlay" | "light";
}) {
  const [open, setOpen] = useState(false);
  const light = variant === "light";

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <header
      className={light ? "relative z-30" : "absolute inset-x-0 top-0 z-30"}
    >
      <div className={light ? "px-4 py-3" : "py-3"}>
        <div
          className={`mx-auto flex max-w-[1240px] items-center justify-between ${light ? "" : "px-4"}`}
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

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="size-7 md:hidden"
          >
            <HamburgerIcon stroke={light ? "#090909" : "white"} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 overflow-auto bg-marine bg-[url(/images/footer-wave.svg)] bg-contain bg-bottom bg-no-repeat md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between px-5 pt-3">
              <Image
                src="/images/site-logo.png"
                alt=""
                width={90}
                height={89}
                className="h-[89px] w-[90px]"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="mt-[29px] flex size-8 items-center justify-center"
              >
                <CloseIcon />
              </button>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
