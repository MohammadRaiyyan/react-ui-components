import type { Recipe } from "./types";
import styles from "./AutoComplete.module.css";
export default function RecipeItem({ id, name }: Recipe) {
  return (
    <li data-value={name} className={styles["suggestion-list__item"]} key={id}>
      {name}
    </li>
  );
}
