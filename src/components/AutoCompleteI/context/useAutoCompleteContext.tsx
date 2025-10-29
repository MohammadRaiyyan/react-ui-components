import { useContext } from "react";
import AutoCompleteContext from "./context";

export default function useAutoCmpleteContext() {
  const context = useContext(AutoCompleteContext);

  if (!context) {
    throw new Error(
      "useAutoCompleteContext can not be used outside of the provider",
    );
  }
  return context;
}
