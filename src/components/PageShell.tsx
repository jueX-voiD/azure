"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

const FADE_OUT_MS = 200;

// Same idea as the Taipo site: only the page content fades (200ms out, 300ms in, see .page-fade /
// .page-enter in globals.css). The header and footer live here, so they stay put while it happens.
export default function PageShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [out, setOut] = useState(false);
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function start(url: URL) {
      pending.current = url.pathname;
      setOut(true);
      later(
        () => router.push(url.pathname + url.search + url.hash),
        FADE_OUT_MS,
      );
      // Safety net: never leave the page faded out if navigation stalls.
      later(() => {
        pending.current = null;
        setOut(false);
      }, FADE_OUT_MS + 4000);
    }

    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (including in-page hash links): normal behaviour.
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      if (pending.current) return; // a transition is already running
      start(url);
    }

    // Programmatic navigation (e.g. the contact form): dispatch a cancelable "azure:navigate" event.
    function onNavigate(e: Event) {
      if (pending.current) return;
      const url = new URL(
        (e as CustomEvent<string>).detail,
        window.location.href,
      );
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      start(url);
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener("azure:navigate", onNavigate);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("azure:navigate", onNavigate);
    };
  }, [later, router]);

  // The route changed: start the new page at the top (or at its #hash) and fade it in.
  useEffect(() => {
    if (pending.current !== pathname) return;
    pending.current = null;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    setOut(false);
  }, [pathname]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className={pathname === "/thank-you" ? "bg-[#EBF4F5]" : undefined}>
      <Header variant={pathname === "/" ? "overlay" : "light"} />
      <div className={`page-fade ${out ? "is-out" : ""}`}>
        <div key={pathname} className="page-enter">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
