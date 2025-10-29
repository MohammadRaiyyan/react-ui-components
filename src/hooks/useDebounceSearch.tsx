import { useEffect, useRef, useState } from "react";

export function useDebounceSearch(
  cb: (debouncedValue: string) => void,
  delay = 500,
) {
  const [state, setState] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      cb(state);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delay, state, cb]);

  return { state, setState };
}
