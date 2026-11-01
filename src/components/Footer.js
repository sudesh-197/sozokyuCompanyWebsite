import {
  FOOTER_LINKS,
  ICONS,
  IMAGES,
  WHATSAPP_FOOTER_URL,
} from "@/data/content";

export default function Footer({
  cta = {
    label: "Whatsapp",
    href: WHATSAPP_FOOTER_URL,
    icon: ICONS.whatsapp,
    external: true,
  },
}) {
  const hasIcon = Boolean(cta.icon);
  return (
    <footer className="site-footer" id="contact">
      <div className="contact">
        <div className="contact__bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact__tex" src={IMAGES.footerTexture} alt="" />
          <div className="contact__shade" />
        </div>

        <div className="contact__info">
          <h3 className="contact__title">Have something in mind?</h3>
          <div className="contact__mail-wrap">
            <a className="contact__mail" href="mailto:hello@sozoq.in">
              <span>hello@sozoq.in</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ICONS.external16} alt="" width={16} height={16} />
            </a>
          </div>
        </div>

        <div className="contact__btn-wrap">
          <a
            className={`contact__btn${hasIcon ? " contact__btn--icon" : ""}`}
            href={cta.href}
            {...(cta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="contact__btn-well" />
            {hasIcon ? <span className="contact__btn-ribs" /> : null}
            {hasIcon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="contact__btn-icon"
                src={cta.icon}
                alt=""
                width={15}
                height={15}
              />
            ) : null}
            <span className="contact__btn-label">{cta.label}</span>
            <span className="contact__btn-edge" />
            <span className="contact__btn-rim" />
          </a>
        </div>
      </div>

      <div className="legal">
        <p className="legal__copy">©2026 SOZOQ, All Rights Reserved</p>
        <nav className="legal__links" aria-label="Footer">
          {FOOTER_LINKS.map((l) => (
            <a className="legal__link" href={l.href} key={l.label}>
              <span>{l.label}</span>
              {l.external ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ICONS.external11} alt="" width={11} height={15} />
              ) : null}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
