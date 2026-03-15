import AboutSection from "@/sections/AboutSection";
import PageTransition from "@/components/PageTransition";

/**
 * AboutPage — Route wrapper for the About section.
 */
export default function AboutPage() {
  return (
    <PageTransition>
      <AboutSection />
    </PageTransition>
  );
}
