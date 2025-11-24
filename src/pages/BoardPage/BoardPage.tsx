import { type ReactNode } from "react";

import Board from "../../components/Board/Board.tsx";

import styles from "./BoardPage.module.css";

function BoardPage(): ReactNode {
  return (
    <div className={styles["board-page"]}>
      <Board />
    </div>
  );
}

export default BoardPage;
