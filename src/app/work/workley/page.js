import Header from "@/components/Header";
import WorkleyCase from "@/components/WorkleyCase";
import Footer from "@/components/Footer";
import { CASE_NAV_LINKS } from "@/data/content";
import { WORKLEY } from "@/data/workley";
import "./workley.css";

/* /work/workley – a static route, so it wins over the dynamic /work/[slug] */
export const metadata = {
  title: WORKLEY.metaTitle,
  description: WORKLEY.metaDescription,
};

export default function WorkleyPage() {
  return (
    <main className="page page--case" data-name="Case study – Workley">
      <Header
        navLinks={CASE_NAV_LINKS}
        homeHref="/#home"
        currentHref="/#work"
        caseBar
      />
      <WorkleyCase />
      <Footer />
    </main>
  );
}
