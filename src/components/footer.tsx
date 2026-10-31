import { contact, site } from "@/data/profile";
import { buildDate, buildYear } from "@/lib/build-info";
import { ExternalLink } from "./external-link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-bar">
        <div className="footer-meta">
          <p>
            &copy; {buildYear} {site.name}
          </p>
          <p>
            Last built: <time dateTime={buildDate}>{buildDate}</time>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer-links">
            <li>
              <a href={contact.mailto} className="link">
                Email
              </a>
            </li>
            <li>
              <ExternalLink href={contact.github.url} className="link">
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={contact.linkedin.url} className="link">
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </ExternalLink>
            </li>
            <li>
              <a href="#top" className="link">
                Back to top <span aria-hidden="true">↑</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
