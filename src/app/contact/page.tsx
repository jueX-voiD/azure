import type { Metadata } from "next";
import ContactCard from "@/components/ContactCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Contact Us - Azure" };

const info =
  "text-[length:clamp(1rem,0.9489rem+0.2273vw,1.125rem)] leading-[1.4] font-normal text-turquoise";

export default function ContactPage() {
  return (
    <>
      <Header variant="light" />
      <main>
        <section className="px-5 py-8 md:py-[60px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:justify-between lg:gap-5">
            <div className="flex flex-col gap-5 md:gap-8 lg:w-[502px] lg:pt-[100px]">
              <div className="flex flex-col gap-4">
                <h1 className="text-fluid-display font-normal text-black">
                  Let’s talk
                </h1>
                <p className="text-fluid-small text-justify font-light">
                  Reach out to discover more about our available properties,
                  upcoming launches and rental opportunities. We’re here to
                  support you every step of the way.
                </p>
              </div>
              <p className={info}>
                Email address:{" "}
                <a href="mailto:info@azureproperties.ae">
                  info@azureproperties.ae
                </a>
                <br />
                Phone Number: 800-Azure
              </p>
              <p className={info}>
                Location:{" "}
                <a
                  href="https://maps.app.goo.gl/vRoYYYwbp76pw1YR7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office 108 • Al Ferdous 4 Building • Al Safa First • PO Box
                  131 • Dubai • UAE
                </a>
              </p>
            </div>
            <ContactCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
