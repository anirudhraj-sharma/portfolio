import { contact, site } from "@/data/profile";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: `${site.url}/`,
  email: contact.email,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Buffalo", addressRegion: "NY", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University at Buffalo, SUNY" },
    { "@type": "CollegeOrUniversity", name: "University of Petroleum and Energy Studies" },
  ],
  sameAs: [contact.github.url, contact.linkedin.url],
};

/**
 * Structured data for search engines. Built from static data, with "<" written as
 * the JSON escape < so the text can never close the script tag. The browser
 * does not run this block.
 */
export function JsonLd() {
  const json = JSON.stringify(person).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
