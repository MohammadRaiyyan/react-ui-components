import { useCallback, useState, type RefObject } from "react";
import useCommand from "../../hooks/useCommand";
import { useDebounceSearch } from "../../hooks/useDebounceSearch";
import useOutsideClick from "../../hooks/useOutsideClick";
import useQuery from "../../hooks/useQuery";
import { fetchRecipies } from "../AutoCompleteI/api";
import styles from "./CommandBox.module.css";

export default function CommandBox() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  useCommand({ onCommand: handleOpen, keys: ["meta", "shift", "u"] });
  const ref = useOutsideClick<HTMLDivElement>(handleOpen);
  if (!isOpen) return null;
  return <CommandBoxInnner ref={ref} />;
}

function CommandBoxInnner({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isError, isLoading } = useQuery({
    queryFn: (signal) => fetchRecipies(signal, searchTerm),
    queryKey: [searchTerm],
    enabled: !!searchTerm,
    staleTime: 60_000,
  });

  const handleSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className={styles["container"]}>
      <div ref={ref} className={styles["content"]}>
        <SearchBox cb={handleSearchTerm} />
        <ul className={styles["result-list"]}>
          {isLoading ? (
            <div>
              <h3>Loading...</h3>
            </div>
          ) : isError || data?.recipes.length === 0 ? (
            <div>
              <h3>Not found</h3>
            </div>
          ) : (
            <>
              {data?.recipes.map((recipe) => (
                <li key={recipe.id} className={styles["result-list__item"]}>
                  {recipe.name}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function SearchBox({ cb }: { cb: (debouncedValue: string) => void }) {
  const { state, setState } = useDebounceSearch(cb);

  return (
    <div className={styles["input-container"]}>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type="search"
        placeholder="Type to Search..."
        autoFocus
      />
    </div>
  );
}
