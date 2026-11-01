import Dot from "./Dot";
import Clock from "./Clock";

export default function StatusBar() {
  return (
    <div className="row row--status">
      <div className="status__side status__side--left" />

      <div className="status__middle">
        <div className="status__inner">
          <p className="status__text status__text--upper">
            globally Available{" "}
          </p>
          <p className="status__text">
            <Clock />
          </p>
          <Dot className="dot--status-left" />
        </div>
      </div>

      <div className="status__side status__side--right">
        <Dot className="dot--status-right" />
      </div>
    </div>
  );
}
