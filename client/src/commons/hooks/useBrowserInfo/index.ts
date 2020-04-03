import { useState, useEffect } from "react";

const deviceOrientation = () =>
  Math.abs(Number(window.orientation)) === 90 ? "landscape" : "portrait";

const getOrientation = (window: any) => {
  try {
    return window.screen &&
      window.screen.orientation &&
      window.screen.orientation.type
      ? window.screen.orientation.type.replace("-primary", "")
      : Number.isInteger(window.orientation)
      ? deviceOrientation()
      : "";
  } catch (e) {
    return "";
  }
};

const Layouts = {
  MOBILE: "MOBILE",
  DESKTOP: "DESKTOP",
  TABLET: "TABLET",
};

const DEFAULT_BREAKPOINTS_SIZES = {
  lg: 1600,
  md: 1199,
  sm: 991,
  xs: 767,
};

type LayoutType = "MOBILE" | "DESKTOP" | "TABLET";

function calculateSizes(innerWidth: number): LayoutType {
  const { sm, md } = DEFAULT_BREAKPOINTS_SIZES;
  if (innerWidth <= sm) {
    return "MOBILE";
  } else if (innerWidth > sm && innerWidth <= md) {
    return "TABLET";
  } else {
    return "DESKTOP";
  }
}

const getBrowserInfo = (layout: LayoutType) => {
  return {
    isMobile: () => layout === Layouts.MOBILE,
    isTablet: () => layout === Layouts.TABLET,
    isDesktop: () => layout === Layouts.DESKTOP,
    isOrientationPortrait: () => getOrientation(window) === "portrait",
    isOrientationLandscape: () => getOrientation(window) === "landscape",
  };
};

/**
 * A custom Hook that provide a full-closure object to know about some Browser information,
 * like the current breackpoint, orientation, etc.
 */
export const useBrowserInfo: any = () => {
  const sizes = calculateSizes(window.innerWidth);
  const [currentSize, setSize] = useState(sizes);

  useEffect(() => {
    setSize(calculateSizes(window.innerWidth));
    const handleResize = () => setSize(calculateSizes(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSize]);

  return getBrowserInfo(currentSize);
};
