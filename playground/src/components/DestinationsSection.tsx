import { Star, MapPin } from "lucide-react";
import { destinations } from "@/data/mockData";

export default function DestinationsSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-display text-center mb-12">
          Popular <span className="text-primary">Destinations</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="group rounded-xl overflow-hidden bg-background shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                  {dest.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{dest.name}</h3>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {dest.country}
                  </span>

                  <span className="text-primary font-semibold text-sm">
                    {dest.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}