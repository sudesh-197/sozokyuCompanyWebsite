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
  Home: House,
  Work: Briefcase,
  Service: Stack,
  Contact: EnvelopeSimple,
};

/* every section on the page, so "current" can also reset on About / FAQ */
const SECTION_IDS = ["home", "service", "work", "about", "faq", "contact"];

export default function NavLinks({ links, currentHref }) {
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    if (currentHref) return; // fixed current link (e.g. case-study pages)
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    // a section becomes "current" while it crosses the middle of the screen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [currentHref]);

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
        const Icon = ICON_BY_LABEL[label];
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
              {Icon ? (
                <Icon className="nav__icon" size={18} aria-hidden="true" />
              ) : null}
              <span>{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
