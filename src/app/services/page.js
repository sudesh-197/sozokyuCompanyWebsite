import Header from "@/components/Header";
import ServicesPage from "@/components/ServicesPage";
import Footer from "@/components/Footer";
// import line: add WHATSAPP_FOOTER_URL (and remove WHATSAPP_URL if nothing else in the file uses it)
import { ICONS, SERVICES_NAV_LINKS, WHATSAPP_FOOTER_URL } from "@/data/content";

export const metadata = {
  title: "Services – Sozoq",
  description:
    "App development, website development, graphic design, and SEO & marketing – digital services built around your business.",
};

export default function Services() {
  return (
    <main className="page page--case page--services" data-name="Services">
      <Header
        navLinks={SERVICES_NAV_LINKS}
        homeHref="/"
        currentHref="/services"
        backBar
      />
      <ServicesPage />
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
