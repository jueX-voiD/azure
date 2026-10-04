import type { Metadata } from "next";
import Image from "next/image";
import AmenityList from "@/components/AmenityList";
import ArrowLink from "@/components/ArrowLink";
import ContactSection from "@/components/ContactSection";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectTabs from "@/components/ProjectTabs";
import { getProjectsContent } from "@/lib/content";
import type { Project } from "@/lib/types";

export const metadata: Metadata = { title: "Projects - Azure" };

const subtitle =
  "text-[length:clamp(1.125rem,0.9716rem+0.6818vw,1.5rem)] leading-[1.3] font-normal text-center";

function Paragraphs({
  items,
  className,
}: {
  items: string[];
  className: string;
}) {
  return (
    <div className={className}>
      {items.map((para, k) => (
        <p key={k} className={k > 0 ? "mt-[1.6em]" : ""}>
          {para}
        </p>
      ))}
    </div>
  );
}

function VillaCard({ v }: { v: Project }) {
  return (
    <article className="flex flex-col justify-between gap-6 md:gap-10 lg:gap-6">
      <div className="flex flex-col gap-3 text-center">
        <h3 className="text-fluid-h3 font-normal text-marine">{v.title}</h3>
        {v.subtitle && (
          <p className="text-fluid-field font-light">{v.subtitle}</p>
        )}
      </div>
      {v.images.length > 0 && <ProjectGallery images={v.images} />}
      <div className="mx-auto mt-4 flex w-full max-w-[820px] flex-col gap-12">
        {v.amenities.length > 0 && (
          <div className="flex flex-col gap-5">
            <p className="text-fluid-field text-center font-light">AMENITIES</p>
            <AmenityList items={v.amenities} align="center" />
          </div>
        )}
        <Paragraphs
          items={v.body}
          className="text-fluid-small text-center font-light"
        />
      </div>
    </article>
  );
}

function CommercialBlock({ c }: { c: Project }) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col gap-6 text-center lg:max-w-[860px]">
        <h2 className="text-fluid-h2 font-normal text-marine">{c.title}</h2>
        {c.subtitle && <p className={subtitle}>{c.subtitle}</p>}
      </div>
      {c.images.length > 0 && (
        <div className="w-full max-w-[944px]">
          <ProjectGallery
            images={c.images}
            imageClassName="h-[clamp(28.125rem,24.5455rem+15.9091vw,36.875rem)]"
          />
        </div>
      )}
      {/* Takes no space when there are no amenities, so the layout matches the live template either way. */}
      <div className="w-full max-w-[944px]">
        <AmenityList items={c.amenities} align="center" />
      </div>
      <Paragraphs
        items={c.body}
        className="text-fluid-small w-full max-w-[820px] text-center font-light"
      />
    </div>
  );
}

export default async function ProjectsPage() {
  const { hero, residential, villa, commercial } = await getProjectsContent();
  const links = [
    {
      href: "#residential",
      label: "Explore Residential Projects",
      show: residential.items.length > 0,
    },
    {
      href: "#commercial",
      label: "Explore Commercial Projects",
      show: commercial.length > 0,
    },
    { href: "#villa", label: "Explore Villas", show: villa.items.length > 0 },
  ].filter((l) => l.show);

  return (
    <main>
      {/* Intro */}
      <section className="px-5 py-12">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <h1 className="text-fluid-h2 w-full font-normal text-marine lg:max-w-[880px]">
            {hero.heading}
          </h1>
          <div className="flex flex-col gap-1 md:gap-8">
            <Image
              src={hero.image.src}
              alt={hero.image.alt ?? ""}
              width={hero.image.w}
              height={hero.image.h}
              priority
              className="h-[clamp(15rem,6rem+40vw,37rem)] w-full rounded-lg object-cover"
            />
            <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:justify-between md:gap-5 max-lg:md:justify-center max-lg:md:gap-x-10">
              {links.map((l) => (
                <ArrowLink
                  key={l.href}
                  href={l.href}
                  className="self-start md:max-lg:self-center"
                >
                  {l.label}
                </ArrowLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Residential */}
      {residential.items.length > 0 && (
        <section id="residential" className="px-5 pt-20 pb-12">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-[60px]">
            <div className="flex w-full max-w-[705px] flex-col gap-5 text-center">
              <h2 className="text-fluid-h2 font-normal text-marine">
                {residential.heading}
              </h2>
              <p className={subtitle}>{residential.subheading}</p>
            </div>
            <ProjectTabs projects={residential.items} />
          </div>
        </section>
      )}

      {/* Villas */}
      {villa.items.length > 0 && (
        <section id="villa" className="bg-[#F7F4EE] px-5 py-[100px]">
          <div className="mx-auto flex max-w-[1030px] flex-col items-center gap-[60px]">
            <div className="flex w-full flex-col gap-6 text-center lg:max-w-[820px]">
              <h2 className="text-fluid-h2 font-normal text-marine">
                {villa.heading}
              </h2>
              <p className={subtitle}>{villa.subheading}</p>
            </div>
            <div className="flex w-full flex-col gap-[60px]">
              {villa.items.map((v) => (
                <VillaCard key={v.id} v={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial */}
      {commercial.length > 0 && (
        <section id="commercial" className="px-5 py-20">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-[60px]">
            {commercial.map((c) => (
              <CommercialBlock key={c.id} c={c} />
            ))}
          </div>
        </section>
      )}

      <ContactSection />
    </main>
  );
}
