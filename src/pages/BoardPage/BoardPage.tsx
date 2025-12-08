import { type ReactNode } from "react";

import Board from "../../components/Board/Board.tsx";
import CounterProvider from "../../providers/CounterProvider.tsx";

import styles from "./BoardPage.module.css";

function BoardPage(): ReactNode {
  return (
    <CounterProvider>
      <div className={styles["board-page"]}>
        <Board />
      </div>
    </CounterProvider>
  );
}

export default BoardPage;
