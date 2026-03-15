import ExperienceSection from "@/sections/ExperienceSection";
import PageTransition from "@/components/PageTransition";

/**
 * ExperiencePage — Route wrapper for the Experience section.
 */
export default function ExperiencePage() {
  return (
    <PageTransition>
      <ExperienceSection />
    </PageTransition>
  );
}
