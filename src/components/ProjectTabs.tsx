"use client";

import { useRef, useState } from "react";
import AmenityList from "./AmenityList";
import ProjectGallery from "./ProjectGallery";
import type { Project } from "@/lib/projects";

// Residential projects: a tab list (vertical on desktop, a horizontal scroller up to 1024px) and a detail card.
export default function ProjectTabs({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: projects.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + projects.length) % projects.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const project = projects[active];

  return (
    <div className="flex w-full flex-col gap-3 md:gap-8 lg:flex-row lg:gap-16">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="flex flex-nowrap gap-6 overflow-x-auto lg:w-[440px] lg:shrink-0 lg:flex-col lg:gap-2 lg:overflow-visible"
      >
        {projects.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`project-tab-${i}`}
              aria-selected={selected}
              aria-controls="project-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`cursor-pointer rounded-[2px] max-lg:border-y max-lg:border-transparent px-3 py-[10px] text-left font-light whitespace-nowrap text-marine transition-colors max-lg:shrink-0 lg:rounded-lg lg:px-6 lg:py-5 lg:whitespace-normal ${
                selected
                  ? "bg-sand/[0.145]"
                  : "bg-page lg:hover:bg-sand/[0.145]"
              } ${selected ? "" : ""}`}
            >
              <span className="flex flex-col items-start gap-2">
                <span className="text-fluid-body flex items-center gap-4">
                  {p.title}
                  {p.status && (
                    <span className="rounded-full bg-[#D7EAF0] px-4 py-2 text-[10px] leading-4 text-black max-lg:hidden">
                      {p.status}
                    </span>
                  )}
                </span>
                <span className="text-fluid-field text-black max-lg:hidden">
                  {p.subtitle}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${active}`}
        className="flex min-w-0 flex-col gap-6 lg:flex-1"
      >
        <div className="relative">
          {project.status && (
            <div className="text-marine absolute top-3 right-3 z-20 rounded-full bg-[#D7EAF0] px-4 py-2 text-[14px] leading-6">
              {project.status}
            </div>
          )}
          <ProjectGallery
            key={active}
            images={project.images}
            imageClassName="h-[400px]"
            priority={active === 0}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <p className="text-fluid-field font-light">AMENITIES</p>
            <AmenityList items={project.amenities} />
          </div>
          <div className="text-fluid-small text-justify font-light">
            {project.body.map((para, k) => (
              <p key={k} className={k > 0 ? "mt-[1.6em]" : ""}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
