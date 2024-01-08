import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
// import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Testimonials3 from "@/components/Testimonials3";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <FeaturesAccordion />
        <Testimonials3 />
        {/* <Pricing /> */}
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}