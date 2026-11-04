import Header from "@/components/Header";
import WorkHead from "@/components/WorkHead";
import WorkMascot from "@/components/WorkMascot";
import ProjectList from "@/components/ProjectList";
import SectionRule from "@/components/SectionRule";
import Footer from "@/components/Footer";
import { PROJECTS, WORK_NAV_LINKS, WORK_PAGE } from "@/data/content";

/* /work – Figma 3979:6342 (1440px).
   Built from the same components as the home page's Work section
   (WorkHead, ProjectList, SectionRule) so the hover animations, dots and
   guide lines are identical. Static route: it wins over /work/[slug]. */
export const metadata = {
  title: WORK_PAGE.metaTitle,
  description: WORK_PAGE.metaDescription,
};

export default function WorkPage() {
  return (
    <main className="page page--case page--work" data-name="Work">
      <Header
        navLinks={WORK_NAV_LINKS}
        homeHref="/"
        currentHref="/work"
        backBar
      />

      <section className="work work--page" id="work">
        <WorkHead title={WORK_PAGE.title} subtitle={WORK_PAGE.subtitle}>
          <WorkMascot />
        </WorkHead>

        <ProjectList projects={PROJECTS} />

        <div className="work__vline" aria-hidden="true" />
        <SectionRule n="end" />
      </section>

      <Footer />
    </main>
  );
}
