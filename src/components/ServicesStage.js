"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * stacked -> cards piled up (desktop: centre of stage, mobile/tablet: on top of card 1)
 * spread  -> cards fly to their original positions
 * ready   -> animation finished; hover + drag enabled
 *
 * Spreads once, instantly on the first scroll-down, as soon as the section
 * is within one screen of the viewport. If the user already scrolled past
 * the section, it skips the animation and goes straight to "ready".
 */
export default function ServicesStage({ children }) {
  const ref = useRef(null);
  const [state, setState] = useState("stacked");
  // mobile (<= 767px): no pile / fly-out animation, the cards use the sticky stack
  useIsoLayoutEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setState("ready");
  }, []);

  // Mobile: once the 4th card has landed, the status bar + title (which are
  // pinned while the cards stack) travel up with the finished stack.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const stage = ref.current;
    const host = stage && stage.closest(".status-stack");
    if (!stage || !host) return;
    const last = stage.querySelector(".svc--4");
    if (!last) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches) {
        host.style.removeProperty("--stack-shift");
        return;
      }
      const cs = getComputedStyle(last);
      const stuckBottom = parseFloat(cs.top) + last.offsetHeight;
      const leaveAt =
        stage.getBoundingClientRect().bottom - parseFloat(cs.marginBottom);
      const shift = Math.max(0, stuckBottom - leaveAt);
      host.style.setProperty("--stack-shift", `${shift}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      host.style.removeProperty("--stack-shift");
    };
  }, []);

  // Mobile/tablet: measure how far each card must move to sit on card 1
  useIsoLayoutEffect(() => {
    if (state !== "stacked") return;
    const stage = ref.current;
    if (!stage) return;

    const measure = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) return; // desktop uses CSS offsets
      const cards = Array.from(stage.querySelectorAll(":scope > .svc"));
      if (!cards.length) return;
      const first = cards[0];
      const centerX = stage.clientWidth / 2;
      cards.forEach((c) => {
        c.style.setProperty(
          "--sx",
          `${centerX - (c.offsetLeft + c.offsetWidth / 2)}px`,
        );
        c.style.setProperty("--sy", `${first.offsetTop - c.offsetTop}px`);
      });
      stage.setAttribute("data-measured", "true");
    };

    measure();
    let lastW = stage.clientWidth;
    const ro = new ResizeObserver(() => {
      // re-measure only when the width really changes (ignores the mobile
      // address bar showing/hiding while scrolling)
      if (stage.clientWidth !== lastW) {
        lastW = stage.clientWidth;
        measure();
      }
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [state]);

  // trigger
  useEffect(() => {
    if (state !== "stacked") return;
    const stage = ref.current;
    const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
    // desktop: watch the stage. mobile/tablet: watch the pile (card 1)
    const target = isDesktop ? stage : stage.querySelector(".svc--1") || stage;

    let scrolled = window.scrollY > 0; // page restored mid-scroll counts too
    let near = false; // section is on screen or within one screen below
    let passed = false; // section is already above the viewport
    let lastY = window.scrollY;
    let done = false;

    const release = () => {
      if (done) return;
      if (passed) {
        // skipped the section: no animation needed, just place the cards
        done = true;
        setState("ready");
      } else if (scrolled && near) {
        done = true;
        setTimeout(() => setState("spread"), 600);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY) {
        scrolled = true;
        release();
      }
      lastY = y;
    };
    const onWheel = (e) => {
      // fires a frame earlier than "scroll" on desktop
      if (e.deltaY > 0) {
        scrolled = true;
        release();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        passed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        release();
      },
      // look one full screen ahead so the animation is already running
      // (or finished) by the time the section reaches the user
      { threshold: 0, rootMargin: "0px 0px 100% 0px" },
    );
    io.observe(target);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, [state]);

  // after the fly-out finishes, unlock hover / drag
  useEffect(() => {
    if (state !== "spread") return;
    const t = setTimeout(() => setState("ready"), 1200);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div className="services__stage" ref={ref} data-state={state}>
      {children}
    </div>
  );
}
