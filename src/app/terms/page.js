import Header from "@/components/Header";
import LegalPage from "@/components/LegalPage";
import Footer from "@/components/Footer";
import { ICONS, SERVICES_NAV_LINKS, WHATSAPP_FOOTER_URL } from "@/data/content";
import { TERMS_PAGE } from "@/data/legal";

export const metadata = {
  title: "Terms & Conditions – Sozoq",
  description:
    "The terms that govern your use of the SOZOQ website and services.",
};

export default function Terms() {
  return (
    <main
      className="page page--case page--services page--legal"
      data-name="Terms & Conditions"
    >
      <Header
        navLinks={SERVICES_NAV_LINKS}
        homeHref="/"
        currentHref="/terms"
        backBar
      />
      <LegalPage doc={TERMS_PAGE} />
      <Footer
        cta={{
          label: "Whatsapp",
          href: WHATSAPP_FOOTER_URL,
          icon: ICONS.whatsapp,
          external: true,
        }}
      />
    </main>
  );
}
