import type { MetadataRoute } from "next";
import { studio } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: studio.fullName,
    short_name: studio.name,
    description:
      "Cinematic wedding photography & films in Mumbai by Dream Box.",
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#171717",
  };
}
