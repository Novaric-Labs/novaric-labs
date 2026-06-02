import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PropertyPlatform from "@/components/PropertyPlatform";
import Industries from "@/components/Industries";
import WhyNovaric from "@/components/WhyNovaric";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <PropertyPlatform />
        <Industries />
        <WhyNovaric />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
