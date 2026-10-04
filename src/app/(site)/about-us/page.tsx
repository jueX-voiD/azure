import type { Metadata } from "next";
import Image from "next/image";
import ArrowLink from "@/components/ArrowLink";

export const metadata: Metadata = { title: "About Us - Azure" };

const ICON = "size-[clamp(4rem,3.4886rem+2.2727vw,5.25rem)]";
const IMG_HEIGHT = "h-[clamp(13.125rem,3.8182rem+41.3636vw,35.875rem)]";

function Icon({ name }: { name: string }) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      width={84}
      height={84}
      className={ICON}
    />
  );
}

const PILLARS = [
  {
    icon: "vision",
    title: "Vision",
    body: "To develop high-quality real estate that adds value to people’s lives and the communities they belong to. We design spaces that reflect evolving lifestyles, modern expectations, and the human spirit, ensuring every Azure project stands the test of time.",
  },
  {
    icon: "mission",
    title: "Mission",
    body: "To conceive, design, and deliver residential and mixed-use developments that inspire better living. From concept to completion, we focus on quality, innovation, and long-term value, making modern housing accessible while setting new standards in design and reliability.",
  },
];

const STATS = [
  {
    icon: "homes",
    title: "300+ New Homes",
    body: "Across residential towers, buildings and family villas.",
  },
  {
    icon: "towers",
    title: "8 Contemporary Towers",
    body: "A growing collection of residential and mixed-use developments.",
  },
  {
    icon: "districts",
    title: "6 Bustling Districts",
    body: "From Al Jaddaf to Umm Suqeim, in districts chosen for sustainable demand.",
  },
];

