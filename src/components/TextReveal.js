"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTORS = [
  ".hero__title-line",
  ".hero__text",
  ".tag",
  ".services__label",
  ".svc__title",
  ".svc__desc",
  ".work__title-1",
  ".work__title-2",
  ".proj__title",
  ".proj__desc",
  ".proj__link-wrap",
  ".trusted__title",
  ".hl__title",
  ".hl__text",
  ".eyebrow",
  ".about__copy p",
  ".faq__hand",
  ".faq__item",
  ".contact__title",
  ".contact__mail-wrap",
  ".legal__copy",
  ".legal__link",
  ".ct__h1",
  ".ct__lead",
  ".ct-card",
  ".ct-form",
  ".svcp__h1",
  ".svcp__lead",
  ".svcp__label",
  ".svcp__h2",
  ".svcp__p",
  ".svcp__updated",
  ".svcp__h3",
  ".svcp__li",
  ".svcp__line",
  ".case-eyebrow",
  ".case-h2",
  ".case-body p",
  ".case-list__intro",
  ".case-list__row h3",
  ".case-list__row p",
  ".case-list__outro",
  ".case-fig__caption",
].join(",");

/* CONTAINERS (cards / boxes): the whole box rises + fades in, one by one */
const BOX_SELECTORS = [".faq__item", ".ct-card", ".ct-form"].join(",");

/* TEXT revealed LINE BY LINE (add selectors here to use it on more text) */
const LINE_SELECTORS = [".hero__text", ".ct__lead", ".svc__desc"].join(",");

/* BODY text: the whole paragraph comes up at once (no splitting).
   Headings use the mask effect below, other short labels fade word by word. */
const BLOCK_SELECTORS = [
  ".proj__desc",
  ".hl__text",
  ".about__copy p",
  ".svcp__lead",
  ".svcp__p",
  ".svcp__updated",
  ".svcp__h3",
  ".svcp__li",
  ".svcp__line",
  ".case-body p",
  ".case-list__intro",
  ".case-list__row p",
  ".case-list__outro",
].join(",");

/* HEADINGS: each word slides up from behind a mask (like a clipped line).
   Add / remove selectors here to choose which text gets this effect. */
const MASK_SELECTORS = [
  ".hero__title-line",
  ".svc__title",
  ".work__title-1",
  ".work__title-2",
  ".proj__title",
  ".trusted__title",
  ".hl__title",
  ".contact__title",
  ".ct__h1",
  ".svcp__h1",
  ".svcp__h2",
  ".case-h2",
  ".case-list__row h3",
].join(",");

/* split an element's text into words (links, icons and counters stay intact).
   every word / icon gets class "rv-ch" and an index in --i */
function splitWords(el, mask) {
  let i = 0;
  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        if (!child.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          if (mask) {
            // outer span = the mask, inner span = the word that slides up
            word.className = "rv-w rv-mask";
            const inner = document.createElement("span");
            inner.className = "rv-ch";
            inner.style.setProperty("--i", i++);
            inner.textContent = part;
            word.appendChild(inner);
          } else {
            word.className = "rv-w rv-ch";
            word.style.setProperty("--i", i++);
            word.textContent = part;
          }
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) {
        const tag = child.tagName.toUpperCase();
        if (
          child.hasAttribute("data-count") ||
          tag === "IMG" ||
          tag === "SVG"
        ) {
          child.classList.add("rv-ch"); // counters / icons animate as one piece
          child.style.setProperty("--i", i++);
        } else if (tag !== "BR") {
          walk(child);
        }
      }
    });
  };
  walk(el);
  return i;
}

/* line mode: give every word the index of the LINE it sits on,
   so all words of one line share the same delay */
function assignLines(el) {
  let line = -1;
  let lastTop = null;
  el.querySelectorAll(".rv-ch").forEach((u) => {
    const top = u.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 4) {
      line++;
      lastTop = top;
    }
    u.style.setProperty("--i", line);
  });
}

/* paragraphs + boxes: animated from JS (no CSS needed).
   hidden state = inline style, reveal = Web Animations API */
function hideBlock(el, dist) {
  el.style.opacity = "0";
  el.style.translate = `0 ${dist}px`;
}
function playBlock(el, step) {
  const box = el.hasAttribute("data-reveal-box");
  const dist = box ? 36 : 24;
  el.style.removeProperty("opacity");
  el.style.removeProperty("translate");
  if (!el.animate) return;
  el.animate(
    [
      { opacity: 0, translate: `0 ${dist}px` },
      { opacity: 1, translate: "0 0" },
    ],
    {
      duration: box ? 900 : 800,
      // paragraphs wait 250ms extra, boxes use a wider gap between each other
      delay: box ? step * 160 : 250 + step * 80,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "backwards",
    },
  );
}

