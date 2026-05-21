import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Landmark,
  TrendingUp,
  UserRoundPlus,
} from "lucide-react";

/** Sanity `whoClientTypes[].icon` values */
export const HOME_WHO_ICON_OPTIONS = [
  { title: "Briefcase (Established businesses)", value: "briefcase" },
  { title: "Building (Corporates & enterprises)", value: "building" },
  { title: "Graduation cap (Universities & institutions)", value: "graduation" },
  { title: "Family / stakeholders", value: "family" },
  { title: "Government / landmark", value: "government" },
  { title: "Growth / trending", value: "trending" },
] as const;

export type HomeWhoIconKey = (typeof HOME_WHO_ICON_OPTIONS)[number]["value"];

const ICON_MAP: Record<HomeWhoIconKey, LucideIcon> = {
  briefcase: Briefcase,
  building: Building2,
  graduation: GraduationCap,
  family: UserRoundPlus,
  government: Landmark,
  trending: TrendingUp,
};

export function getHomeWhoIcon(key: string | undefined): LucideIcon {
  if (key && key in ICON_MAP) {
    return ICON_MAP[key as HomeWhoIconKey];
  }
  return Briefcase;
}
