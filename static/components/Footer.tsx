import { Hotel } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-10 mt-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-heading text-lg font-bold">
          <Hotel className="h-5 w-5" /> StayBnB
        </div>
        <p className="text-sm opacity-70">© 2026 StayBnB. All rights reserved. A university project demo.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
