"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowLink from "./ArrowLink";
import { FEATURED_PROJECTS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// Same behaviour as the WordPress site: pin the wrapper and slide the slides
// horizontally, scrub 1, snapping per slide, over 2x the wrapper width.
const SCROLL_SPEED_MULTIPLIER = 2;

export default function FeaturedProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(
        ".dm-horizontal-section",
        wrapper,
      );
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => "+=" + wrapper.offsetWidth * SCROLL_SPEED_MULTIPLIER,
        },
      });
    }, wrapper);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-6 px-5 pb-10 text-center">
        <h2 className="text-fluid-h2 font-normal text-marine">
          Featured Projects
        </h2>
        <p className="text-fluid-body font-light">
          We build with care and purpose. Every project is thoughtfully planned
          to create communities that last. From commercial to residential
          projects, our commitment to excellence stays the same.
        </p>
      </section>

      <div
        ref={wrapperRef}
        className="flex h-[932px] w-full overflow-hidden md:h-screen"
      >
        {FEATURED_PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className="dm-horizontal-section relative h-full w-full shrink-0"
          >
            <Image
              src={p.image}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              style={{ "--pos": p.imagePosition } as React.CSSProperties}
              className="object-cover object-[var(--pos)] md:object-center"
            />
            {/* Left half on tablet/desktop; a solid panel over the top half of the photo on mobile. */}
            <div className="relative flex flex-col items-center bg-page px-5 pt-[30px] text-center max-md:min-h-[466px] md:h-full md:w-1/2 md:items-end md:justify-center md:bg-transparent md:p-0 md:text-left">
              <div className="flex w-full flex-col md:items-start lg:w-[610px]">
                <div className="flex w-full flex-col gap-4 md:gap-6 md:p-5 lg:w-[440px]">
                  <h6 className="text-fluid-h3 font-normal text-marine">
                    {p.title}
                  </h6>
                  <p className="text-fluid-small font-light">
                    {p.body[0]}
                    <br />
                    <br />
                    {p.body[1]}
                  </p>
                  <ArrowLink
                    href={p.href}
                    className="mt-[15px] self-center md:mt-4 md:self-start"
                  >
                    Explore
                  </ArrowLink>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="flex justify-center px-5 py-[60px] md:py-[100px]">
        <ArrowLink href="/projects">View all properties</ArrowLink>
      </section>
    </>
  );
}
