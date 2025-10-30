import CommandBox from "./CommandBox";
import styles from "./CommandBox.module.css";

export default function AutoCompleteII() {
  return (
    <div>
      <h2>AutoComplete II</h2>
      <input
        className={styles["dummy-input"]}
        readOnly
        placeholder="Search Recipies use shortcut 'cmd + shift + u'"
      ></input>
      <CommandBox />
    </div>
  );
}
