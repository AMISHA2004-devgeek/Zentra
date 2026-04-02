import React, { useState } from "react";
import { Plane, Utensils, Bed, Ticket, X, RefreshCw, Gem, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import bali from "@/assets/destinations/bali.jpg";
import santorini from "@/assets/destinations/santorini.jpg";
import tokyo from "@/assets/destinations/tokyo.jpg";
import swiss from "@/assets/destinations/swiss-alps.jpg";
import marrakech from "@/assets/destinations/marrakech.jpg";
import patagonia from "@/assets/destinations/patagonia.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "food" | "travel" | "stay" | "activity";
type Activity = {
  name: string; emoji: string; time: string; cost: number;
  category: Category; tip: string; day: number;
  cheaperAlt?: { name: string; cost: number };
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const destinations = [
  { id: 1, name: "Bali",       country: "Indonesia",   image: bali,      tag: "🌴 Beach & Culture" },
  { id: 2, name: "Santorini",  country: "Greece",      image: santorini, tag: "🏛️ Luxury"          },
  { id: 3, name: "Tokyo",      country: "Japan",       image: tokyo,     tag: "🏙️ Urban"            },
  { id: 4, name: "Swiss Alps", country: "Switzerland", image: swiss,     tag: "⛰️ Adventure"        },
  { id: 5, name: "Marrakech",  country: "Morocco",     image: marrakech, tag: "🕌 Culture"          },
  { id: 6, name: "Patagonia",  country: "Argentina",   image: patagonia, tag: "🏔️ Wild"             },
];

const VIBES = ["🍜 Food & Cuisine","🧗 Adventure","🧘 Chill & Relax","🎉 Nightlife","🏛️ Culture & History","🛍️ Shopping","🏖️ Beach","📸 Photography"];

const ACTIVITY_POOLS: Record<Category, { name: string; emoji: string; cost: number; tip: string; cheaperAlt?: { name: string; cost: number } }[]> = {
  food: [
    { name: "Street Food Market Tour", emoji: "🍜", cost: 400,  tip: "Go before noon — less crowd.", cheaperAlt: { name: "Local Canteen Lunch", cost: 150 } },
    { name: "Fine Dining Experience",  emoji: "🍽️", cost: 2200, tip: "Book in advance.",              cheaperAlt: { name: "Local Dhaba Dinner", cost: 350 } },
    { name: "Local Breakfast Café",    emoji: "☕", cost: 250,  tip: "Try the house special." },
    { name: "Cooking Class",           emoji: "👨‍🍳", cost: 1200, tip: "Take the recipe card home!", cheaperAlt: { name: "Street Food Tour", cost: 400 } },
    { name: "Night Food Walk",         emoji: "🌙", cost: 500,  tip: "Best after 8 PM." },
    { name: "Rooftop Dinner",          emoji: "🌆", cost: 1800, tip: "Reserve the sunset slot.",      cheaperAlt: { name: "Night Food Walk", cost: 500 } },
  ],
  activity: [
    { name: "Sunrise Hike",            emoji: "🌄", cost: 200,  tip: "Start at 5 AM for best views." },
    { name: "Snorkeling Trip",         emoji: "🤿", cost: 1500, tip: "Weekday mornings clearer.",      cheaperAlt: { name: "Beach Swimming", cost: 0 } },
    { name: "Temple Visit",            emoji: "⛩️", cost: 150,  tip: "Carry a scarf." },
    { name: "Beach Volleyball",        emoji: "🏐", cost: 0,    tip: "Free at public beaches!" },
    { name: "Zip-lining Adventure",    emoji: "🧗", cost: 1800, tip: "Book combo packages.",           cheaperAlt: { name: "Cycling Tour", cost: 600 } },
    { name: "Cycling Tour",            emoji: "🚴", cost: 600,  tip: "Morning ride beats the heat." },
    { name: "Photography Walk",        emoji: "📸", cost: 0,    tip: "Golden hour 6–7 AM." },
    { name: "Museum & Gallery Visit",  emoji: "🏛️", cost: 300,  tip: "Student discounts available." },
  ],
  travel: [
    { name: "Airport Transfer",        emoji: "🚗", cost: 800,  tip: "Pre-book to avoid surge.",       cheaperAlt: { name: "City Metro Day Pass", cost: 150 } },
    { name: "City Metro Day Pass",     emoji: "🚇", cost: 150,  tip: "Unlimited rides." },
    { name: "Scooter Rental",          emoji: "🛵", cost: 500,  tip: "Fuel usually included." },
    { name: "Ferry Ride",              emoji: "⛴️", cost: 400,  tip: "Deck seat = best views." },
    { name: "Tuk-Tuk City Tour",       emoji: "🛺", cost: 350,  tip: "Negotiate price upfront." },
  ],
  stay: [
    { name: "Boutique Guesthouse",     emoji: "🏠", cost: 1800, tip: "Ask for breakfast inclusion." },
    { name: "Luxury Beach Resort",     emoji: "🏨", cost: 5500, tip: "Off-season: 40% cheaper.",       cheaperAlt: { name: "Boutique Guesthouse", cost: 1800 } },
    { name: "Heritage Haveli",         emoji: "🏰", cost: 2800, tip: "Ask for courtyard room." },
    { name: "Hostel (Private Room)",   emoji: "🛏️", cost: 900,  tip: "Great to meet travellers." },
    { name: "Airbnb Apartment",        emoji: "🏡", cost: 2200, tip: "Cook breakfast, save ₹400/day.", cheaperAlt: { name: "Hostel (Private Room)", cost: 900 } },
  ],
};

const CAT_COLORS: Record<Category, string> = {
  travel: "bg-blue-100 text-blue-600", stay: "bg-teal-100 text-teal-600",
  food: "bg-orange-100 text-orange-600", activity: "bg-amber-100 text-amber-600",
};
const CAT_BAR: Record<Category, string> = {
  travel: "bg-blue-400", stay: "bg-teal-400", food: "bg-orange-400", activity: "bg-amber-400",
};
const CAT_ICONS: Record<Category, React.ElementType> = {
  travel: Plane, stay: Bed, food: Utensils, activity: Ticket,
};

function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function buildItinerary(days: number, luxury: boolean): Activity[] {
  const acts: Activity[] = [];
  for (let d = 1; d <= days; d++) {
    const pattern: Category[] = d === 1
      ? ["travel","activity","food","activity","food","stay"]
      : ["activity","food","activity","food","stay"];
    const times = ["8:00 AM","10:30 AM","1:00 PM","4:00 PM","7:30 PM","10:00 PM"];
    pattern.forEach((cat, idx) => {
      const base = pickRandom(ACTIVITY_POOLS[cat]);
      acts.push({
        name: base.name, emoji: base.emoji, tip: base.tip,
        cost: luxury ? Math.round(base.cost * 1.75) : base.cost,
        category: cat, day: d, time: times[idx] ?? "9:00 AM",
        cheaperAlt: base.cheaperAlt,
      });
    });
  }
  return acts;
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function MiniCalendar({ startDate, endDate, onRangeChange }: {
  startDate: Date | null; endDate: Date | null;
  onRangeChange: (s: Date, e: Date) => void;
}) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selecting, setSelecting] = useState<"start"|"end">("start");
  const [hovered,   setHovered]   = useState<Date | null>(null);

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);

  const same   = (a:Date|null, b:Date) => !!a && a.toDateString()===b.toDateString();
  const inRange = (d:Date) => {
    const e = endDate || hovered;
    if (!startDate || !e) return false;
    const [lo,hi] = startDate<=e ? [startDate,e] : [e,startDate];
    return d>lo && d<hi;
  };
  const isPast = (d:Date) => d < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const handleDay = (d:Date) => {
    if (isPast(d)) return;
    if (selecting==="start" || !startDate) { onRangeChange(d,d); setSelecting("end"); }
    else {
      const [s,e] = d<startDate ? [d,startDate] : [startDate,d];
      onRangeChange(s,e); setSelecting("start");
    }
  };

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({length:daysInMonth},(_,i)=>new Date(viewYear,viewMonth,i+1))
  ];

  return (
    <div className="select-none">
      {/* Nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4"/>
        </button>
        <span className="font-bold text-sm">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors">
          <ChevronRight className="w-4 h-4"/>
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d=>(
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>
      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date,i) => {
          if (!date) return <div key={`e-${i}`}/>;
          const past    = isPast(date);
          const isStart = same(startDate, date);
          const isEnd   = same(endDate, date);
          const range   = inRange(date);
          const isToday = date.toDateString()===today.toDateString();
          return (
            <div
              key={i}
              onMouseEnter={()=>!past && selecting==="end" && startDate && setHovered(date)}
              onMouseLeave={()=>setHovered(null)}
              onClick={()=>handleDay(date)}
              className={[
                "h-8 flex items-center justify-center text-xs font-medium cursor-pointer transition-all rounded-md",
                past    ? "text-gray-300 cursor-not-allowed" : "hover:bg-pink-50",
                range   ? "bg-pink-50 rounded-none" : "",
              ].join(" ")}
            >
              <span className={[
                "w-7 h-7 flex items-center justify-center rounded-full transition-all",
                isStart||isEnd ? "bg-pink-500 text-white font-bold shadow" : "",
                isToday && !isStart && !isEnd ? "ring-2 ring-pink-300 text-pink-600" : "",
                !isStart && !isEnd && !past ? "text-gray-700" : "",
              ].join(" ")}>
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      {startDate && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-800">
              {startDate.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
            </span>
            {endDate && endDate.toDateString()!==startDate.toDateString() && (
              <> → <span className="font-semibold text-gray-800">
                {endDate.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
              </span></>
            )}
          </p>
          {endDate && endDate.toDateString()!==startDate.toDateString() && (
            <span className="text-xs bg-pink-100 text-pink-600 font-bold px-2 py-0.5 rounded-full">
              {Math.round((endDate.getTime()-startDate.getTime())/86400000)+1} days
            </span>
          )}
        </div>
      )}
      <p className="text-xs text-gray-400 text-center mt-2">
        {selecting==="start" ? "Select departure date" : "Select return date"}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ZenPlanner() {
  const [budget,      setBudget]      = useState(15000);
  const [days,        setDays]        = useState(4);
  const [destination, setDestination] = useState("");
  const [activeVibes, setActiveVibes] = useState<string[]>(["🍜 Food & Cuisine"]);
  const [itinerary,   setItinerary]   = useState<Activity[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [luxury,      setLuxury]      = useState(false);
  const [showCal,     setShowCal]     = useState(false);
  const [startDate,   setStartDate]   = useState<Date | null>(null);
  const [endDate,     setEndDate]     = useState<Date | null>(null);

  const totalCost = itinerary.reduce((s,a)=>s+a.cost,0);
  const remaining = budget - totalCost;
  const pct       = budget>0 ? Math.min((totalCost/budget)*100,100) : 0;
  const isOver    = totalCost>budget;
  const isNear    = !isOver && pct>=85;

  const breakdown: Record<Category,number> = {food:0,travel:0,stay:0,activity:0};
  itinerary.forEach(a=>{breakdown[a.category]+=a.cost;});

  const toggleVibe = (v:string) =>
    setActiveVibes(p=>p.includes(v)?p.filter(x=>x!==v):[...p,v]);

  const generate = (lux=luxury) => {
    setLoading(true);
    setTimeout(()=>{setItinerary(buildItinerary(days,lux));setLoading(false);},900);
  };

  const remove      = (i:number) => setItinerary(p=>p.filter((_,j)=>j!==i));
  const swapCheaper = (idx:number) =>
    setItinerary(prev=>{
      const next=[...prev], alt=next[idx].cheaperAlt;
      if(alt) next[idx]={...next[idx],name:alt.name,cost:alt.cost,cheaperAlt:undefined};
      return next;
    });

  const toggleLuxury = () => {
    const next=!luxury; setLuxury(next);
    if(itinerary.length) generate(next);
  };

  const handleRange = (s:Date,e:Date) => {
    setStartDate(s); setEndDate(e);
    const d=Math.round((e.getTime()-s.getTime())/86400000)+1;
    if(d>0) setDays(d);
  };

  const dateLabel = () => {
    if(!startDate) return "Pick travel dates";
    const s=startDate.toLocaleDateString("en-IN",{day:"numeric",month:"short"});
    if(!endDate||endDate.toDateString()===startDate.toDateString()) return s;
    return `${s} → ${endDate.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}`;
  };

  return (
    // pt-16 keeps content below your fixed navbar (~64 px)
    <div className="min-h-screen bg-[#f5f0e8] font-sans pt-16">

      {/* ── DESTINATIONS ─────────────────────────────────────────── */}
      <section className="px-6 py-8">
        <p className="text-xs text-muted-foreground mb-4 font-medium tracking-wide">
          Click a destination to auto-fill the planner ↓
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {destinations.map(dest=>(
            <div
              key={dest.id}
              onClick={()=>setDestination(dest.name)}
              className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg
                ${destination===dest.name?"border-pink-400 shadow-md ring-2 ring-pink-200":"border-transparent"}`}
            >
              <div className="relative h-36">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-white font-bold text-sm leading-tight">{dest.name}</p>
                  <p className="text-white/70 text-xs">{dest.country}</p>
                </div>
              </div>
              <div className="bg-white px-3 py-1.5">
                <span className="text-xs font-medium text-orange-500">{dest.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNER FORM ─────────────────────────────────────────── */}
      <section className="px-6 pb-6">
        <div className="bg-[#1a1d2e] rounded-3xl p-8">
          <h2 className="text-white font-bold text-xl mb-6">🤖 AI Trip Generator</h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              {label:"Destination", value:destination, type:"text",   placeholder:"e.g. Bali, Tokyo…",  set:(v:string)=>setDestination(v)},
              {label:"Budget (₹)",  value:budget,      type:"number", placeholder:"15000",              set:(v:string)=>setBudget(Number(v))},
              {label:"Duration (Days)", value:days,    type:"number", placeholder:"4",                  set:(v:string)=>setDays(Number(v))},
            ].map(f=>(
              <div key={f.label}>
                <label className="text-white/50 text-xs uppercase tracking-widest mb-1 block">{f.label}</label>
                <input
                  type={f.type} value={f.value} placeholder={f.placeholder}
                  onChange={e=>f.set(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-pink-400 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Calendar date picker */}
          <div className="mb-6">
            <label className="text-white/50 text-xs uppercase tracking-widest mb-2 block">📅 Travel Dates</label>
            <button
              onClick={()=>setShowCal(s=>!s)}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all
                ${showCal
                  ?"bg-pink-500/20 border-pink-400/60 text-pink-300"
                  :"bg-white/8 border-white/15 text-white/70 hover:border-pink-400 hover:text-pink-300"}`}
            >
              <Calendar className="w-4 h-4"/>
              {dateLabel()}
              {startDate && endDate && endDate.toDateString()!==startDate.toDateString() && (
                <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{days}d</span>
              )}
            </button>

            {showCal && (
              <div className="mt-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 max-w-xs">
                <MiniCalendar startDate={startDate} endDate={endDate} onRangeChange={handleRange}/>
              </div>
            )}
          </div>

          {/* Vibes */}
          <p className="text-white/50 text-xs uppercase tracking-widest mb-3">✨ Your Vibe</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {VIBES.map(v=>(
              <button key={v} onClick={()=>toggleVibe(v)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all
                  ${activeVibes.includes(v)
                    ?"bg-orange-500 border-orange-500 text-white"
                    :"bg-white/5 border-white/15 text-white/60 hover:border-orange-400 hover:text-orange-300"}`}
              >{v}</button>
            ))}
          </div>

          {/* ── GENERATE PLAN — big pink standalone CTA ── */}
          <button
            onClick={()=>generate()} disabled={loading}
            className="w-full py-4 mb-4 rounded-2xl font-bold text-white text-base tracking-wide transition-all
              bg-gradient-to-r from-pink-500 to-rose-500
              hover:from-pink-400 hover:to-rose-400
              active:scale-[0.99]
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-[0_6px_28px_rgba(236,72,153,0.5)]
              hover:shadow-[0_10px_36px_rgba(236,72,153,0.65)]
              hover:-translate-y-0.5"
          >
            {loading ? "✨ Generating your perfect trip…" : "✨ Generate My Trip Plan"}
          </button>

          {/* Secondary row */}
          <div className="flex gap-3">
            <Button onClick={()=>generate()} variant="outline"
              className="flex-1 border-yellow-500/40 text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-xl py-3 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4"/> Different Vibe
            </Button>
            <Button onClick={toggleLuxury} variant="outline"
              className={`flex-1 rounded-xl py-3 flex items-center justify-center gap-2 transition-all
                ${luxury?"bg-teal-400/25 border-teal-400/50 text-teal-300":"border-teal-500/40 text-teal-400 bg-teal-500/10 hover:bg-teal-500/20"}`}>
              <Gem className="w-4 h-4"/> {luxury?"💎 Luxury ON":"Go Luxury"}
            </Button>
          </div>
        </div>
      </section>

      {/* ── LOADING ──────────────────────────────────────────────── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"/>
          <p className="text-muted-foreground text-sm">AI is crafting your perfect trip…</p>
        </div>
      )}

      {/* ── RESULTS ──────────────────────────────────────────────── */}
      {!loading && itinerary.length>0 && (
        <section className="px-6 pb-16 grid lg:grid-cols-[1.4fr_1fr] gap-6">

          {/* ITINERARY */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">📅 Your Itinerary</h3>
              <div className="flex items-center gap-2">
                {startDate && (
                  <span className="text-xs text-gray-400 font-medium">
                    {startDate.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                    {endDate && endDate.toDateString()!==startDate.toDateString() &&
                      ` → ${endDate.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}`}
                  </span>
                )}
                <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">{days} Days</span>
              </div>
            </div>

            {Array.from({length:days},(_,i)=>i+1).map(day=>(
              <div key={day} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Day {day}</p>
                  {startDate && (
                    <p className="text-xs text-gray-400">
                      ({new Date(startDate.getTime()+(day-1)*86400000)
                        .toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})})
                    </p>
                  )}
                </div>
                {itinerary.filter(a=>a.day===day).map(item=>{
                  const gi=itinerary.indexOf(item);
                  return (
                    <div key={gi} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${CAT_COLORS[item.category]}`}>
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">⏰ {item.time} · 💡 {item.tip}</p>
                        {item.cheaperAlt && (
                          <button onClick={()=>swapCheaper(gi)}
                            className="mt-1.5 text-xs bg-orange-50 border border-orange-200 text-orange-600 rounded-lg px-2.5 py-1 hover:bg-orange-100 transition-colors">
                            💡 Swap → {item.cheaperAlt.name} (₹{item.cheaperAlt.cost})
                          </button>
                        )}
                      </div>
                      <span className="text-amber-600 font-semibold text-sm whitespace-nowrap">
                        {item.cost===0?"Free":`₹${item.cost.toLocaleString()}`}
                      </span>
                      <button onClick={()=>remove(gi)}
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors flex-shrink-0">
                        <X className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* Budget */}
            <div className="bg-[#1a1d2e] rounded-3xl p-6 text-white">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3">💰 Live Budget</p>
              <p className="font-bold text-5xl" style={{fontFamily:"serif"}}>₹{totalCost.toLocaleString()}</p>
              <p className="text-white/40 text-sm mt-1">of ₹{budget.toLocaleString()} budget</p>
              <div className="mt-5 mb-1 flex justify-between text-xs text-white/40">
                <span>Spent</span><span>{Math.round(pct)}%</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${isOver?"bg-red-400":isNear?"bg-amber-400":"bg-teal-400"}`}
                  style={{width:`${pct}%`}}/>
              </div>
              <div className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2 ${
                isOver?"bg-red-500/15 text-red-400 border border-red-500/25"
                :isNear?"bg-amber-500/15 text-amber-400 border border-amber-500/25"
                :"bg-teal-500/15 text-teal-400 border border-teal-500/25"}`}>
                {isOver?`⚠️ Over by ₹${Math.abs(remaining).toLocaleString()}`
                  :isNear?`⚡ ₹${remaining.toLocaleString()} left (${Math.round(pct)}%)`
                  :`✅ ₹${remaining.toLocaleString()} remaining!`}
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Cost Breakdown</p>
              {(["food","travel","stay","activity"] as Category[]).map(cat=>{
                const amt=breakdown[cat];
                const bp=totalCost>0?(amt/totalCost)*100:0;
                const labels:Record<Category,string>={food:"🍽️ Food",travel:"✈️ Transport",stay:"🛏️ Stay",activity:"🎯 Activities"};
                return (
                  <div key={cat} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">{labels[cat]}</span>
                      <span className="text-sm font-semibold">₹{amt.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${CAT_BAR[cat]}`} style={{width:`${bp}%`}}/>
                    </div>
                  </div>
                );
              })}
              {(isOver||isNear) && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <p className="text-blue-700 font-bold text-xs mb-2">⚡ AI Suggestions</p>
                  {[...itinerary].sort((a,b)=>b.cost-a.cost).slice(0,3).map((item,i)=>{
                    const gi=itinerary.indexOf(item);
                    return (
                      <div key={i} onClick={()=>item.cheaperAlt&&swapCheaper(gi)}
                        className="text-xs text-blue-600 py-1.5 border-b border-blue-100 last:border-0 cursor-pointer hover:text-blue-800">
                        → Swap <strong>{item.name}</strong> (₹{item.cost.toLocaleString()})
                        {item.cheaperAlt&&` → ${item.cheaperAlt.name} (₹${item.cheaperAlt.cost})`}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Calendar in sidebar */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5"/> Trip Calendar
              </p>
              <MiniCalendar startDate={startDate} endDate={endDate} onRangeChange={handleRange}/>
            </div>
          </div>

        </section>
      )}
    </div>
  );
}