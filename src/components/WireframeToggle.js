"use client";

import { useState } from "react";

/* "Wireframe ⇄ Full colour" switch + the 880 × 607 framed screenshot under it
   (Figma "Sozokyu Dashboard" 3895:4674 – toggle 3895:4675, frame 3895:4702).

   Both screens sit in the same frame; the wireframe layer is on top and fades
   in / out when the switch (or either label) is used. Every measurement is
   the Figma value expressed as a % of the frame so it scales with the column. */

/* switch ticks – [x, top, height] inside the 88 × 30 switch */
const TICKS_LONG = [
  [9, 18],
  [44, 18],
  [79, 18],
  [44, 3],
  [79, 3],
  [9, 3],
];
const TICKS_SHORT = [
  [17, 3],
  [51, 3],
  [17, 23],
  [51, 23],
  [27, 3],
  [61, 3],
  [27, 23],
  [61, 23],
  [37, 3],
  [71, 3],
  [37, 23],
  [71, 23],
];

/* a missing file shouldn't show the browser's broken-image glyph */
const hideBroken = (e) => {
  e.currentTarget.style.visibility = "hidden";
};

export default function WireframeToggle({
  colour,
  wireframe,
  defaultColour = true,
}) {
  const [isColour, setIsColour] = useState(defaultColour);

  return (
    <div className="case-toggle">
      <div className="case-toggle__bar">
        <button
          type="button"
          className={`case-toggle__label${isColour ? "" : " is-on"}`}
          onClick={() => setIsColour(false)}
        >
          Wireframe
        </button>

        <button
          type="button"
          role="switch"
          aria-checked={isColour}
          aria-label="Full colour"
          className={`case-switch${isColour ? " is-on" : ""}`}
          onClick={() => setIsColour((v) => !v)}
        >
          <span className="case-switch__groove">
            <span className="case-switch__fill" />
          </span>
          {TICKS_LONG.map(([x, top]) => (
            <span
              key={`l${x}-${top}`}
              className="case-switch__tick case-switch__tick--long"
              style={{ left: x - 0.5, top }}
            />
          ))}
          {TICKS_SHORT.map(([x, top]) => (
            <span
              key={`s${x}-${top}`}
              className="case-switch__tick case-switch__tick--short"
              style={{ left: x - 0.5, top }}
            />
          ))}
          <span className="case-switch__knob">
            <span className="case-switch__glow" />
          </span>
        </button>

        <button
          type="button"
          className={`case-toggle__label${isColour ? " is-on" : ""}`}
          onClick={() => setIsColour(true)}
        >
          Full colour
        </button>
      </div>

      <figure className="case-dash">
        {/* blue wash behind the screenshot */}
        <span className="case-dash__tint" aria-hidden="true" />

        {/* full-colour screenshot */}
        <div className="case-dash__shot" aria-hidden={!isColour}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="case-dash__shot-img"
            src={colour.src}
            alt={colour.alt}
            loading="lazy"
            onError={hideBroken}
          />
        </div>

        {/* wireframe (on top, fades out in full colour) */}
        <div
          className={`case-dash__wire${isColour ? "" : " is-on"}`}
          aria-hidden={isColour}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="case-dash__wire-img"
            src={wireframe.src}
            alt={wireframe.alt}
            loading="lazy"
            onError={hideBroken}
          />
        </div>
      </figure>
    </div>
  );
}
