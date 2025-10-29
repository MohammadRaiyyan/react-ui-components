import { useDebounceSearch } from "../../hooks/useDebounceSearch";
import useAutoCmpleteContext from "./context/useAutoCompleteContext";
import styles from "./AutoComplete.module.css";

export default function SearchBox() {
  const { setSearchTerm, setShowSuggestionMenu } = useAutoCmpleteContext();
  const { state, setState } = useDebounceSearch(setSearchTerm);

  return (
    <input
      type="search"
      value={state}
      onChange={(e) => setState(e.target.value)}
      onClick={() => setShowSuggestionMenu(true)}
      placeholder="Type to search.."
      className={styles["search-box"]}
    />
  );
}
