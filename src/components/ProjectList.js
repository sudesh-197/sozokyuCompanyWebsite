import Link from "next/link";
import Dot from "./Dot";
import { ICONS, PROJECTS } from "@/data/content";

/* internal case-study links use next/link, anything else a plain anchor */
function ProjectLink({ project: p }) {
  const internal = p.href.startsWith("/");
  const Tag = internal ? Link : "a";
  return (
    <Tag
      className={`proj__link${internal ? " proj__link--cover" : ""}`}
      href={p.href}
    >
      <span>{p.cta}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ICONS.arrowRightSm} alt="" width={15} height={15} />
    </Tag>
  );
}

/* one project row: text on the left, hover-animated card on the right.
   All hover animation (gradient, flying images) lives in the .proj CSS. */
export function ProjectRow({ project: p }) {
  return (
    <li
      className={`proj proj--${p.href.split("/").pop()}${
        p.href.startsWith("/") ? " proj--linked" : ""
      }`}
    >
      <div className="proj__info">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="proj__icon"
          src={p.icon ?? ICONS.projectIcon}
          alt=""
          width={28}
          height={28}
        />
        <div className="proj__title-wrap">
          <h3 className="proj__title">{p.title}</h3>
        </div>
        <div className="proj__desc-wrap">
          <p className="proj__desc">{p.desc}</p>
        </div>
        <div className="proj__link-wrap">
          <ProjectLink project={p} />
        </div>
      </div>

      <div className="proj__card">
        <div className="proj__card-border" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="proj__main" src={p.images.main} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="proj__cap" src={p.images.cap} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="proj__button" src={p.images.button} alt="" />
      </div>
    </li>
  );
}

export default function ProjectList({ projects = PROJECTS }) {
  return (
    <ul className="work__list">
      {projects.map((p) => (
        <ProjectRow project={p} key={p.title} />
      ))}
    </ul>
  );
}
