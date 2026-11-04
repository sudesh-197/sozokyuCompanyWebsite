"use client";

import { useState } from "react";
import { FAQS, ICONS } from "@/data/content";

export default function Faq() {
  const [open, setOpen] = useState(-1); // all questions closed by default

  return (
    <section className="faq" id="faq">
      <div className="faq__head">
        <p className="eyebrow">Frequently Asked Questions&nbsp;</p>
        <p className="faq__hand">Let’s clear things up</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="faq__squiggle"
        src={ICONS.squiggle}
        alt=""
        width={25}
        height={25}
      />

      <ul className="faq__list">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li className={`faq__item${isOpen ? " is-open" : ""}`} key={f.q}>
              <button
                type="button"
                className="faq__row"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICONS.plus} alt="" width={24} height={24} />
                <span className="faq__q">{f.q}</span>
              </button>
              <div className="faq__a-wrap" id={`faq-answer-${i}`} role="region">
                <div className="faq__a">
                  <p>{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
