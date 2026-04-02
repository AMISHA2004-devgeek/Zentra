import { ReactNode } from "react";
import { useCarousel } from "@/hooks/useCarousel";

interface SlideData {
  title: ReactNode;
  body: string;
  cardLabel: string;
  cardTitle: string;
  cardBody: string;
  panelCls: string;
  icon: string;
}

interface SplitCarouselProps {
  label: string;
  data: SlideData[];
  flipped?: boolean;
  primaryCta: string;
  secondaryCta: string;
}

const SplitCarousel = ({ label, data, flipped, primaryCta, secondaryCta }: SplitCarouselProps) => {
  const { idx, next, prev, goTo, current } = useCarousel(data);

  return (
    <section className={`split-section${flipped ? " flipped" : ""}`}>
      {flipped && (
        <div className="split-right">
          {data.map((d, i) => (
            <div key={i} className={`img-panel ${d.panelCls}${idx === i ? " active" : ""}`}>{d.icon}</div>
          ))}
          <div className="img-card">
            <div className="img-card-label">{current.cardLabel}</div>
            <div className="img-card-title">{current.cardTitle}</div>
            <div className="img-card-body">{current.cardBody}</div>
          </div>
        </div>
      )}
      <div className="split-left">
        <div className="split-label">{label}</div>
        <h2 className="split-title">{current.title}</h2>
        <p className="split-body">{current.body}</p>
        <div className="split-cta">
          <button className="btn-primary">{primaryCta}</button>
          <button className="btn-secondary">{secondaryCta}</button>
        </div>
        <div className="carousel-dots">
          {data.map((_, i) => (
            <div key={i} className={`dot${idx === i ? " active" : ""}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="arrow-btn" onClick={prev}>←</button>
          <button className="arrow-btn" onClick={next}>→</button>
        </div>
      </div>
      {!flipped && (
        <div className="split-right">
          {data.map((d, i) => (
            <div key={i} className={`img-panel ${d.panelCls}${idx === i ? " active" : ""}`}>{d.icon}</div>
          ))}
          <div className="img-card">
            <div className="img-card-label">{current.cardLabel}</div>
            <div className="img-card-title">{current.cardTitle}</div>
            <div className="img-card-body">{current.cardBody}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SplitCarousel;
