import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 scroll-smooth">
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="whychoose">
        <WhyChoose />
      </section>

      <section id="howitworks">
        <HowItWorks />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="cta">
        <CTA />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
