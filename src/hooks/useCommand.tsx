import { useEffect } from "react";

interface UseCommandProps {
  onCommand: (e: KeyboardEvent) => void;
  keys: string | string[];
  preventDefault?: boolean;
  enabled?: boolean;
}

export default function useCommand({
  onCommand,
  keys,
  preventDefault = false,
  enabled = true,
}: UseCommandProps) {
  useEffect(() => {
    if (!enabled) return;
    const keyList = Array.isArray(keys) ? keys : [keys.toLocaleLowerCase()];
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressed: string[] = [];
      //Normalize Modifires
      if (e.ctrlKey) pressed.push("control");
      if (e.shiftKey) pressed.push("shift");
      if (e.altKey) pressed.push("alt");
      if (e.metaKey) pressed.push("meta");

      // Keys
      const key = e.key.toLocaleLowerCase();
      if (!["control", "shift", "alt", "meta"].includes(key)) {
        pressed.push(key);
      }
      const match =
        keyList.length === pressed.length &&
        keyList.every((key) => pressed.includes(key));
      if (match) {
        if (preventDefault) e.preventDefault();
        onCommand(e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, onCommand, preventDefault, enabled]);
}
