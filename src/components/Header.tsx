"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, HamburgerIcon } from "./icons";
import { HEADER_LINKS, MENU_LINKS } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1240px] items-start justify-between px-4 pt-3">
        <Link
          href="/"
          aria-label="Azure Properties"
          className="block size-[90px]"
        >
          <Image
            src="/images/azure-logo.svg"
            alt=""
            width={90}
            height={90}
            priority
            className="size-[90px]"
          />
        </Link>

        <nav className="hidden items-center gap-20 pt-[30px] md:flex">
          {HEADER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-fluid-small font-light text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="mt-[31px] size-7 md:hidden"
        >
          <HamburgerIcon />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 bg-marine md:hidden"
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
