import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Steps from "@/components/site/Steps";
import Proof from "@/components/site/Proof";
import Work from "@/components/site/Work";
import FitCheck from "@/components/site/FitCheck";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Steps />
        <Proof />
        <Work />
        <FitCheck />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
