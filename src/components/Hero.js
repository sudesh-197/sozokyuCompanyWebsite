import Dot from "./Dot";
import Ruler from "./Ruler";
import StatusBar from "./StatusBar";
import { ICONS, RULER_VALUES, TAGS } from "@/data/content";
import { HandPointing, HandPeace } from "@phosphor-icons/react/dist/ssr";

const CTA_TEXT = "Let’s Talk";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="row row--hero">
        {/* left ruler */}
        <div className="col col--side col--left hero__margin">
          <Ruler values={RULER_VALUES} variant="hero" />
        </div>

        {/* centre stage */}
        <div className="col col--middle hero__stage">
          <div className="hero__baseline" />
          <Dot className="dot--stage-tl" />
          <Dot className="dot--stage-bl" />

          <div className="hero__guide hero__guide--one" />

          <div className="hero__guide hero__guide--two">
            <ul className="tags">
              {TAGS.map((tag) => (
                <li className="tag" key={tag}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="tag__icon"
                    src={ICONS.bullet}
                    alt=""
                    width={6}
                    height={6}
                  />
                  <span
                    className={`tag__text${tag.endsWith(" ") ? " tag__text--pre" : ""}`}
                  >
                    {tag}
                  </span>
                </li>
              ))}
            </ul>

            <a className="cta" href="/contact" aria-label="Let’s Talk">
              <HandPointing
                className="cta__hand cta__hand--point"
                size={24}
                aria-hidden="true"
              />

              <span className="cta__button">
                <span className="cta__letters" aria-hidden="true">
                  {[...CTA_TEXT].map((ch, i) => (
                    <span key={i} data-letter={ch} style={{ "--i": i }}>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>

              <HandPeace
                className="cta__hand cta__hand--peace"
                size={24}
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="hero__content">
            <h1 className="hero__title">
              <span className="hero__title-line">we are a creative</span>
              <span className="hero__title-line hero__title-line--accent">
                tech agency
              </span>
            </h1>
            <p className="hero__text">
              Let&apos;s create something incredible together – and maybe even
              swap a few travel stories while we&apos;re at it!
            </p>
          </div>
        </div>

        {/* right margin */}
        <div className="col col--side col--right hero__margin hero__margin--right">
          <div className="hero__margin-line" />
          <Dot className="dot--right-bl" />
          <Dot className="dot--right-tl" />
        </div>
      </div>

      <StatusBar />
    </section>
  );
}
