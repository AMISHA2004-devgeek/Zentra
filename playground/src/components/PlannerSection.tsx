import React, { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Plane,
  Utensils,
  Bed,
  Ticket,
  X,
  TrendingDown,
  RefreshCw,
  Zap,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Gem,
  Users,
  Heart,
  Camera,
  Leaf,
  Wifi,
  Crown,
  Dog,
  Accessibility,
  MapPin,
  Clock,
  Star,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Activity,
  VibeType,
  TravelStyle,
  SpecialPref,
  HiddenGem,
  generateItinerary,
  getCheaperAlternative,
  hiddenGems,
} from "@/data/mockData";

const categoryIcons: Record<Activity["category"], React.ElementType> = {
  travel: Plane,
  stay: Bed,
  food: Utensils,
  activity: Ticket,
};

const categoryTokens: Record<Activity["category"], string> = {
  travel: "bg-secondary/10 text-secondary",
  stay: "bg-accent/10 text-accent",
  food: "bg-primary/10 text-primary",
  activity: "bg-mint/10 text-mint",
};

export default function PlannerSection() {
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [itinerary, setItinerary] = useState<Activity[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const totalCost = useMemo(
    () => itinerary.reduce((s, a) => s + a.cost, 0),
    [itinerary]
  );

  const budgetPct =
    budget > 0 ? Math.min((totalCost / budget) * 100, 100) : 0;

  const isOverBudget = totalCost > budget;

  const generateTrip = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateItinerary(
        budget,
        days,
        ["adventure"],
        "balanced",
        true,
        "couple",
        travelers
      );
      setItinerary(result);
      setExpandedDay(1);
      setIsGenerating(false);
    }, 800);
  };

  const removeActivity = (idx: number) => {
    setItinerary((prev) => prev.filter((_, i) => i !== idx));
  };

  const makeCheaper = (idx: number) => {
    setItinerary((prev) =>
      prev.map((a, i) => (i === idx ? getCheaperAlternative(a) : a))
    );
  };

  const dayNumbers = Array.from(new Set(itinerary.map((a) => a.day))).sort(
    (a, b) => a - b
  );

  // AUTO LOAD (for testing UI)
  useEffect(() => {
    generateTrip();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Trip <span className="text-primary">Generator</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            AI itinerary with budget tracking
          </p>
        </div>

        {/* INPUT */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="p-3 border rounded"
            placeholder="Budget"
          />
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="p-3 border rounded"
            placeholder="Days"
          />
          <input
            type="number"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="p-3 border rounded"
            placeholder="Travelers"
          />
        </div>

        <Button onClick={generateTrip} className="w-full mb-8">
          {isGenerating ? "Generating..." : "Generate Trip"}
        </Button>

        {/* RESULTS */}
        {itinerary.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* ITINERARY */}
            <div className="p-6 border rounded-xl">
              <h3 className="font-bold mb-4">Itinerary</h3>

              {dayNumbers.map((day) => {
                const items = itinerary
                  .map((a, i) => ({ ...a, index: i }))
                  .filter((a) => a.day === day);

                return (
                  <div key={day} className="mb-4">
                    <button
                      onClick={() =>
                        setExpandedDay(expandedDay === day ? null : day)
                      }
                      className="flex justify-between w-full font-semibold"
                    >
                      Day {day}
                      {expandedDay === day ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>

                    {expandedDay === day && (
                      <div className="mt-2 space-y-2">
                        {items.map((item) => {
                          const Icon = categoryIcons[item.category];
                          return (
                            <div
                              key={item.index}
                              className="flex items-center gap-3 p-2 bg-muted rounded"
                            >
                              <Icon className="w-4 h-4" />
                              <div className="flex-1">
                                <p>{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.time}
                                </p>
                              </div>
                              <span>₹{item.cost}</span>
                              <button
                                onClick={() => makeCheaper(item.index)}
                              >
                                <TrendingDown className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeActivity(item.index)}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* BUDGET */}
            <div className="p-6 border rounded-xl">
              <h3 className="font-bold mb-4">Budget</h3>

              <div className="text-3xl font-bold">₹{totalCost}</div>
              <p className="text-sm text-muted-foreground">
                of ₹{budget}
              </p>

              <div className="h-2 bg-muted mt-4 rounded">
                <div
                  className={`h-full rounded ${
                    isOverBudget ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${budgetPct}%` }}
                />
              </div>

              {isOverBudget ? (
                <p className="text-red-500 mt-2">
                  Over budget by ₹{totalCost - budget}
                </p>
              ) : (
                <p className="text-green-500 mt-2">
                  ₹{budget - totalCost} remaining
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}