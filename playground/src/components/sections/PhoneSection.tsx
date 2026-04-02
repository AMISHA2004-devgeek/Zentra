const PhoneSection = () => (
  <section className="phone-section">
    <button className="btn-learn-more">Learn more</button>
    <div className="phone-stage">
      <div className="phone-float-card left">
        <div className="float-card-icon">🌙</div>
        <div>
          <div className="float-card-title">Go to bed 1 hour before sleep</div>
          <div className="float-card-body">Wind down early to give your body time to relax before sleep</div>
          <span className="ftag">VITAMIN D</span>
          <span className="ftag">HOMOCYSTEINE</span>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 5 }}>
        <div className="iphone-frame">
          <div className="iphone-statusbar">
            <span className="iphone-time">9:41</span>
            <div className="iphone-notch" />
            <div className="iphone-icons">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="4" width="2" height="8" rx="1" fill="white" />
                <rect x="3.5" y="2.5" width="2" height="9.5" rx="1" fill="white" />
                <rect x="7" y="1" width="2" height="11" rx="1" fill="white" />
                <rect x="10.5" y="0" width="2" height="12" rx="1" fill="white" />
              </svg>
            </div>
          </div>
          <div className="iphone-screen">
            <div className="bio-age-ring">
              <div className="bio-ring-label">YOUR BIOLOGICAL AGE</div>
              <div className="bio-age-num">32</div>
            </div>
            <div className="age-slider-row">
              <div className="age-slider-track">
                <div className="age-slider-fill" />
                <div className="age-slider-thumb" />
              </div>
            </div>
            <div className="age-labels">
              <span>ACTUAL AGE</span>
              <span>HIGHER</span>
            </div>
            <div className="health-pills">
              {[
                { icon: "⚡", label: "Energy", status: "GOOD", cls: "good", color: "#22c55e" },
                { icon: "♥", label: "Circulation", status: "ACCEPTABLE", cls: "ok", color: "#f59e0b" },
                { icon: "🎯", label: "Inflammation", status: "POOR", cls: "poor", color: "#ec4899" },
              ].map(({ icon, label, status, cls, color }) => (
                <div className="hpill" key={label}>
                  <div className="hpill-icon" style={{ color }}>{icon}</div>
                  <div className="hpill-label">{label}</div>
                  <div className={`hpill-status ${cls}`}>{status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="phone-float-card right">
        <div className="hba1c-header">
          <span>💚</span>
          <span className="hba1c-name">HbA1c</span>
          <span className="hba1c-val">34 nmol/l</span>
          <span className="hba1c-badge">OPTIMAL</span>
        </div>
        <div className="hba1c-body">Shows how much sugar has been in your blood for a long time</div>
      </div>
    </div>
  </section>
);

export default PhoneSection;
