import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Trash2, Hotel, User } from "lucide-react";
import { toast } from "sonner";
import { hotels } from "@/data/hotels";

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserBookings, cancelBooking } = useBookings();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const userBookings = getUserBookings(user.id);

  const handleCancel = (id: string) => {
    cancelBooking(id);
    toast.success("Booking cancelled");
  };

  return (
    <div className="pt-20 pb-16 container mx-auto px-4">
      {/* User info */}
      <div className="bg-card border rounded-xl p-6 mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <User className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" /> Your Bookings ({userBookings.length})
      </h2>

      {userBookings.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-card">
          <Hotel className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No bookings yet</p>
          <Button className="mt-4" onClick={() => navigate("/hotels")}>Browse Hotels</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {userBookings.map((b) => {
            const hotel = hotels.find((h) => h.id === b.hotelId);
            return (
              <Card key={b.id} className="overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  {hotel && (
                    <img src={hotel.image} alt={b.hotelName} className="w-full md:w-48 h-36 object-cover" loading="lazy" />
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-semibold">{b.hotelName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-primary">${b.totalPrice}</span>
                      <Button variant="destructive" size="sm" onClick={() => handleCancel(b.id)} className="gap-1.5">
                        <Trash2 className="h-4 w-4" /> Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
