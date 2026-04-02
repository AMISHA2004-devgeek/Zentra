import { useState, useEffect } from "react";
import heroImg1 from "@/assets/polaroid1.jpg";
import heroImg2 from "@/assets/polaroid2.jpg";
import heroImg3 from "@/assets/polaroid3.jpg";
import heroImg4 from "@/assets/polaroid4.jpg";
import heroImg5 from "@/assets/polaroid5.jpg";
import heroImg6 from "@/assets/polaroid6.jpg";

const heroSlides = [
  { img: heroImg1, title: "Building Better Child Care", subtitle: "How Playground transforms early education centers" },
  { img: heroImg2, title: "Teachers Who Inspire", subtitle: "Meet the educators shaping tomorrow's leaders" },
  { img: heroImg3, title: "Creative Learning Spaces", subtitle: "Where imagination meets education" },
  { img: heroImg4, title: "Family Connections", subtitle: "Bridging the gap between home and care" },
  { img: heroImg5, title: "Growing Together", subtitle: "Every milestone matters in early childhood" },
  { img: heroImg6, title: "Community & Love", subtitle: "Creating a village around every child" },
];

const transitions = ["feat-fade", "feat-slide-left", "feat-slide-up", "feat-zoom", "feat-slide-right", "feat-fade"];

const articles = [
  {
    id: "compliance-doc",
    category: "ANNOUNCEMENT",
    tag: "PDF Handouts",
    title: "Compliance Document for Multi-Channeled Firmware",
    excerpt: "Gathered by gravity star stuff harvesting star light the ash of stellar alchemy vastness is...",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.\n\nAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.`,
    author: "Schiller Bhaicov",
    date: "09.02.23",
    color: "#dc2626",
  },
  {
    id: "installation-doc",
    category: "ARTICLES",
    tag: "Articles",
    title: "Inverse Solution-Oriented Installation Documentation",
    excerpt: "Gathered by gravity star stuff harvesting star light the ash of stellar alchemy vastness is...",
    content: `Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nNisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.\n\nSit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.`,
    author: "Charmon Prakova",
    date: "09.02.23",
    color: "#0d9488",
  },
  {
    id: "pricing-structure",
    category: "FEATURED",
    tag: "Links",
    title: "Multi-Layered System-Worthy Pricing Structure",
    excerpt: "Gathered by gravity star stuff harvesting star light the ash of stellar alchemy vastness is...",
    content: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.\n\nIn voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.\n\nEaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.\n\nAut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    author: "Barackov and Sons",
    date: "09.02.23",
    color: "#7c3aed",
  },
  {
    id: "optimal-ai",
    category: "RESEARCH",
    tag: "Videos",
    title: "Down-Sized Optimal Artificial Intelligence for Child Care",
    excerpt: "Gathered by gravity star stuff harvesting star light the ash of stellar alchemy vastness is...",
    content: `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.\n\nEx ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.\n\nQuae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    author: "Research Team",
    date: "10.03.23",
    color: "#ea580c",
  },
  {
    id: "enrollment-strategies",
    category: "GUIDE",
    tag: "PDF Handouts",
    title: "Enrollment Growth Strategies for Modern Child Care Centers",
    excerpt: "Learn how to boost enrollment by 40% using proven digital marketing and community outreach methods...",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.\n\nSed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.\n\nConsequat enim, sit amet varius lectus. Integer vitae magna lacinia, interdum sem nec, pharetra sem. In quis ante non erat volutpat auctor.\n\nPraesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non mi porta gravida at eget metus.\n\nFusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.`,
    author: "Growth Division",
    date: "11.15.23",
    color: "#2563eb",
  },
  {
    id: "safety-compliance",
    category: "COMPLIANCE",
    tag: "Other Files",
    title: "Safety & Compliance Framework for Early Education Facilities",
    excerpt: "A comprehensive guide to meeting state and federal safety requirements for child care operations...",
    content: `Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.\n\nVestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ut facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo.\n\nDonec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.\n\nInteger posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.\n\nEtiam porta sem malesuada magna mollis euismod. Donec sed odio dui.`,
    author: "Compliance Team",
    date: "12.01.23",
    color: "#059669",
  },
];

const bgColors = ["#dc2626", "#0d9488", "#7c3aed", "#ea580c", "#2563eb", "#059669"];

const FeaturedPage = () => {
  const [idx, setIdx] = useState(0);
  const [transClass, setTransClass] = useState(transitions[0]);
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % heroSlides.length;
        setTransClass(transitions[next]);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const article = openArticle ? articles.find((a) => a.id === openArticle) : null;

  if (article) {
    const paragraphs = article.content.split("\n\n");
    return (
      <div className="newspaper-page">
        <div className="newspaper-header">
          <div className="newspaper-date">{article.date}</div>
          <h1 className="newspaper-masthead">THE PLAYGROUND TIMES</h1>
          <div className="newspaper-edition">Featured Edition</div>
        </div>
        <div className="newspaper-rule" />
        <div className="newspaper-body">
          <div className="newspaper-headline">
            <span className="newspaper-cat" style={{ background: article.color }}>{article.category}</span>
            <h2>{article.title}</h2>
            <div className="newspaper-byline">By {article.author} · {article.date}</div>
          </div>
          <div className="newspaper-columns">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "newspaper-dropcap" : ""}>{p}</p>
            ))}
          </div>
        </div>
        <div className="newspaper-footer-bar">
          <button className="newspaper-back" onClick={() => setOpenArticle(null)}>← Back to Featured</button>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-page">
      {/* Hero Carousel */}
      <div className="feat-hero">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`feat-hero-slide ${i === idx ? `active ${transClass}` : ""}`}
          >
            <img src={slide.img} alt={slide.title} />
            <div className="feat-hero-overlay">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
        <div className="feat-hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`feat-dot${i === idx ? " active" : ""}`}
              onClick={() => { setIdx(i); setTransClass(transitions[i]); }}
            />
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="feat-cards-section">
        <h2 className="feat-cards-heading">Resource Center</h2>
        <div className="feat-cards-grid">
          {articles.map((a, i) => (
            <div key={a.id} className="feat-card">
              <div className="feat-card-img" style={{ background: `linear-gradient(135deg, ${bgColors[i % bgColors.length]}88, ${bgColors[(i + 2) % bgColors.length]}88)` }}>
                <span className="feat-card-badge" style={{ background: a.color }}>{a.tag}</span>
              </div>
              <div className="feat-card-body">
                <span className="feat-card-cat" style={{ color: a.color }}>{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <button className="feat-read-more" onClick={() => setOpenArticle(a.id)}>
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
