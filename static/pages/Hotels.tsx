import { useState, useMemo } from "react";
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";

const allCities = Array.from(new Set(hotels.map((h) => h.city)));

const Hotels = () => {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(600);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(
    () =>
      hotels.filter(
        (h) =>
          h.city.toLowerCase().includes(search.toLowerCase()) &&
          h.price <= maxPrice &&
          h.rating >= minRating
      ),
    [search, maxPrice, minRating]
  );

  return (
    <div className="pt-20 pb-16 container mx-auto px-4">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Explore Hotels</h1>
      <p className="text-muted-foreground mb-8">Search and filter to find your ideal stay</p>

      {/* Filters */}
      <div className="bg-card border rounded-xl p-6 mb-10">
        <div className="flex items-center gap-2 mb-4 text-foreground">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <span className="font-semibold">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="mb-2 block text-sm">Search by City</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="e.g. Miami, Dubai..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {allCities.map((c) => (
                <button
                  key={c}
                  onClick={() => setSearch(search === c ? "" : c)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    search === c ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="mb-2 block text-sm">Max Price: ${maxPrice}/night</Label>
            <Slider value={[maxPrice]} onValueChange={([v]) => setMaxPrice(v)} min={50} max={600} step={10} />
          </div>
          <div>
            <Label className="mb-2 block text-sm">Min Rating: {minRating}★</Label>
            <Slider value={[minRating]} onValueChange={([v]) => setMinRating(v)} min={0} max={5} step={0.1} />
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No hotels match your filters.</p>
          <p className="text-sm mt-1">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Hotels;
