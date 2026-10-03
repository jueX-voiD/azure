import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "./icons";
import { MAP_EMBED_SRC, SOCIALS } from "@/lib/site";

const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "FAQs", href: "/faqs" },
];

export default function Footer() {
  return (
    <footer
      className="bg-marine bg-contain bg-center bg-no-repeat px-5 text-white"
      style={{ backgroundImage: "url(/images/footer-wave.svg)" }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-10 py-[76px] md:flex-row md:min-h-[406px] md:items-start md:justify-between md:gap-5">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image
              src="/images/site-logo.png"
              alt="Azure Properties"
              width={186}
              height={184}
              className="h-[184px] w-[186px]"
            />
          </Link>
          <p className="text-center text-[12px] leading-8 font-light whitespace-nowrap">
            Envisioning tomorrow, building today.
          </p>
        </div>

        <div className="flex w-full justify-between max-md:min-h-[185px] md:contents">
          <div className="flex flex-col gap-6">
            <p className="text-fluid-small leading-[normal]">Follow us</p>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-fluid-small leading-[normal]">Menu</p>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-fluid-small font-light"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <iframe
          title="Azure Properties location"
          src={MAP_EMBED_SRC}
          width="300"
          height="250"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[250px] w-full border-0 max-md:mb-1 md:w-[300px]"
        />
      </div>
    </footer>
  );
}
