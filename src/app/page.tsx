import ContactSection from "@/components/ContactSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import VideoBlock from "@/components/VideoBlock";
import WhyStandOut from "@/components/WhyStandOut";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Intro />
      <VideoBlock />
      <WhyStandOut />
      <FeaturedProjects />
      <ContactSection />
      <Footer />
    </main>
  );
}
