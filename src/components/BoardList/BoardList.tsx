import { type ReactNode } from "react";

import styles from "./BoardList.module.css";

function BoardList(): ReactNode {
  return (
    <div className={styles["board-list"]}>
      <div className={styles.title}>To Do</div>
      <div className={styles.list}>
        <ul>
          <li>Setup Backend project</li>
          <li>Find a Good Name for the project</li>
          <li>Implement Landing page</li>
        </ul>
      </div>
    </div>
  );
}

export default BoardList;
