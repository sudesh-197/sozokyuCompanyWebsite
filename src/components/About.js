"use client";

import { useState } from "react";
import { ABOUT_PARAGRAPHS, ICONS, PEOPLE } from "@/data/content";

function Polaroid({ person }) {
  return (
    <div className="polaroid">
      <div className="polaroid__img" style={{ overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={person.photo}
          alt={person.name}
          style={{
            objectPosition: person.focus,
            transform: person.zoom ? `scale(${person.zoom})` : undefined,
            transformOrigin: person.zoomOrigin,
          }}
        />
      </div>
      <div className="polaroid__caption">
        <p className="polaroid__name">{person.name}</p>
        {person.role ? <p className="polaroid__role">{person.role}</p> : null}
      </div>
    </div>
  );
}

export default function About() {
  const [active, setActive] = useState(0);
  const total = PEOPLE.length;

  // next / previous / click on a photo – simply swaps which photo is in front
  const step = (d) => {
    if (total < 2) return;
    setActive((i) => (i + d + total) % total);
  };

  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__eyebrow-wrap">
          <p className="eyebrow">A little about SOZOQ</p>
        </div>

        <div className="about__body">
          <div className="about__row">
            <div className="about__left">
              <div className="about__side">
                <div className="about__photos">
                  <div className="about__stack">
                    {PEOPLE.map((person, i) => {
                      // 0 = front photo, 1 = the one right behind it, others hidden
                      const slot = (i - active + total) % total;
                      const place =
                        slot === 0
                          ? "pol--front"
                          : slot === 1
                            ? "pol--back"
                            : "pol--hidden";
                      return (
                        <div
                          key={person.name}
                          className={`pol ${place}`}
                          onClick={() => slot < 2 && step(1)}
                          onKeyDown={(e) => {
                            if (
                              slot === 0 &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              step(1);
                            }
                          }}
                          role={slot === 0 ? "button" : undefined}
                          tabIndex={slot === 0 ? 0 : undefined}
                          aria-label={
                            slot === 0 ? "Show next photograph" : undefined
                          }
                        >
                          <div className="pol__rot">
                            <Polaroid person={person} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="about__controls">
                  <p className="about__count">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </p>
                  <div className="about__btns">
                    <button
                      type="button"
                      className="about__btn"
                      aria-label="Previous photograph"
                      onClick={() => step(-1)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ICONS.arrowLeft}
                        alt=""
                        width={14}
                        height={14}
                      />
                    </button>
                    <button
                      type="button"
                      className="about__btn"
                      aria-label="Next photograph"
                      onClick={() => step(1)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ICONS.arrowRight}
                        alt=""
                        width={14}
                        height={14}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="about__text">
              <div className="about__copy">
                {ABOUT_PARAGRAPHS.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about__fade" />
    </section>
  );
}
