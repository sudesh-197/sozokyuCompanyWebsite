import Header from "@/components/Header";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";
// import line: add WHATSAPP_FOOTER_URL (and remove WHATSAPP_URL if nothing else in the file uses it)
import { ICONS, SERVICES_NAV_LINKS, WHATSAPP_FOOTER_URL } from "@/data/content";

export const metadata = {
  title: "Contact – Sozoq",
  description:
    "Tell us where you want to go. Email, call or WhatsApp Sozoq – we reply within 1–2 business days.",
};

export default function Contact() {
  return (
    <main
      className="page page--case page--services page--contact"
      data-name="Contact"
    >
      <Header
        navLinks={SERVICES_NAV_LINKS}
        homeHref="/"
        currentHref="/contact"
        backBar
      />
      <ContactPage />
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
