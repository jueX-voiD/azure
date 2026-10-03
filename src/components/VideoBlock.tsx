import { HERO_VIDEO_POSTER, HERO_VIDEO_SRC } from "@/lib/site";

// The video overlaps a golden-sand panel that starts 225px below its top edge
// (100px on mobile). Panel padding: 12px mobile, 24px tablet, 50px desktop.
export default function VideoBlock() {
  return (
    <section className="px-5">
      <div className="relative mx-auto max-w-[1140px]">
        <div className="absolute inset-x-0 top-[100px] bottom-0 rounded-lg bg-sand md:top-[225px]" />
        <div className="relative px-3 pb-3 md:px-6 md:pb-6 lg:px-[50px] lg:pb-[50px]">
          <video
            className="block aspect-video w-full rounded-lg bg-black object-cover"
            src={HERO_VIDEO_SRC}
            poster={HERO_VIDEO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
