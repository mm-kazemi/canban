import { type ReactNode } from "react";

import Board from "../../components/Board/Board.tsx";
import BoardProvider from "../../providers/BoardProvider.tsx";
import DndProvider from "../../providers/DndProvider/DndProvider.tsx";

import styles from "./BoardPage.module.css";

function BoardPage(): ReactNode {
  return (
    <BoardProvider>
      <DndProvider>
        <div className={styles["board-page"]}>
          <Board />
        </div>
      </DndProvider>
    </BoardProvider>
  );
}

export default BoardPage;
