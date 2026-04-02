import FoxicoHero from "@/components/sections/FoxicoHero";
import FairyLightsWithPolaroids from "@/components/FairyLightsWithPolaroids";
import SplitCarousel from "@/components/sections/SplitCarousel";
import CuboidSection from "@/components/sections/CuboidSection";
import PhoneSection from "@/components/sections/PhoneSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FeedbackSection from "@/components/sections/FeedbackSection";

const c1Data = [
  { title: <>Built for <em>every</em> child care provider</>, body: "Playground gives you the tools to run your center smoothly — from billing and scheduling to family communication.", cardLabel: "Case Study", cardTitle: "Sunrise Academy cut admin time by 60%", cardBody: "After switching to Playground, the director spends mornings with kids — not paperwork.", panelCls: "img-panel-bg1", icon: "🏫👶" },
  { title: <>Manage billing <em>effortlessly</em></>, body: "Say goodbye to chasing invoices. Automated billing, payment reminders, and subsidy management.", cardLabel: "Feature", cardTitle: "Automated billing saves 5 hrs/week", cardBody: "No more chasing payments. Auto-billing means directors focus on children, not collections.", panelCls: "img-panel-bg2", icon: "📊💻" },
  { title: <>Keep families <em>informed & connected</em></>, body: "Send daily reports, photos, and milestones instantly. Families stay close, even when they're far away.", cardLabel: "Story", cardTitle: "Parents love the daily updates", cardBody: '"I feel like I\'m there even when I\'m at work" — Playground parent, Chicago.', panelCls: "img-panel-bg3", icon: "👨‍👩‍👧‍👦💌" },
];

const c2Data = [
  { title: <>Helping <em>families</em> connect with great care</>, body: "We believe every child deserves access to high-quality care. Playground helps providers stand out.", cardLabel: "Journal", cardTitle: "What being family-first means for our partners", cardBody: "We spent two years building tools that actually respect how child care educators spend their time.", panelCls: "img-panel-bg2", icon: "🌱👩" },
  { title: <>Grow your <em>enrollment</em> organically</>, body: "With a beautiful profile, instant messaging, and tour scheduling, finding new families has never been easier.", cardLabel: "Feature", cardTitle: "How smart profiles increase enrollment by 40%", cardBody: "Centers with complete Playground profiles see 40% more parent inquiries in 90 days.", panelCls: "img-panel-bg1", icon: "🎒📚" },
  { title: <>Build a <em>thriving</em> community</>, body: "From local events to parent nights, Playground helps you create a center families love and recommend.", cardLabel: "Community", cardTitle: "Building community one family at a time", cardBody: "Providers who use engagement tools report stronger retention and more referrals year over year.", panelCls: "img-panel-bg3", icon: "🏆⭐" },
];

const HomePage = () => (
  <>
    <FoxicoHero />
    <FairyLightsWithPolaroids />
    <SplitCarousel label="Platform Overview" data={c1Data} primaryCta="Get a demo" secondaryCta="Learn more →" />
    <CuboidSection />
    <SplitCarousel label="Community & Growth" data={c2Data} flipped primaryCta="Join Playground" secondaryCta="See success stories →" />
    <PhoneSection />
    <TestimonialsSection />
    <FeedbackSection />
  </>
);

export default HomePage;
