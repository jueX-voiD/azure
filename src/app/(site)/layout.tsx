import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import PageShell from "@/components/PageShell";
import SmoothScroll from "@/components/SmoothScroll";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  return (
    <SmoothScroll>
      <PageShell>{children}</PageShell>
      {isEnabled && <VisualEditing />}
    </SmoothScroll>
  );
}
