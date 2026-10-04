import type { Metadata } from "next";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = { title: "FAQs - Azure" };

export default function FaqsPage() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-[1240px]">
          <Image
            src="/images/faqs/Oud-Menta-Building.webp"
            alt=""
            width={2480}
            height={948}
            priority
            className="h-[474px] w-full rounded-lg object-cover"
          />
        </div>

        <section className="mx-auto flex max-w-[922px] flex-col items-center gap-11 px-5 py-10">
          <div className="flex w-full max-w-[715px] flex-col gap-4 text-center">
            <h1 className="text-fluid-display font-normal text-black">FAQs</h1>
            <p className="text-fluid-body font-light">
              Have a question? We’ve gathered everything you might want to know
              about Azure Properties, our projects, and the home buying and
              renting process, all in one place.
            </p>
          </div>

          <FaqAccordion items={FAQS} />

          <div className="flex w-full flex-col gap-3 rounded-2xl border border-line-soft bg-[#F4EDDE] p-5 md:max-w-[562px] md:p-10">
            <p className="text-center text-[length:clamp(1.125rem,0.9716rem+0.6818vw,1.5rem)] leading-[1.3] font-normal">
              Need more help? Our team is always here to assist.
            </p>
            <div className="text-center text-[length:clamp(1rem,0.9489rem+0.2273vw,1.125rem)] leading-[1.4] font-normal">
              <p>
                <Image
                  src="/icons/emoji-phone.svg"
                  alt="📞"
                  width={18}
                  height={18}
                  className="mx-[1.26px] inline-block size-[1em] align-[-0.1em]"
                />{" "}
                Call us: 800-AZURE
              </p>
              <p>
                <Image
                  src="/icons/emoji-mail.svg"
                  alt="📧"
                  width={18}
                  height={18}
                  className="mx-[1.26px] inline-block size-[1em] align-[-0.1em]"
                />{" "}
                Email:{" "}
                <a href="mailto:info@azureproperties.ae">
                  info@azureproperties.ae
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
