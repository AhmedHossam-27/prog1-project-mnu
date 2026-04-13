import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Booking {
  id: string;
  userId: string;
  hotelId: number;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void;
  cancelBooking: (id: string) => void;
  getUserBookings: (userId: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | null>(null);
const BOOKINGS_KEY = "hotel_bookings";

export const useBookings = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be inside BookingProvider");
  return ctx;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]"); }
    catch { return []; }
  });

  const persist = (b: Booking[]) => {
    setBookings(b);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(b));
  };

  const addBooking = useCallback((data: Omit<Booking, "id" | "createdAt">) => {
    const booking: Booking = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    persist([...bookings, booking]);
  }, [bookings]);

  const cancelBooking = useCallback((id: string) => {
    persist(bookings.filter((b) => b.id !== id));
  }, [bookings]);

  const getUserBookings = useCallback((userId: string) => {
    return bookings.filter((b) => b.userId === userId);
  }, [bookings]);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getUserBookings }}>
      {children}
    </BookingContext.Provider>
  );
};
