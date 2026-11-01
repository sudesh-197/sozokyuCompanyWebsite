import Dot from "./Dot";

/* "Work. / A selection of Best projects." heading band with its four corner
   dots. `children` is rendered inside the middle column – used by /work for
   the cat mascot, so the home page stays untouched. */
export default function WorkHead({
  title = "Work.",
  subtitle = "A selection of Best projects.",
  children,
}) {
  return (
    <>
      <div className="work__head">
        <div className="work__col work__col--left" />
        <div className="work__col work__col--mid">
          <div className="work__title">
            <p className="work__title-1">{title}</p>
            <p className="work__title-2">{subtitle}</p>
          </div>
          {children}
        </div>
        <div className="work__col work__col--right" />
      </div>
      <Dot className="dot--work-tl" />
      <Dot className="dot--work-tr" />
      <Dot className="dot--work-bl" />
      <Dot className="dot--work-br" />
    </>
  );
}
