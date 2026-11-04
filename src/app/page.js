import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  return (
    <main className="page" data-name="Sozoq">
      <Header />
      <Hero />
      <div className="status-stack">
        <StatusBar />
        <Services />
      </div>
      <Work />
      <About />
      <Faq />
      <Footer />
    </main>
  );
}
