import Ruler from "./Ruler";
import NavLinks from "./NavLinks";
import { ICONS, NAV_LINKS, WHATSAPP_URL } from "@/data/content";

export default function Header({
  navLinks = NAV_LINKS,
  homeHref = "#home",
  currentHref,
  caseBar = false, // mobile case-study header: wordmark + "Service" + "All work"
  backBar = false, // mobile services header: wordmark + "Back to Home"
}) {
  const slim = caseBar || backBar;
  return (
    <header className="row row--header">
      <div className="col col--side col--left header__margin">
        <Ruler values={[50]} variant="header" solid />
      </div>

      <div className="col col--middle header__middle">
        {/* mobile only: top bar from the Figma mobile design.
            Home page: wordmark + "Let's Talk" CTA.
            Case-study page (caseBar): wordmark + "Service" + "All work".
            The page links live in the floating menu below. */}
        <div className={`header__bar${slim ? " header__bar--case" : ""}`}>
          <a
            className="header__wordmark"
            href={homeHref}
            aria-label="Sozoq home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ICONS.wordmark}
              alt="Sozoq"
              width={85.909}
              height={17.995}
            />
          </a>

          {backBar ? (
            <div className="header__links">
              <a className="header__link header__link--icon" href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICONS.arrowLeft18} alt="" width={15} height={15} />
                <span>Back to Home</span>
              </a>
            </div>
          ) : caseBar ? (
            <div className="header__links">
              <a className="header__link" href="/services">
                Service
              </a>
              <a className="header__link header__link--icon" href="/#work">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICONS.arrowLeft18} alt="" width={18} height={18} />
                <span>All work</span>
              </a>
            </div>
          ) : (
            <a
              className="header__talk"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
            >
              <span className="header__talk-well" />
              <span className="header__talk-label">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICONS.whatsapp} alt="" width={13} height={13} />
                WhatsApp
              </span>
              <span className="header__talk-edge" />
            </a>
          )}
        </div>

        <nav className="nav" aria-label="Main">
          <div className="nav__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ICONS.logo} alt="Sozoq logo" width={18.209} height={18} />
          </div>
          <NavLinks links={navLinks} currentHref={currentHref} />
        </nav>
      </div>

      <div className="col col--side col--right header__margin header__margin--right" />
    </header>
  );
}
