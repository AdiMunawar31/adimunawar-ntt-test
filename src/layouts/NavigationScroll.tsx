import { useEffect, type ReactNode } from "react";

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

interface NavigationScrollProps {
  children: ReactNode;
}

export default function NavigationScroll({ children }: NavigationScrollProps) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return children || null;
}
