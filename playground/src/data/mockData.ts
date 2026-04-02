import destSantorini from "@/assets/dest-santorini.jpg";
import destBali from "@/assets/dest-bali.jpg";
import destTokyo from "@/assets/dest-tokyo.jpg";
import destSwiss from "@/assets/dest-swiss.jpg";
import destMarrakech from "@/assets/dest-marrakech.jpg";
import destPatagonia from "@/assets/dest-patagonia.jpg";

export const destinations = [
  { name: "Santorini", country: "Greece", image: destSantorini, rating: 4.9, price: "₹45,000" },
  { name: "Bali", country: "Indonesia", image: destBali, rating: 4.8, price: "₹35,000" },
  { name: "Tokyo", country: "Japan", image: destTokyo, rating: 4.7, price: "₹60,000" },
  { name: "Swiss Alps", country: "Switzerland", image: destSwiss, rating: 4.9, price: "₹80,000" },
  { name: "Marrakech", country: "Morocco", image: destMarrakech, rating: 4.6, price: "₹30,000" },
  { name: "Patagonia", country: "Argentina", image: destPatagonia, rating: 4.8, price: "₹70,000" },
];

export type Activity = {
  name: string;
  time: string;
  cost: number;
  category: "food" | "travel" | "stay" | "activity";
  day: number;
  isHiddenGem?: boolean;
  gemDescription?: string;
};

export type VibeType = "adventure" | "chill" | "foodie" | "nightlife" | "culture";
export type TravelStyle = "solo" | "couple" | "family" | "friends";
export type SpecialPref = "pet-friendly" | "wheelchair" | "photography" | "eco-friendly" | "off-grid" | "luxury-stays";

export type HiddenGem = {
  name: string;
  description: string;
  category: Activity["category"];
  cost: number;
  time: string;
  rating: number;
  tip: string;
};

export const hiddenGems: HiddenGem[] = [
  { name: "Secret Waterfall Hike", description: "A locals-only trail leading to a hidden waterfall", category: "activity", cost: 200, time: "7:00 AM", rating: 4.9, tip: "Go early morning to avoid crowds" },
  { name: "Underground Jazz Bar", description: "Speakeasy-style bar with live jazz every night", category: "food", cost: 800, time: "9:00 PM", rating: 4.7, tip: "Ask for the secret menu cocktail" },
  { name: "Rooftop Sunrise Yoga", description: "Free community yoga on a rooftop with ocean views", category: "activity", cost: 0, time: "5:30 AM", rating: 4.8, tip: "Bring your own mat" },
  { name: "Grandma's Kitchen", description: "Home-cooked meals by a local grandmother — only 10 seats", category: "food", cost: 350, time: "12:30 PM", rating: 5.0, tip: "Book 2 days ahead, cash only" },
  { name: "Abandoned Lighthouse Trail", description: "Scenic coastal walk to a photogenic abandoned lighthouse", category: "activity", cost: 0, time: "4:00 PM", rating: 4.6, tip: "Best at golden hour for photos" },
  { name: "Night Market Alley", description: "Hidden alley market with rare street food not on tourist maps", category: "food", cost: 400, time: "8:00 PM", rating: 4.8, tip: "Try the smoked fish tacos" },
  { name: "Cave Pool", description: "Natural cave with a swimmable turquoise pool inside", category: "activity", cost: 150, time: "11:00 AM", rating: 4.9, tip: "Bring waterproof phone case" },
  { name: "Fisherman's Homestay", description: "Stay with a local fishing family — authentic experience", category: "stay", cost: 600, time: "7:00 PM", rating: 4.7, tip: "They cook the catch of the day for dinner" },
  { name: "Stargazing Hill", description: "Zero light pollution spot perfect for stargazing", category: "activity", cost: 100, time: "10:00 PM", rating: 4.9, tip: "New moon nights are the best" },
  { name: "Artisan Coffee Farm", description: "Visit a small coffee farm and roast your own beans", category: "food", cost: 500, time: "9:00 AM", rating: 4.6, tip: "Buy their single-origin beans as souvenir" },
  { name: "Floating Market", description: "Traditional floating market accessible only by boat", category: "activity", cost: 300, time: "6:00 AM", rating: 4.8, tip: "Haggle politely — vendors love it" },
  { name: "Treehouse Stay", description: "Sleep in a treehouse in the jungle canopy", category: "stay", cost: 1200, time: "6:00 PM", rating: 4.9, tip: "Listen for howler monkeys at dawn" },
];

