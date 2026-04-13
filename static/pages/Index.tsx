import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, Shield, CreditCard } from "lucide-react";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/data/hotels";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Search, title: "Easy Search", desc: "Find the perfect hotel by city, price, or rating" },
  { icon: Star, title: "Top Rated", desc: "Curated selection of highly-rated hotels worldwide" },
  { icon: Shield, title: "Secure Booking", desc: "Your reservations are safe and easy to manage" },
  { icon: CreditCard, title: "Best Prices", desc: "Competitive rates with no hidden fees" },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Luxury resort" className="absolute inset-0 w-full h-full object-cover" width={1920} height={900} />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 font-body">
          Discover handpicked hotels around the world. Book your dream getaway in seconds.
        </p>
        <Link to="/hotels">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg">
            Browse Hotels
          </Button>
        </Link>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-heading text-3xl font-bold text-center mb-12">Why Book With Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center p-6 rounded-xl bg-card border card-hover">
            <div className="mx-auto w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
              <f.icon className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Hotels */}
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl font-bold text-center mb-4">Featured Hotels</h2>
        <p className="text-muted-foreground text-center mb-10">Handpicked destinations for your next adventure</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.slice(0, 3).map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/hotels">
            <Button variant="outline" size="lg">View All Hotels</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