export default function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // count-up numbers: <span data-count="10" data-suffix="+">
    const counters = Array.from(document.querySelectorAll("[data-count]"));
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          countIO.unobserve(el);
          const to = Number(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const duration = 1400;
          setTimeout(() => {
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(1 + (to - 1) * eased) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, 300);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => {
      // lock the width so "1+" → "10+" doesn't re-wrap the heading
      el.style.display = "inline-block";
      el.style.minWidth = `${el.offsetWidth}px`;
      el.textContent = `1${el.dataset.suffix || ""}`;
      countIO.observe(el);
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll(SELECTORS)).filter(
      (el) => !el.closest(".faq__a-wrap"),
    );
    let pending = els.slice();
    let raf = 0;
    const originals = new Map();
    const lineEls = [];

    // reveal everything whose top edge is inside the viewport
    const check = () => {
      raf = 0;
      const limit = window.innerHeight * 0.92;
      // at the very bottom of the page, reveal everything left (footer bar)
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      let n = 0;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if ((r.top < limit || atBottom) && r.bottom > 0) {
          const step = Math.min(n++, 6);
          el.style.setProperty("--base", `${step * 80}ms`);
          el.setAttribute("data-reveal", "in");
          if (
            el.hasAttribute("data-reveal-block") ||
            el.hasAttribute("data-reveal-box")
          ) {
            playBlock(el, step);
          }
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };

    // 1) split text and hide everything not yet revealed
    els.forEach((el) => {
      if (getComputedStyle(el).display === "inline") {
        el.style.display = "inline-block";
      }
      if (el.matches(BOX_SELECTORS)) {
        // whole container: animated by CSS only, text inside is not split
        el.setAttribute("data-reveal-box", "");
        hideBlock(el, 36);
        el.setAttribute("data-reveal", "out");
        return;
      }
      if (el.matches(BLOCK_SELECTORS)) {
        // body paragraph: animate the whole block, no splitting
        el.setAttribute("data-reveal-block", "");
        hideBlock(el, 24);
        el.setAttribute("data-reveal", "out");
        return;
      }
      if (el.matches(LINE_SELECTORS)) {
        // line by line: words share the delay of the line they sit on
        originals.set(el, el.innerHTML);
        splitWords(el, false);
        lineEls.push(el);
        el.style.setProperty("--d", "450ms"); // gap between lines
        assignLines(el);
        el.setAttribute("data-reveal", "out");
        return;
      }
      originals.set(el, el.innerHTML);
      const isMask = el.matches(MASK_SELECTORS);
      const count = splitWords(el, isMask);
      // headings / labels: one step per WORD (long ones squeezed to ~1s)
      const step = isMask ? 110 : 90;
      el.style.setProperty(
        "--d",
        `${Math.min(step, 1000 / Math.max(count, 1))}ms`,
      );
      el.setAttribute("data-reveal", "out");
    });

    // line breaks change on resize / when fonts finish loading: recompute
    let relayoutTimer = 0;
    const relayout = () => {
      clearTimeout(relayoutTimer);
      relayoutTimer = setTimeout(() => lineEls.forEach(assignLines), 120);
    };
    window.addEventListener("resize", relayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(relayout);
    }

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);

    // 2) next frames: reveal what is already on screen (hero etc.)
    //    two frames so the "out" state is painted first and the transition runs
    requestAnimationFrame(() => requestAnimationFrame(check));

    // safety net: never leave text hidden for more than 4s while in view
    const t = setTimeout(check, 4000);

    return () => {
      countIO.disconnect();
      clearTimeout(t);
      clearTimeout(relayoutTimer);
      window.removeEventListener("resize", relayout);
      cancelAnimationFrame(raf);
      stop();
      els.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.removeAttribute("data-reveal-block");
        el.removeAttribute("data-reveal-box");
        el.style.removeProperty("opacity");
        el.style.removeProperty("translate");
        el.style.removeProperty("--base");
        el.style.removeProperty("--d");
        if (originals.has(el)) el.innerHTML = originals.get(el);
      });
    };
  }, [pathname]);

  return null;
}