const vibeActivities: Record<VibeType, Activity[]> = {
  adventure: [
    { name: "Mountain Trekking", time: "6:00 AM", cost: 800, category: "activity", day: 1 },
    { name: "Zip-lining", time: "10:00 AM", cost: 1500, category: "activity", day: 1 },
    { name: "Trail Lunch", time: "1:00 PM", cost: 400, category: "food", day: 1 },
    { name: "River Rafting", time: "3:00 PM", cost: 1200, category: "activity", day: 1 },
    { name: "Camp Stay", time: "7:00 PM", cost: 900, category: "stay", day: 1 },
    { name: "Sunrise Hike", time: "5:30 AM", cost: 300, category: "activity", day: 2 },
    { name: "Paragliding", time: "10:00 AM", cost: 2500, category: "activity", day: 2 },
    { name: "Local Dhaba", time: "1:00 PM", cost: 350, category: "food", day: 2 },
    { name: "Kayaking", time: "3:30 PM", cost: 800, category: "activity", day: 2 },
    { name: "Mountain Lodge", time: "7:00 PM", cost: 1500, category: "stay", day: 2 },
  ],
  chill: [
    { name: "Spa & Massage", time: "10:00 AM", cost: 2000, category: "activity", day: 1 },
    { name: "Beachside Brunch", time: "12:00 PM", cost: 800, category: "food", day: 1 },
    { name: "Sunset Cruise", time: "4:00 PM", cost: 1800, category: "activity", day: 1 },
    { name: "Fine Dining", time: "8:00 PM", cost: 1500, category: "food", day: 1 },
    { name: "Resort Stay", time: "10:00 PM", cost: 3000, category: "stay", day: 1 },
    { name: "Yoga Session", time: "7:00 AM", cost: 500, category: "activity", day: 2 },
    { name: "Pool Day", time: "11:00 AM", cost: 0, category: "activity", day: 2 },
    { name: "Café Lunch", time: "1:00 PM", cost: 600, category: "food", day: 2 },
    { name: "Book & Beach", time: "3:00 PM", cost: 0, category: "activity", day: 2 },
    { name: "Resort Stay", time: "9:00 PM", cost: 3000, category: "stay", day: 2 },
  ],
  foodie: [
    { name: "Street Food Tour", time: "9:00 AM", cost: 500, category: "food", day: 1 },
    { name: "Cooking Class", time: "11:00 AM", cost: 1200, category: "activity", day: 1 },
    { name: "Market Walk", time: "2:00 PM", cost: 300, category: "activity", day: 1 },
    { name: "Michelin Dinner", time: "7:00 PM", cost: 3000, category: "food", day: 1 },
    { name: "Boutique Hotel", time: "10:00 PM", cost: 2000, category: "stay", day: 1 },
    { name: "Bakery Hopping", time: "8:00 AM", cost: 400, category: "food", day: 2 },
    { name: "Wine Tasting", time: "11:00 AM", cost: 1500, category: "activity", day: 2 },
    { name: "Farm-to-Table Lunch", time: "1:00 PM", cost: 1000, category: "food", day: 2 },
    { name: "Food Festival", time: "4:00 PM", cost: 800, category: "activity", day: 2 },
    { name: "Boutique Hotel", time: "10:00 PM", cost: 2000, category: "stay", day: 2 },
  ],
  nightlife: [
    { name: "Beach Club", time: "2:00 PM", cost: 1500, category: "activity", day: 1 },
    { name: "Sunset Bar", time: "5:00 PM", cost: 800, category: "food", day: 1 },
    { name: "Rooftop Dinner", time: "8:00 PM", cost: 2000, category: "food", day: 1 },
    { name: "Club Entry", time: "11:00 PM", cost: 2500, category: "activity", day: 1 },
    { name: "City Hotel", time: "3:00 AM", cost: 1800, category: "stay", day: 1 },
    { name: "Brunch Recovery", time: "12:00 PM", cost: 700, category: "food", day: 2 },
    { name: "Pub Crawl", time: "6:00 PM", cost: 1200, category: "activity", day: 2 },
    { name: "Live Music Venue", time: "9:00 PM", cost: 1000, category: "activity", day: 2 },
    { name: "Late Night Eats", time: "12:00 AM", cost: 500, category: "food", day: 2 },
    { name: "City Hotel", time: "2:00 AM", cost: 1800, category: "stay", day: 2 },
  ],
  culture: [
    { name: "Museum Visit", time: "9:00 AM", cost: 600, category: "activity", day: 1 },
    { name: "Historic Walk", time: "11:00 AM", cost: 300, category: "activity", day: 1 },
    { name: "Traditional Lunch", time: "1:00 PM", cost: 700, category: "food", day: 1 },
    { name: "Art Gallery", time: "3:00 PM", cost: 500, category: "activity", day: 1 },
    { name: "Heritage Hotel", time: "9:00 PM", cost: 2500, category: "stay", day: 1 },
    { name: "Temple Visit", time: "7:00 AM", cost: 200, category: "activity", day: 2 },
    { name: "Local Market", time: "10:00 AM", cost: 400, category: "activity", day: 2 },
    { name: "Craft Workshop", time: "1:00 PM", cost: 900, category: "activity", day: 2 },
    { name: "Cultural Show", time: "7:00 PM", cost: 1200, category: "activity", day: 2 },
    { name: "Heritage Hotel", time: "10:00 PM", cost: 2500, category: "stay", day: 2 },
  ],
};

