"use client";

import { useEffect, useRef } from "react";

/* Pixel cat on the heading band of /work (Figma node 4031:2992).

   Two stacked layers:
     work-cat-base.webp     – the cat without sunglasses (eyes drawn in)
     work-cat-glasses.webp  – just the sunglasses

   The glasses stay in their original place while the cursor is above the
   Workley row. Once the cursor enters the Workley row (and anywhere below
   it) the glasses slide down as the cursor moves down, and glide back as
   it moves up. Moving the cursor back above Workley returns them to the
   original place.
   (Touch devices have no cursor, so scrolling past Workley drives it.) */

const DROP = 32; // how far the glasses slide down, in % of their own height
const EASE = 0.12; // 0–1, higher = quicker response, lower = floatier
const TRIGGER = ".proj--workley"; // the row that "unlocks" the movement
const RANGE = 1; // cursor distance (in Workley-row heights) for a full drop
const SCROLL_RANGE = 150; // touch only: px scrolled after Workley appears for a full drop

export default function WorkMascot() {
  const glassesRef = useRef(null);

  useEffect(() => {
    const el = glassesRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canHover = window.matchMedia("(hover: hover)").matches;

    let target = 0; // 0 = original place, 1 = fully dropped
    let current = 0;
    let raf = 0;
    let last = 0;
    let cursorY = -1; // last known cursor Y (-1 = cursor not seen yet)

    const smooth = (t) => t * t * (3 - 2 * t); // smoothstep
    const getRow = () =>
      document.querySelector(TRIGGER) || document.querySelector(".work__list");

    const update = () => {
      const row = getRow();
      if (!row) return;
      const rect = row.getBoundingClientRect();

      if (canHover) {
        if (cursorY < 0 || cursorY < rect.top) {
          target = 0; // cursor above Workley → original place
        } else {
          // cursor inside / below Workley → follow it downwards
          const t = (cursorY - rect.top) / (rect.height * RANGE || 1);
          target = smooth(Math.min(1, Math.max(0, t)));
        }
      } else {
        // touch: scrolling past Workley drives it
        const e = window.innerHeight - rect.top;
        target = e <= 0 ? 0 : smooth(Math.min(1, e / SCROLL_RANGE));
      }
      start();
    };

    const onPointer = (e) => {
      if (e.pointerType === "touch") return;
      cursorY = e.clientY;
      update();
    };

    const tick = (now) => {
      const dt = last ? Math.min(now - last, 50) : 16.7;
      last = now;
      const k = 1 - Math.pow(1 - EASE, dt / 16.7); // frame-rate independent
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0005) current = target;
      el.style.transform = `translate3d(0, ${(DROP * current).toFixed(3)}%, 0)`;
      if (current !== target) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    };

    function start() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    if (canHover)
      window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="work-mascot" data-mascot aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="work-mascot__img work-mascot__base"
        src="/assets/images/work-cat-base.webp"
        alt=""
        width={157}
        height={130}
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={glassesRef}
        className="work-mascot__img work-mascot__glasses"
        src="/assets/images/work-cat-glasses.webp"
        alt=""
        width={157}
        height={130}
        draggable={false}
      />
    </div>
  );
}
