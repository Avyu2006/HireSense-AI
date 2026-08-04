import { useEffect, useState } from "react";

function AnimatedCounter({ value, duration = 1000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const end = Number(value);

    if (isNaN(end)) return;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;