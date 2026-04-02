import { useState } from "react";

const groups = [
  { label: "By Industry", items: ["Banking", "Insurance", "Government", "Telecommunications"] },
  { label: "By Topic", items: ["Compliance", "Analytics", "Risk Management"] },
  { label: "By Solutions", items: ["Cloud", "AI / ML", "Security"] },
];

const FilterCard = () => {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true, 1: false, 2: false });
  const [ck, setCk] = useState<Record<string, boolean>>({ Banking: true, Insurance: true });

  return (
    <div className="filter-card">
      <div className="filter-header">
        <span className="filter-header-label">SELECTED FILTERS</span>
        <button className="filter-close">✕</button>
      </div>
      <div className="filter-divider" />
      {groups.map((gr, gi) => (
        <div className="filter-group" key={gi}>
          <div className="filter-group-header" onClick={() => setOpen((o) => ({ ...o, [gi]: !o[gi] }))}>
            <span>{gr.label}</span>
            <span>{open[gi] ? "▲" : "▼"}</span>
          </div>
          {open[gi] && (
            <div>
              {gr.items.map((item) => (
                <div className="filter-item" key={item} onClick={() => setCk((c) => ({ ...c, [item]: !c[item] }))}>
                  <div className={`cb${ck[item] ? " checked" : ""}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
