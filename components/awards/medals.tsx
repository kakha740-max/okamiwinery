import type { Medal } from "@/components/data/awards";

// Flat metal tones for the medal disc, shared by every awards listing.
const medalTone: Record<Medal, string> = {
  gold: "bg-medal-gold",
  silver: "bg-medal-silver",
  bronze: "bg-medal-bronze",
  rosso: "bg-medal-rosso",
};

export function medalLabels(t: {
  awards: { medalGold: string; medalSilver: string; medalBronze: string; medalRosso: string };
}): Record<Medal, string> {
  return {
    gold: t.awards.medalGold,
    silver: t.awards.medalSilver,
    bronze: t.awards.medalBronze,
    rosso: t.awards.medalRosso,
  };
}

type MedalBadgeProps = {
  medal: Medal;
  label: string;
  className?: string;
};

// A small metal disc followed by the medal name.
export function MedalBadge({ medal, label, className = "" }: MedalBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-current/15 ring-offset-2 ring-offset-transparent ${medalTone[medal]}`}
      />
      <span className="eyebrow">{label}</span>
    </span>
  );
}
