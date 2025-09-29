import { useEffect, useState } from "react";

export const useViewportHeight = () => {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      setVh(vh);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set initial value
    setVhProperty();

    // Add event listener for resize
    window.addEventListener("resize", setVhProperty);
    window.addEventListener("orientationchange", setVhProperty);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setVhProperty);
      window.removeEventListener("orientationchange", setVhProperty);
    };
  }, []);

  return vh;
};
