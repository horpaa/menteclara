import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  featured?: boolean;
}

export default function PricingCard({ title, price, duration, features, featured }: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl border p-8 flex flex-col ${
        featured
          ? "border-brand-blue bg-brand-blue text-white shadow-lg scale-105"
          : "border-brand-lavender bg-white"
      }`}
    >
      <h3 className={`font-bold text-lg mb-1 ${featured ? "text-white" : "text-brand-dark"}`}>{title}</h3>
      <p className={`text-sm mb-4 ${featured ? "text-white/70" : "text-brand-dark/60"}`}>{duration}</p>
      <p className={`text-4xl font-bold mb-6 ${featured ? "text-white" : "text-brand-dark"}`}>
        <span className="text-lg font-normal">$</span>{price}
      </p>
      <ul className="space-y-2 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={16} className={`mt-0.5 shrink-0 ${featured ? "text-white" : "text-brand-blue"}`} />
            <span className={featured ? "text-white/90" : "text-brand-dark/70"}>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        className={featured ? "bg-white text-brand-blue hover:bg-white/90" : "bg-brand-blue hover:bg-brand-accent text-white"}
      >
        <Link href="/reservar">Reservar ahora</Link>
      </Button>
    </div>
  );
}
