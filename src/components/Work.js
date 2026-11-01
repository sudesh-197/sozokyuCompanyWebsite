import WorkHead from "./WorkHead";
import ProjectList from "./ProjectList";
import SectionRule from "./SectionRule";
import { HIGHLIGHTS, TRUSTED } from "@/data/content";

/* one ticker row: the logo list is rendered twice so the loop has no gap */
function LogoRow({ n }) {
  return (
    <div className={`trusted__row trusted__row--${n}`}>
      <div className="trusted__track">
        {[0, 1, 2, 3].map((copy) => (
          <div className="trusted__set" key={copy}>
            {TRUSTED.logos.map((l, i) => (
              <div
                className={`trusted__item ${
                  l.pill ? "trusted__item--pill" : "trusted__item--full"
                }`}
                style={{ width: l.item }}
                key={i}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt="" width={l.w} height={l.h} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section className="work" id="work">
      {/* heading band + corner dots */}
      <WorkHead />

      {/* project rows */}
      <ProjectList />

      <div className="work__vline" aria-hidden="true" />

      <div className="work__after">
        <SectionRule n={1} />

        {/* Trusted by */}
        <div className="trusted">
          <div className="trusted__title-wrap">
            <p className="trusted__title">
              <span className="trusted__title-ink">{TRUSTED.lead}</span>
              {TRUSTED.accent}
            </p>
          </div>
          <div className="trusted__logos" aria-hidden="true">
            <div className="trusted__stage">
              <LogoRow n={1} />
              <LogoRow n={2} />
            </div>
          </div>
        </div>
        <SectionRule n={2} />

        {/* three highlights */}
        <div className="hl">
          {HIGHLIGHTS.map((h) => (
            <div className="hl__item" key={h.title}>
              <h4 className="hl__title">{h.title}</h4>
              <p className="hl__text">{h.text}</p>
            </div>
          ))}
        </div>
        <SectionRule n={3} />
      </div>
      <div className="work__fade" />
    </section>
  );
}
