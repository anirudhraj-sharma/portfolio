import { contact, hero, site } from "@/data/profile";
import { keepUnits } from "@/lib/typography";
import { ExternalLink } from "./external-link";

export function Hero() {
  const last = hero.meta.length - 1;
  return (
    <section id="top" aria-labelledby="hero-title" className="hero">
      <div className="wrap">
        <ul className="meta-bar" aria-label="Profile summary">
          {hero.meta.map((item, i) => (
            <li key={item} className={i === last ? "meta-bar-em" : undefined}>
              {item}
            </li>
          ))}
        </ul>

        <h1 id="hero-title" className="display">
          {site.name}
        </h1>

        <div className="hero-grid">
          <p className="lead">{keepUnits(hero.lead)}</p>
          <div className="hero-side">
            <p className="hero-note">{hero.note}</p>
            <ul className="hero-links" aria-label="Contact and profiles">
              <li>
                <a href={contact.mailto} className="link">
                  Email
                </a>
              </li>
              <li>
                <ExternalLink href={contact.github.url} className="link">
                  {contact.github.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={contact.linkedin.url} className="link">
                  {contact.linkedin.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
