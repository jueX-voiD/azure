import ContactSection from "@/components/ContactSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import VideoBlock from "@/components/VideoBlock";
import WhyStandOut from "@/components/WhyStandOut";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <VideoBlock />
      <WhyStandOut />
      <FeaturedProjects />
      <ContactSection />
    </main>
  );
}
