import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#e5eff0] px-5 py-8 md:py-[60px]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:justify-between lg:gap-5">
        <div className="flex flex-col gap-4 lg:w-[502px] lg:pt-[100px]">
          <h4 className="text-fluid-display font-normal">Let’s talk</h4>
          <p className="text-fluid-small text-justify font-light">
            Reach out to discover more about our available properties, upcoming
            launches and rental opportunities. We’re here to support you every
            step of the way.
          </p>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-line-soft bg-white p-3 md:p-4 lg:w-[600px] lg:p-8">
          <h2 className="text-fluid-h3 font-normal text-ink">Contact Us</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
