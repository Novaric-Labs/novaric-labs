import Rail from "@/components/launch/Rail";
import Nav from "@/components/launch/Nav";
import Hero from "@/components/launch/Hero";
import Ticker from "@/components/launch/Ticker";
import Bulkhead from "@/components/launch/Bulkhead";
import Capabilities from "@/components/launch/Capabilities";
import Deployment from "@/components/launch/Deployment";
import Lab from "@/components/launch/Lab";
import Principles from "@/components/launch/Principles";
import Contact from "@/components/launch/Contact";
import Footer from "@/components/launch/Footer";
import ScrollEffects from "@/components/launch/ScrollEffects";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <div className="hull-bg" aria-hidden="true" />
      <Rail />
      <Nav />

      <main id="main">
        <Hero />
        <Ticker />

        <Bulkhead sta="120" label="Avionics bay" />
        <Capabilities />

        <Bulkhead sta="240" label="Propellant feed" />
        <Deployment />

        <Bulkhead sta="360" label="Engine bay" />
        <Lab />

        <Bulkhead sta="480" label="Primary structure" />
        <Principles />

        <Bulkhead sta="600" label="Ignition" />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
      <ScrollEffects />
    </>
  );
}
