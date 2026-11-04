"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Makes a whole service card draggable (mouse + touch).
 * While dragging, a floating copy of the card follows the pointer; on release
 * it springs back to its original spot and tilt.
 */
export default function DragCard({ svcId, children }) {
  const cardRef = useRef(null);
  const start = useRef(null);
  const timer = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | drag | return
  const [box, setBox] = useState(null);
  const [angle, setAngle] = useState(0); // tilt of the card when picked up
  const [straight, setStraight] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => () => clearTimeout(timer.current), []);

  // ease the tilt out a moment after the floating copy appears
  useEffect(() => {
    if (phase !== "drag") return;
    const t = setTimeout(() => setStraight(true), 30);
    return () => clearTimeout(t);
  }, [phase]);

  const onPointerDown = (e) => {
    if (window.matchMedia("(max-width: 767px)").matches) return; // no drag on mobile
    if (phase !== "idle") return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = cardRef.current;
    const r = el.getBoundingClientRect(); // bounding box of the tilted card
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);

    el.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setAngle((Math.atan2(m.b, m.a) * 180) / Math.PI);
    setBox({
      left: r.left + r.width / 2 - w / 2,
      top: r.top + r.height / 2 - h / 2,
      width: w,
      height: h,
    });
    setPos({ x: 0, y: 0 });
    setStraight(false);
    setPhase("drag");
  };

  const onPointerMove = (e) => {
    if (phase !== "drag" || !start.current) return;
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };

  const release = () => {
    if (phase !== "drag") return;
    start.current = null;
    setPhase("return");
    setStraight(false);
    setPos({ x: 0, y: 0 }); // spring back to the original spot
    timer.current = setTimeout(() => setPhase("idle"), 650);
  };

  return (
    <>
      {/* the real card stays in place (invisible while its copy is flying) */}
      <article
        ref={cardRef}
        className="svc__card"
        data-dragging={phase !== "idle" ? "true" : undefined}
        style={{
          opacity: phase === "idle" ? 1 : 0,
          cursor: phase === "drag" ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </article>

      {/* floating copy: free to move anywhere on the page */}
      {phase !== "idle" &&
        createPortal(
          <div
            className={`svc svc--${svcId}`}
            aria-hidden="true"
            style={{
              position: "fixed",
              left: box.left,
              top: box.top,
              width: box.width,
              height: box.height,
              margin: 0,
              zIndex: 1000,
              pointerEvents: "none",
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${phase === "drag" ? 1.04 : 1})`,
              transition:
                phase === "drag"
                  ? "none"
                  : "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              filter:
                phase === "drag"
                  ? "drop-shadow(0 18px 24px rgba(0, 0, 0, 0.22))"
                  : "none",
            }}
          >
            <article
              className="svc__card"
              style={{
                // while dragging: tilt eases to 0. After release: the CSS tilt returns.
                transform:
                  phase === "drag"
                    ? `rotate(${straight ? 0 : angle}deg)`
                    : undefined,
              }}
            >
              {children}
            </article>
          </div>,
          document.body,
        )}
    </>
  );
}
