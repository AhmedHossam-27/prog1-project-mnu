import { useParams, useNavigate } from "react-router-dom";
import { hotels } from "@/data/hotels";
import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "@/components/StarRating";
import { MapPin, CalendarDays, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const hotel = hotels.find((h) => h.id === Number(id));

  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [booked, setBooked] = useState(false);

  if (!hotel) {
    return (
      <div className="pt-24 text-center">
        <h1 className="font-heading text-2xl">Hotel not found</h1>
      </div>
    );
  }

  const nights = checkIn && checkOut ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 0;
  const total = nights * hotel.price;

  const handleBook = () => {
    if (!user) {
      toast.error("Please login to book a hotel");
      navigate("/login");
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (checkIn < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }
    if (checkOut <= checkIn) {
      toast.error("Check-out must be after check-in");
      return;
    }
    addBooking({
      userId: user.id,
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn,
      checkOut,
      totalPrice: total,
    });
    setBooked(true);
    toast.success("Booking confirmed! 🎉");
  };

  return (
    <div className="pt-20 pb-16 container mx-auto px-4">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" width={800} height={600} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">{hotel.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-primary-foreground/80">
            <MapPin className="h-4 w-4" /> {hotel.location}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <StarRating rating={hotel.rating} />
            <span className="text-2xl font-bold text-primary">${hotel.price}</span>
            <span className="text-muted-foreground">/ night</span>
          </div>

          <p className="text-foreground/80 leading-relaxed">{hotel.description}</p>

          <div>
            <h3 className="font-heading text-xl font-semibold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((a) => (
                <span key={a} className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" /> Book This Hotel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {booked ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <h3 className="font-heading text-lg font-semibold">Booking Confirmed!</h3>
                <p className="text-sm text-muted-foreground">Check your dashboard for details.</p>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
              </div>
            ) : (
              <>
                <div>
                  <Label>Check-in Date</Label>
                  <Input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div>
                  <Label>Check-out Date</Label>
                  <Input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
                {nights > 0 && (
                  <div className="border-t pt-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{nights} night{nights > 1 ? "s" : ""} × ${hotel.price}</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${total}</span>
                    </div>
                  </div>
                )}
                <Button className="w-full" size="lg" onClick={handleBook}>
                  {user ? "Confirm Booking" : "Login to Book"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelDetail;
