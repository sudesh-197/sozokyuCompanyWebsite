import { ICONS, SERVICES } from "@/data/content";
import DragCard from "./DragCard";

function Thumbs({ service }) {
  if (service.lefts) {
    return service.imgs.map((src, i) => (
      <span
        className="svc__thumb svc__thumb--abs"
        style={{ left: service.lefts[i] }}
        key={i}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" />
      </span>
    ));
  }
  return (
    <div className="svc__thumbs">
      {service.imgs.map((src, i) => (
        <span className="svc__thumb" key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" />
        </span>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <section className="services" id="service">
      <p className="services__label">What we bring to the table</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="services__squiggle"
        src={ICONS.squiggle}
        alt=""
        width={25}
        height={25}
      />

      <div className="services__stage">
        {SERVICES.map((s) => {
          const number = (
            <p className="svc__num" aria-hidden="true">
              {s.id}
            </p>
          );
          return (
            <div className={`svc svc--${s.id}`} key={s.id}>
              <DragCard svcId={s.id}>
                <div className="svc__content">
                  <div className="svc__media">
                    {s.numberOnTop ? (
                      <>
                        <Thumbs service={s} />
                        {number}
                      </>
                    ) : (
                      <>
                        {number}
                        <Thumbs service={s} />
                      </>
                    )}
                  </div>

                  <div className="svc__body">
                    <div className="svc__text">
                      <h3 className="svc__title">{s.title}</h3>
                      <p className="svc__desc">{s.desc}</p>
                    </div>
                    <ul className="svc__chips">
                      {s.tags.map((t) => (
                        <li className="chip" key={t}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DragCard>
            </div>
          );
        })}
      </div>

      <div className="services__fade" />
    </section>
  );
}
