"use client";

import { MenuProvider } from "@/components/layout/MenuContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/animations/PageTransition";
import { ProgressIndicator } from "@/components/animations/ProgressIndicator";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <SmoothScroll>
        <ProgressIndicator />
        <PageTransition>{children}</PageTransition>
      </SmoothScroll>
    </MenuProvider>
  );
}
