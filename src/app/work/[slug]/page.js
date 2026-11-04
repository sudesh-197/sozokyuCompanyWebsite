import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import Footer from "@/components/Footer";
import { CASE_NAV_LINKS, CASE_STUDIES } from "@/data/content";

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = CASE_STUDIES[slug];
  if (!data) return {};
  return { title: data.metaTitle, description: data.metaDescription };
}

export default async function CasePage({ params }) {
  const { slug } = await params;
  const data = CASE_STUDIES[slug];
  if (!data) notFound();

  return (
    <main className="page page--case" data-name={`Case study – ${data.brand}`}>
      <Header
        navLinks={CASE_NAV_LINKS}
        homeHref="/#home"
        currentHref="/work"
        caseBar
      />
      <CaseStudy data={data} />
      <Footer />
    </main>
  );
}
