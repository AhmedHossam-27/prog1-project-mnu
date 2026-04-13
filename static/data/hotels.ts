import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotel6 from "@/assets/hotel-6.jpg";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "The Grand Sunset Resort",
    location: "Palm Beach, Miami",
    city: "Miami",
    price: 320,
    rating: 4.8,
    image: hotel1,
    description: "Experience luxury at its finest with stunning ocean views, world-class dining, and an infinity pool overlooking the sunset. Perfect for couples and families seeking a memorable getaway.",
    amenities: ["Pool", "Spa", "Restaurant", "Beach Access", "WiFi", "Gym"],
  },
  {
    id: 2,
    name: "Charme Boutique Hotel",
    location: "Old Town, Prague",
    city: "Prague",
    price: 180,
    rating: 4.6,
    image: hotel2,
    description: "Nestled in the heart of Prague's historic Old Town, this charming boutique hotel offers an authentic European experience with modern comforts and personalized service.",
    amenities: ["WiFi", "Breakfast", "Bar", "Concierge", "Room Service"],
  },
  {
    id: 3,
    name: "Paradise Beach Villas",
    location: "Baa Atoll, Maldives",
    city: "Maldives",
    price: 550,
    rating: 4.9,
    image: hotel3,
    description: "Escape to paradise with overwater bungalows, pristine white sand beaches, and crystal-clear turquoise waters. An unforgettable tropical retreat.",
    amenities: ["Private Beach", "Snorkeling", "Spa", "Pool", "Restaurant", "WiFi"],
  },
  {
    id: 4,
    name: "Alpine Lodge & Spa",
    location: "Zermatt, Switzerland",
    city: "Zermatt",
    price: 420,
    rating: 4.7,
    image: hotel4,
    description: "A cozy mountain retreat with breathtaking views of the Matterhorn. Enjoy world-class skiing, a full-service spa, and traditional Swiss hospitality.",
    amenities: ["Ski Access", "Spa", "Fireplace", "Restaurant", "WiFi", "Sauna"],
  },
  {
    id: 5,
    name: "Skyline Metropolitan Hotel",
    location: "Downtown, Dubai",
    city: "Dubai",
    price: 280,
    rating: 4.5,
    image: hotel5,
    description: "A sleek, modern hotel in the heart of Dubai with panoramic city views, contemporary design, and easy access to world-famous attractions.",
    amenities: ["Pool", "Gym", "Restaurant", "Bar", "WiFi", "Business Center"],
  },
  {
    id: 6,
    name: "The Imperial Palace Hotel",
    location: "Ringstrasse, Vienna",
    city: "Vienna",
    price: 350,
    rating: 4.8,
    image: hotel6,
    description: "Step into timeless elegance at this grand historic hotel. Featuring ornate architecture, Michelin-starred dining, and impeccable service since 1892.",
    amenities: ["Restaurant", "Spa", "Concierge", "Bar", "WiFi", "Valet Parking"],
  },
];
