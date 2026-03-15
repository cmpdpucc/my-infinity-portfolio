import ProjectsSection from "@/sections/ProjectsSection";
import PageTransition from "@/components/PageTransition";

/**
 * ProjectsPage — Route wrapper for the Projects section.
 */
export default function ProjectsPage() {
  return (
    <PageTransition>
      <ProjectsSection />
    </PageTransition>
  );
}
