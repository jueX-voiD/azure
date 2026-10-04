import ContactForm from "./ContactForm";

// White form card shared by the home page and the Contact page.
export default function ContactCard() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line-soft bg-white p-3 md:p-4 lg:w-[600px] lg:p-8">
      <h2 className="text-fluid-h3 font-normal text-ink">Contact Us</h2>
      <ContactForm />
    </div>
  );
}
