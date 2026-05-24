import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./getDictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <div
          aria-hidden
          className="h-px w-full bg-gradient-to-r from-transparent via-red/25 to-transparent"
        />
        <About dict={dict.about} />
        <Programs dict={dict.programs} />
        <Schedule dict={dict.schedule} />
        <Gallery dict={dict.gallery} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
