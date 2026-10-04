import type { Metadata } from "next";
import Image from "next/image";
import AmenityList from "@/components/AmenityList";
import ArrowLink from "@/components/ArrowLink";
import ContactSection from "@/components/ContactSection";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectTabs from "@/components/ProjectTabs";
import { COMMERCIAL, RESIDENTIAL, VILLAS } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects - Azure" };

const subtitle =
  "text-[length:clamp(1.125rem,0.9716rem+0.6818vw,1.5rem)] leading-[1.3] font-normal text-center";

export default function ProjectsPage() {
  return (
    <>
      <main>
        {/* Intro */}
        <section className="px-5 py-12">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
            <h1 className="text-fluid-h2 w-full font-normal text-marine lg:max-w-[880px]">
              Our handpicked collection of serene residences, modern villas and
              vibrant commercial projects.
            </h1>
            <div className="flex flex-col gap-1 md:gap-8">
              <Image
                src="/images/projects/Al-jaddaf.webp"
                alt=""
                width={2480}
                height={1184}
                priority
                className="h-[clamp(15rem,6rem+40vw,37rem)] w-full rounded-lg object-cover"
              />
              <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:justify-between md:gap-5 max-lg:md:justify-center max-lg:md:gap-x-10">
                <ArrowLink
                  href="#residential"
                  className="self-start md:max-lg:self-center"
                >
                  Explore Residential Projects
                </ArrowLink>
                <ArrowLink
                  href="#commercial"
                  className="self-start md:max-lg:self-center"
                >
                  Explore Commercial Projects
                </ArrowLink>
                <ArrowLink
                  href="#villa"
                  className="self-start md:max-lg:self-center"
                >
                  Explore Villas
                </ArrowLink>
              </div>
            </div>
          </div>
        </section>

        {/* Residential */}
        <section id="residential" className="px-5 pt-20 pb-12">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-[60px]">
            <div className="flex w-full max-w-[705px] flex-col gap-5 text-center">
              <h2 className="text-fluid-h2 font-normal text-marine">
                Experience peace and tranquility everyday with residential
                buildings.
              </h2>
              <p className={subtitle}>
                Comfortable space with modern sophistication
              </p>
            </div>
            <ProjectTabs projects={RESIDENTIAL} />
          </div>
        </section>

        {/* Villas */}
        <section id="villa" className="bg-[#F7F4EE] px-5 py-[100px]">
          <div className="mx-auto flex max-w-[1030px] flex-col items-center gap-[60px]">
            <div className="flex w-full flex-col gap-6 text-center lg:max-w-[820px]">
              <h2 className="text-fluid-h2 font-normal text-marine">
                Discover the height of Dubai living in our exclusive villa
                collection
              </h2>
              <p className={subtitle}>Luxury living at it’s finest</p>
            </div>
            <div className="flex w-full flex-col gap-[60px]">
              {VILLAS.map((v) => (
                <article
                  key={v.title}
                  className="flex flex-col justify-between gap-6 md:gap-10 lg:gap-6"
                >
                  <div className="flex flex-col gap-3 text-center">
                    <h3 className="text-fluid-h3 font-normal text-marine">
                      {v.title}
                    </h3>
                    <p className="text-fluid-field font-light">{v.subtitle}</p>
                  </div>
                  <ProjectGallery images={v.images} />
                  <div className="mx-auto mt-4 flex w-full max-w-[820px] flex-col gap-12">
                    <div className="flex flex-col gap-5">
                      <p className="text-fluid-field text-center font-light">
                        AMENITIES
                      </p>
                      <AmenityList items={v.amenities} align="center" />
                    </div>
                    <div className="text-fluid-small text-center font-light">
                      {v.body.map((para, k) => (
                        <p key={k} className={k > 0 ? "mt-[1.6em]" : ""}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial */}
        <section id="commercial" className="px-5 py-20">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-10">
            <div className="flex w-full flex-col gap-6 text-center lg:max-w-[860px]">
              <h2 className="text-fluid-h2 font-normal text-marine">
                {COMMERCIAL.title}
              </h2>
              <p className={subtitle}>{COMMERCIAL.subtitle}</p>
            </div>
            <div className="w-full max-w-[944px]">
              <ProjectGallery
                images={COMMERCIAL.images}
                imageClassName="h-[clamp(28.125rem,24.5455rem+15.9091vw,36.875rem)]"
              />
            </div>
            <div className="text-fluid-small mt-10 w-full max-w-[820px] text-center font-light">
              {COMMERCIAL.body.map((para, k) => (
                <p key={k} className={k > 0 ? "mt-[1.6em]" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
    </>
  );
}
