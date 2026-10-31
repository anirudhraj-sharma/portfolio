import { Archive } from "@/components/archive";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header, type NavItem } from "@/components/header";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";
import { sectionOrder, sections, site } from "@/data/profile";

const navItems: NavItem[] = sectionOrder.map((id) => ({ id, label: sections[id].nav }));

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header name={site.name} items={navItems} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <Archive />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <JsonLd />
    </>
  );
}
