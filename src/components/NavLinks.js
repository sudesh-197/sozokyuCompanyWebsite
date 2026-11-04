"use client";

import { useEffect, useState } from "react";
import {
  House,
  Briefcase,
  Stack,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";

/* icons are only shown in the floating mobile bar (hidden on desktop by CSS) */
const ICON_BY_LABEL = {
  Home: "/assets/icons/nav/home.svg",
  Work: "/assets/icons/nav/work.svg",
  Service: "/assets/icons/nav/service.svg",
  Contact: "/assets/icons/nav/contact.svg",
};

/* every section on the page, so "current" can also reset on About / FAQ */

export default function NavLinks({ links, currentHref }) {
  const [current, setCurrent] = useState("home");

  /* desktop: hide nav on scroll down, show it on a small scroll up
     (the CSS for this only applies at >= 768px) */
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;
    const TOP_ZONE = 80; // always visible near the top
    const DELTA = 6; // ignore tiny jitters

    const update = () => {
      const y = Math.max(window.scrollY, 0);
      if (y < TOP_ZONE) {
        root.classList.remove("nav-hidden");
      } else if (y - lastY > DELTA) {
        root.classList.add("nav-hidden"); // scrolling down
      } else if (lastY - y > DELTA) {
        root.classList.remove("nav-hidden"); // scrolling up
      } else {
        ticking = false;
        return;
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("nav-hidden");
    };
  }, []);

  return (
    <ul className="nav__links">
      {links.map(({ label, href, active, section }) => {
        const iconSrc = ICON_BY_LABEL[label];
        const isCurrent = currentHref
          ? href === currentHref
          : (section || href) === `#${current}`;
        return (
          <li key={label}>
            <a
              className={`nav__link${active ? " nav__link--active" : ""}${
                isCurrent ? " is-current" : ""
              }`}
              href={href}
              aria-current={isCurrent ? "true" : undefined}
            >
              {iconSrc ? (
                <span
                  className="nav__icon"
                  aria-hidden="true"
                  style={{ "--icon": `url(${iconSrc})` }}
                />
              ) : null}
              <span>{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
