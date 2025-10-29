import useQuery from "../../hooks/useQuery";
import { fetchRecipies } from "./api";
import useAutoCmpleteContext from "./context/useAutoCompleteContext";
import type { RecipeResponse } from "./types";
import styles from "./AutoComplete.module.css";
import RecipeList from "./RecipeList";

export default function SuggestionMenu() {
  const { isShowSuggestionMenu } = useAutoCmpleteContext();

  if (!isShowSuggestionMenu) return null;

  return <SuggestionMenuInner />;
}

function SuggestionMenuInner() {
  const { searchTerm } = useAutoCmpleteContext();
  const { data, isLoading, isError } = useQuery<RecipeResponse>({
    queryKey: [searchTerm],
    queryFn: (signal) => fetchRecipies(signal, searchTerm),
    enabled: !!searchTerm,
    staleTime: 60_000,
  });

  return (
    <div className={styles["suggestion-menu"]}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>Something went wrong"</h2>
      ) : data ? (
        <RecipeList recipies={data.recipes} />
      ) : null}
    </div>
  );
}
