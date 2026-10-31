import { contact, sections, ui } from "@/data/profile";
import { CopyEmail } from "./copy-email";
import { ExternalLink } from "./external-link";
import { SectionHead } from "./section-head";

export function Contact() {
  const section = sections.contact;
  // A break opportunity before the @, so a narrow phone wraps the address there.
  const [user, domain] = contact.email.split("@");
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="sec">
      <div className="wrap">
        <SectionHead section={section} />
        <p className="contact-lead">{contact.availability}</p>
        <div className="contact-email-row">
          <a href={contact.mailto} className="link contact-email">
            {user}
            <wbr />@{domain}
          </a>
          <CopyEmail email={contact.email} />
        </div>
        <dl className="contact-dl">
          <div>
            <dt>{ui.contactKeys.github}</dt>
            <dd>
              <ExternalLink href={contact.github.url} className="link">
                {contact.github.handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt>{ui.contactKeys.linkedin}</dt>
            <dd>
              <ExternalLink href={contact.linkedin.url} className="link">
                {contact.linkedin.handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt>{ui.contactKeys.location}</dt>
            <dd>{contact.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
