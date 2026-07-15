"use client";

import { MenuProvider } from "@/components/layout/MenuContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/animations/PageTransition";
import { ProgressIndicator } from "@/components/animations/ProgressIndicator";
import { PageAtmosphere } from "@/components/ui/AmbientLights";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <SmoothScroll>
        <ProgressIndicator />
        <PageAtmosphere />
        <div className="relative z-[1]">
          <PageTransition>{children}</PageTransition>
        </div>
      </SmoothScroll>
    </MenuProvider>
  );
}
