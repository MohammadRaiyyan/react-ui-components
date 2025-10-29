import { useLayoutEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  cb: VoidFunction,
) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const handleKeyDown = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        cb();
        console.log("Running outside click");
      }
    };

    document.addEventListener("mousedown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleKeyDown);
    };
  }, [cb]);

  return ref;
}
