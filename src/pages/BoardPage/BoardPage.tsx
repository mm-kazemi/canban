import { type ReactNode } from "react";

import Board from "../../components/Board/Board.tsx";
import BoardProvider from "../../providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

function BoardPage(): ReactNode {
  return (
    <BoardProvider>
      <div className={styles["board-page"]}>
        <Board />
      </div>
    </BoardProvider>
  );
}

export default BoardPage;
