import Image from "next/image";
import type { Amenity } from "@/lib/types";

export default function AmenityList({
  items,
  align = "start",
}: {
  items: Amenity[];
  align?: "start" | "center";
}) {
  if (!items.length) return null;
  return (
    <div
      className={`flex flex-wrap gap-5 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      {items.map((a) => (
        <div key={a.icon} className="h-[90px]">
          <Image src={a.icon} alt={a.name} width={75} height={86} />
        </div>
      ))}
    </div>
  );
}
