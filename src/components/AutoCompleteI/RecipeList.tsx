import RecipeItem from "./RecipeItem";
import styles from "./AutoComplete.module.css";
import type { Recipe } from "./types";

export default function RecipeList({ recipies }: { recipies: Array<Recipe> }) {
  return (
    <ul className={styles["suggestion-list"]}>
      {recipies.map((recipi) => (
        <RecipeItem key={recipi.id} {...recipi} />
      ))}
    </ul>
  );
}
