import Dot from "./Dot";

/* full-width hairline with a dot at each end (shared by the home Work
   section and the /work page) */
export default function SectionRule({ n }) {
  return (
    <div className={`work__rule work__rule--${n}`}>
      <Dot className="dot--rule-l" />
      <Dot className="dot--rule-r" />
    </div>
  );
}
