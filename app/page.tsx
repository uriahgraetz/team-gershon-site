import Navbar   from "@/components/Navbar";
import Hero     from "@/components/Hero";
import About    from "@/components/About";
import Programs from "@/components/Programs";
import Gallery  from "@/components/Gallery";
import Contact  from "@/components/Contact";
import Footer   from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
