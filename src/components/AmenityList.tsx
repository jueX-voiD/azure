import Image from "next/image";

export default function AmenityList({
  items,
  align = "start",
}: {
  items: string[];
  align?: "start" | "center";
}) {
  if (!items.length) return null;
  return (
    <div
      className={`flex flex-wrap gap-5 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      {items.map((file) => (
        <div key={file} className="h-[90px]">
          <Image
            src={`/amenities/${file}`}
            alt={file.replace(/\.svg$/, "").replace(/_/g, " ")}
            width={75}
            height={86}
          />
        </div>
      ))}
    </div>
  );
}
