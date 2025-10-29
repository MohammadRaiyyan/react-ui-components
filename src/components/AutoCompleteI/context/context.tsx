import { createContext } from "react";

interface AutoCompleteContextType {
  searchTerm: string;
  setSearchTerm: (newTerm: string) => void;
  isShowSuggestionMenu: boolean;
  setShowSuggestionMenu: (state: boolean) => void;
}
const AutoCompleteContext = createContext<AutoCompleteContextType>({
  searchTerm: "",
  isShowSuggestionMenu: false,
  setSearchTerm: () => {
    throw new Error("setSearchterm can not be used outside the Context");
  },
  setShowSuggestionMenu: () => {
    throw new Error(
      "setShowSuggestionMenu can not be used outside the Context",
    );
  },
});

export default AutoCompleteContext;
