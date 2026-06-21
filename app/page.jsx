import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import WhySahela from "@/components/WhySahela";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-plum focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Services />
        <WhySahela />
        <Portfolio />
        <Team />
        <Testimonials />
        <Faq />
        <Reservation />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}
