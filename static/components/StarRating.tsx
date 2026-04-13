import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`h-4 w-4 ${s <= Math.round(rating) ? "fill-star text-star" : "text-muted-foreground/30"}`}
      />
    ))}
    <span className="ml-1.5 text-sm font-medium">{rating}</span>
  </div>
);

export default StarRating;
