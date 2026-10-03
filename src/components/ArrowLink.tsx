import Link from "next/link";
import { ArrowRightIcon } from "./icons";

// Golden-sand square with an arrow (padding 9px mobile / 12px up; icon scales fluidly 16-24px) followed by a marine-blue label.
export default function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`flex items-center gap-4 ${className}`}>
      <span className="flex shrink-0 items-center justify-center rounded-[4px] bg-sand p-[9px] md:p-3">
        <ArrowRightIcon className="size-[clamp(1rem,0.7955rem+0.9091vw,1.5rem)]" />
      </span>
      <span className="text-fluid-body font-light text-marine">{children}</span>
    </Link>
  );
}
