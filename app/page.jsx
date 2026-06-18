import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import WhySahela from "@/components/WhySahela";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WhySahela />
        <Portfolio />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
