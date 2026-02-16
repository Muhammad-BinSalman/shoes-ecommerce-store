"use client";

import { useEffect } from "react";
import { utmFromQuery, saveUtmToStorage } from "@/lib/utm";

export default function UtmCollector() {
  useEffect(() => {
    try {
      const search =
        typeof window !== "undefined" ? window.location.search : "";
      if (search) {
        const utm = utmFromQuery(search);
        if (Object.keys(utm).length > 0) {
          saveUtmToStorage(utm);
        }
      }
    } catch (_) {
      // ignore
    }
  }, []);

  return null;
}
