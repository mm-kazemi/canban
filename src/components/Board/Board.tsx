import { type ReactNode } from "react";

import BoardLists from "./components/board-lists/BoardLists.tsx";
import BoardToolbar from "./components/board-toolbar/BoardToolbar.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  return (
    <div className={styles.board}>
      <BoardToolbar />
      <BoardLists />
    </div>
  );
}

export default Board;
