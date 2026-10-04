import type { Metadata } from "next";
import ArrowLink from "@/components/ArrowLink";

export const metadata: Metadata = { title: "Thank You - Azure" };

export default function ThankYouPage() {
  return (
    <>
      <main>
        <section className="min-h-[600px] px-5 pt-[86px] pb-[116px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 md:flex-row md:justify-between md:gap-5">
            <div className="flex flex-col gap-4 md:w-1/2 lg:w-[520px]">
              <h2 className="text-fluid-display font-normal text-marine">
                Thank you!
              </h2>
              <p className="text-fluid-small text-justify font-light">
                Your message has been sent successfully, and our team will
                contact you as soon as possible. We value your interest in Azure
                and are here to help you. While you wait for our response, we
                invite you to explore more about what we offer:
              </p>
              <div className="mt-6 flex flex-col justify-between gap-3 max-md:items-center md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-5 lg:flex-col lg:gap-5">
                <ArrowLink href="/projects#residential" className="self-start">
                  Explore Residential Projects
                </ArrowLink>
                <ArrowLink href="/projects#commercial" className="self-start">
                  Explore Commercial Projects
                </ArrowLink>
                <ArrowLink href="/projects#villa" className="self-start">
                  Explore Villas
                </ArrowLink>
              </div>
            </div>
            <div className="min-h-[300px] rounded-lg bg-[url(/images/thank-you/3c6dd1e47463af29ff329a28e73763b6dd322ec0.webp)] bg-cover bg-center md:min-h-0 md:w-1/2" />
          </div>
        </section>
      </main>
    </>
  );
}
