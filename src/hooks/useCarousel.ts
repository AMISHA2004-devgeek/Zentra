import { useState } from "react";

export function useCarousel<T>(data: T[]) {
  const [idx, setIdx] = useState(0);
  return {
    idx,
    next: () => setIdx((i) => (i + 1) % data.length),
    prev: () => setIdx((i) => (i - 1 + data.length) % data.length),
    goTo: (n: number) => setIdx(n),
    current: data[idx],
  };
}
