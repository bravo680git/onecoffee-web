import { useState, useLayoutEffect } from "react";
import { breakpoints } from "@/theme/breakpoints";

export const useDisplay = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const getBreakpoints = () => {
    const result = {} as Record<keyof typeof breakpoints, boolean>;
    for (const size in breakpoints) {
      const w = Number(breakpoints[size as keyof typeof breakpoints]);
      result[size as keyof typeof breakpoints] = w > width;
    }
    return result;
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    height,
    ...getBreakpoints(),
  };
};
