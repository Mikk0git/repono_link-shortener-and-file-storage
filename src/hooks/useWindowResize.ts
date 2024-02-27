import { useEffect, useState } from "react";

export default function useWindowResize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      // console.log("Window width " + windowSize.innerWidth);
      // console.log("Window height " + windowSize.innerHeight);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  return windowSize;
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