export default function AboutPage() {
  return (
    <>
      <main>
        {/* Intro */}
        <section className="px-5 pt-[60px] pb-[96px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 md:flex-row md:justify-between md:gap-5">
            <div className="flex flex-col justify-center gap-5 md:w-[505px] md:shrink md:gap-10">
              <h1 className="text-fluid-h2 font-normal text-marine">
                Building modern communities for real life.
              </h1>
              <div className="text-fluid-small text-justify font-light">
                <p>
                  Azure Properties is redefining what real estate development
                  means in Dubai. Through creative thinking and a people-first
                  approach, we design and build spaces that make everyday living
                  better for families, investors, and the communities around
                  them.
                </p>
                <p>&nbsp;</p>
                <p>
                  Innovation drives everything we do. We plan for how people
                  will live tomorrow and bring those ideas to life today, with
                  smart design, sustainable choices, and a genuine focus on
                  comfort and connection.
                </p>
              </div>
            </div>
            <div className="rounded-lg md:w-[610px] md:shrink">
              <Image
                src="/images/about/f7dbd3058924369735682777bccb863122a8892g.webp"
                alt=""
                width={1220}
                height={980}
                priority
                className="h-[clamp(13.125rem,5.9659rem+31.8182vw,30.625rem)] w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission and vision */}
        <section className="mx-auto flex max-w-[1160px] flex-col gap-10 px-5">
          <h2 className="text-fluid-h2 text-center font-normal text-marine">
            Our Mission and Vision
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-3 rounded-2xl border border-line-soft p-3 md:p-4 lg:p-8"
              >
                <div className="self-start">
                  <Icon name={p.icon} />
                </div>
                <h3 className="text-fluid-h3 mt-3 font-normal text-turquoise">
                  {p.title}
                </h3>
                <p className="text-fluid-small text-justify font-light">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-fluid-body text-center leading-[1.3] font-normal text-[#A88565]">
            <em>
              Founded in Dubai, our ambitions stretch far beyond it. As we grow,
              we aim to deliver property development and management services
              overseas, making us a global leader in the provision of
              high-quality real estate projects.{" "}
            </em>
          </p>
        </section>

        {/* Stats */}
        <section className="mt-10 mb-[50px] bg-[#E5EFF0] px-5 pt-10 pb-9 md:mt-[84px] md:mb-9 md:pt-20 md:pb-[84px]">
          <div className="mx-auto grid max-w-[944px] grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.title}
                className="flex flex-col gap-4 text-center text-marine"
              >
                <div className="self-center">
                  <Icon name={s.icon} />
                </div>
                <p className="text-fluid-body font-light">{s.title}</p>
                <p className="text-fluid-small font-light">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goal */}
        <section className="px-5 pt-10 pb-9 max-md:mb-[50px] md:pt-20 md:pb-[74px]">
          <p className="text-fluid-h3 mx-auto mt-5 max-w-[944px] text-center font-normal text-[#A88565]">
            Our goal is simple, <br />
            <em>Envisioning tomorrow. Building today.</em>
          </p>
        </section>

        {/* Team */}
        <section className="px-5">
          <div className="mx-auto flex max-w-[1240px] flex-col md:flex-row">
            <div
              className={`min-h-[clamp(13.125rem,3.8182rem+41.3636vw,35.875rem)] rounded-t-lg bg-[url(/images/about/ab4a704edc144101bda4df36f29ad37300f9ac0b.webp)] bg-cover bg-center md:w-[610px] md:shrink md:rounded-l-lg md:rounded-tr-none`}
            />
            <div className="flex flex-col justify-center gap-5 rounded-b-lg bg-[#E5EFF0] px-3 py-6 md:w-[630px] md:shrink md:gap-4 md:rounded-r-lg md:rounded-bl-none md:p-6 lg:p-12">
              <div className="self-start">
                <Icon name="team" />
              </div>
              <h2 className="text-fluid-h2 font-normal text-marine">
                Our Team
              </h2>
              <p className="text-fluid-small text-justify font-light md:mt-6">
                We’re a team of experienced real estate professionals,
                developers, and entrepreneurs who believe that great projects
                start with great ideas. Our work is built on expertise,
                collaboration, and a shared vision: to create developments that
                leave a lasting, positive mark on every neighborhood we touch.
              </p>
              <ArrowLink href="/contact" className="self-start md:mt-6">
                Contact Us
              </ArrowLink>
            </div>
          </div>
        </section>

        {/* What sets us apart */}
        <section className="mx-auto flex max-w-[860px] flex-col gap-4 px-5 pt-[100px] pb-10 text-center md:gap-8 md:pt-40">
          <h2 className="text-fluid-h2 font-normal text-marine">
            What sets us apart ?
          </h2>
          <p className="text-fluid-body font-light">
            We’re not here to replicate the past. We’re creative thinkers and
            entrepreneurs who approach every project with intent, imagination
            and a deep understanding of how people will live next.
          </p>
        </section>

        <Image
          src="/images/about/bbc708e6bd879d27df1d703b4e17924cfed1118d-2.webp"
          alt=""
          width={2880}
          height={1600}
          className="h-[clamp(15.625rem,-27.3438rem+137.5vw,50rem)] w-full object-cover"
        />

        <section className="mx-auto flex max-w-[860px] flex-col gap-4 px-5 pt-10 pb-[100px] text-center md:gap-8">
          <p className="text-fluid-body font-light">
            We design for tomorrow. By studying emerging lifestyles,
            expectations and community rhythms, we create developments that feel
            modern, connected and built for the future.
          </p>
        </section>

        <section className="px-5 pb-[100px] md:pb-[200px]">
          <div className="mx-auto flex max-w-[1240px] flex-col md:flex-row">
            <div className="md:w-[610px] md:shrink">
              <Image
                src="/images/about/043d84c67242e80c756651f4e4758b65f68cd9ad.webp"
                alt=""
                width={1220}
                height={1150}
                className={`${IMG_HEIGHT} w-full rounded-lg object-cover max-md:rounded-b-none`}
              />
            </div>
            <div className="flex flex-col justify-center gap-5 py-6 md:w-[610px] md:shrink md:gap-4 md:p-6 lg:p-12">
              <p className="text-fluid-small self-center text-justify font-light lg:max-w-[473px]">
                The decisions we make today shape the future of the residential
                experience. Motivated by our innate desire to take a bold course
                at every turn, we’re rewriting the rules of real estate
                development and reimaging the future of the residential
                experience.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
