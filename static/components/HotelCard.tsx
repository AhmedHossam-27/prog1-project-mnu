import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Hotel } from "@/data/hotels";

const HotelCard = ({ hotel }: { hotel: Hotel }) => (
  <Card className="overflow-hidden card-hover">
    <div className="relative h-48 overflow-hidden">
      <img
        src={hotel.image}
        alt={hotel.name}
        loading="lazy"
        width={800}
        height={600}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-star text-star" />
        <span className="text-sm font-semibold">{hotel.rating}</span>
      </div>
    </div>
    <CardContent className="p-5">
      <h3 className="font-heading text-lg font-semibold mb-1">{hotel.name}</h3>
      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
        <MapPin className="h-3.5 w-3.5" /> {hotel.location}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary">${hotel.price}</span>
          <span className="text-muted-foreground text-sm"> / night</span>
        </div>
        <Link to={`/hotels/${hotel.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default HotelCard;
