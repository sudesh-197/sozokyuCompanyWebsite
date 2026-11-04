import Header from "@/components/Header";
import LegalPage from "@/components/LegalPage";
import Footer from "@/components/Footer";
import { ICONS, SERVICES_NAV_LINKS, WHATSAPP_FOOTER_URL } from "@/data/content";
import { PRIVACY_PAGE } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy – Sozoq",
  description:
    "How SOZOQ collects, uses, stores, shares and protects your information.",
};

export default function Privacy() {
  return (
    <main
      className="page page--case page--services page--legal"
      data-name="Privacy Policy"
    >
      <Header
        navLinks={SERVICES_NAV_LINKS}
        homeHref="/"
        currentHref="/privacy"
        backBar
      />
      <LegalPage doc={PRIVACY_PAGE} />
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
