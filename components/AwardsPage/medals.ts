import type { Medal } from "@/components/data/awards";

// Metallic gradients for the medal badges, shared by the home section and /awards.
export const medalStyles: Record<Medal, string> = {
  gold: "bg-gradient-to-r from-[#F6E3A8] via-[#C8A15A] to-[#E9CC85] text-[#2A1E0C]",
  silver: "bg-gradient-to-r from-[#F4F4F4] via-[#B9B9B9] to-[#E6E6E6] text-[#111]",
  bronze: "bg-gradient-to-r from-[#E8AE7E] via-[#A9612F] to-[#D8935D] text-white",
  rosso: "bg-gradient-to-r from-[#A3233A] via-[#6D0F22] to-[#9B1B30] text-white",
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
