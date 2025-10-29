import { useCallback, useMemo, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import styles from "./AutoComplete.module.css";
import SearchBox from "./SearchBox";
import SuggestionMenu from "./SuggestionMenu";
import AutoCompleteContext from "./context/context";

export default function AutoCompleteI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowSuggestionMenu, setShowSuggestionMenu] = useState(false);
  const handleSetSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  const handleShowSuggestionMenu = useCallback(
    (value: boolean) => {
      if (value && isShowSuggestionMenu) return;
      setShowSuggestionMenu(value);
    },
    [isShowSuggestionMenu],
  );

  const closeMenu = useCallback(() => {
    setShowSuggestionMenu(false);
  }, [setShowSuggestionMenu]);

  const ref = useOutsideClick<HTMLDivElement>(closeMenu);

  const value = useMemo(() => {
    return {
      searchTerm,
      isShowSuggestionMenu,
      setSearchTerm: handleSetSearchTerm,
      setShowSuggestionMenu: handleShowSuggestionMenu,
    };
  }, [
    searchTerm,
    isShowSuggestionMenu,
    handleSetSearchTerm,
    handleShowSuggestionMenu,
  ]);

  return (
    <AutoCompleteContext.Provider value={value}>
      <div ref={ref} className={styles["autocomplete-container"]}>
        <SearchBox />
        <SuggestionMenu />
      </div>
    </AutoCompleteContext.Provider>
  );
}
