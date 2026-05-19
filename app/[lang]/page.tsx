import Navbar   from "@/components/Navbar";
import Hero     from "@/components/Hero";
import About    from "@/components/About";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import Gallery  from "@/components/Gallery";
import Contact  from "@/components/Contact";
import Footer   from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div
          aria-hidden
          className="h-px w-full bg-gradient-to-r from-transparent via-red/25 to-transparent"
        />
        <About />
        <Programs />
        <Schedule />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
