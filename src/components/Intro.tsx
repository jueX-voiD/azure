import ArrowLink from "./ArrowLink";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="px-5 pt-[100px] pb-[92px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-12">
        <div className="flex w-full flex-col gap-3 text-center md:text-left lg:max-w-[925px]">
          <Reveal effect="fadeInLeft" speed="slow">
            <h1 className="text-fluid-hero font-normal">
              Built for modern living.{" "}
            </h1>
          </Reveal>
          <Reveal effect="fadeInLeft" speed="slow" delay={200}>
            <h2 className="text-fluid-hero font-normal md:text-right">
              Designed to feel like home.
            </h2>
          </Reveal>
        </div>

        <div className="flex w-full flex-col md:items-end">
          <Reveal
            effect="fadeInLeft"
            speed="slow"
            delay={200}
            className="w-full md:w-1/2"
            innerClassName="flex w-full flex-col gap-7"
          >
            <p className="text-fluid-body text-center font-light md:text-left">
              Azure properties: <br className="hidden md:block" />
              Envisioning tomorrow, building today.
            </p>
            <div className="flex flex-col items-center gap-[13px] md:items-start md:gap-3">
              <ArrowLink href="/projects">Explore our Projects</ArrowLink>
              <ArrowLink href="/contact">Get in touch</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
