export default function Ruler({ values, variant = "hero", solid = false }) {
  return (
    <div className={`ruler ruler--${variant}`}>
      {values.map((value) => (
        <div className="ruler__item" key={value}>
          <div className="ruler__rot">
            <p className={`ruler__label${solid ? " ruler__label--solid" : ""}`}>
              {value}
            </p>
            <span className="ruler__tick" />
          </div>
        </div>
      ))}
    </div>
  );
}
