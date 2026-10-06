// Local stub. The coss registry did not include @coss/scroll-area at the
// version this skill points to, but Sheet/Dialog import it as a wrapper.
// For the Gevelhelden nav the wrapper is unnecessary — a plain div suffices.
import type * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  overscrollContain?: boolean;
  scrollFade?: boolean;
};

export function ScrollArea({ children, className }: Props) {
  return (
    <div className={className} style={{ overflow: "auto" }}>
      {children}
    </div>
  );
}
