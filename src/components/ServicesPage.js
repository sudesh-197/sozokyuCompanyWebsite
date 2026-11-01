import { SERVICES_PAGE } from "@/data/content";

/* /services – Figma desktop 3976:5976 · mobile 3978:6184 */
export default function ServicesPage() {
  const { title, lead, items } = SERVICES_PAGE;

  return (
    <div className="svcp">
      <div className="svcp__inner">
        <header className="svcp__intro">
          <h1 className="svcp__h1">{title}</h1>
          <p className="svcp__lead">{lead}</p>
        </header>

        {items.map((item) => (
          <section
            className="svcp__item"
            id={item.id}
            aria-labelledby={`${item.id}-title`}
            key={item.id}
          >
            <p className="svcp__label">{item.label}</p>
            <div className="svcp__body">
              <h2 className="svcp__h2" id={`${item.id}-title`}>
                {item.heading}
              </h2>
              {item.paragraphs.map((text, i) => (
                <p className="svcp__p" key={i}>
                  {text}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