export function generateItinerary(
  budget: number,
  days: number,
  vibes: VibeType[],
  mode: "budget" | "balanced" | "luxury",
  includeHiddenGems: boolean,
  _travelStyle: TravelStyle,
  travelers: number
): Activity[] {
  const selectedVibe = vibes[0] || "adventure";
  const baseActivities = vibeActivities[selectedVibe] || vibeActivities.adventure;

  const costMultiplier = mode === "budget" ? 0.6 : mode === "luxury" ? 1.5 : 1;
  const travelerMultiplier = travelers > 1 ? 1 + (travelers - 1) * 0.7 : 1;

  const result: Activity[] = [];
  for (let d = 1; d <= days; d++) {
    const dayBase = d % 2 === 1 ? 1 : 2;
    const dayActivities = baseActivities
      .filter((a) => a.day === dayBase)
      .map((a) => ({
        ...a,
        day: d,
        cost: Math.round(a.cost * costMultiplier * travelerMultiplier),
      }));

    result.push(...dayActivities);

    // Insert a hidden gem per day
    if (includeHiddenGems) {
      const gemIndex = (d - 1) % hiddenGems.length;
      const gem = hiddenGems[gemIndex];
      result.push({
        name: `💎 ${gem.name}`,
        time: gem.time,
        cost: Math.round(gem.cost * costMultiplier * travelerMultiplier),
        category: gem.category,
        day: d,
        isHiddenGem: true,
        gemDescription: gem.tip,
      });
    }
  }

  return result;
}

export function getCheaperAlternative(activity: Activity): Activity {
  const cheaperNames: Record<string, string> = {
    "Michelin Dinner": "Local Restaurant",
    "Resort Stay": "Hostel Stay",
    "Boutique Hotel": "Budget Inn",
    "Fine Dining": "Street Food",
    "Spa & Massage": "Self-care Walk",
    "Paragliding": "Nature Walk",
    "Club Entry": "Beach Bonfire",
    "Heritage Hotel": "Guesthouse",
    "City Hotel": "Backpacker Hostel",
    "Sunset Cruise": "Sunset Walk",
    "Mountain Lodge": "Camping Tent",
  };

  const newName = cheaperNames[activity.name];
  if (newName) {
    return { ...activity, name: newName, cost: Math.round(activity.cost * 0.3) };
  }
  return { ...activity, cost: Math.round(activity.cost * 0.5) };
}
