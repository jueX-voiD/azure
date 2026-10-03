import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative flex h-[90svh] flex-col justify-end overflow-hidden md:h-screen">
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative mx-auto w-full max-w-[1240px]">
        <Reveal effect="fadeInUp" speed="slow">
          <Image
            src="/images/azure-wordmark.svg"
            alt="Azure"
            width={1240}
            height={209}
            priority
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
