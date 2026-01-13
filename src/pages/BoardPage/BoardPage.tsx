import { type ReactNode, use } from "react";

import { useParams } from "react-router";

import Board from "../../components/Board/Board.tsx";
import BoardsContext from "../../context/boards-context.ts";
import BoardPageProvider from "../../providers/BoardPageProvider.tsx";
import BoardsProvider from "../../providers/BoardsProvider.tsx";
import DndProvider from "../../providers/DndProvider/DndProvider.tsx";
import ListProvider from "../../providers/ListProvider.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";

import styles from "./BoardPage.module.css";

function BoardPage(): ReactNode {
  return (
    <BoardsProvider>
      <BoardPageContent />
    </BoardsProvider>
  );
}

function BoardPageContent(): ReactNode {
  const { id } = useParams();

  const { boards } = use(BoardsContext);

  const board = boards.find((board) => board.id === id);

  if (!board) {
    return <NotFoundPage />;
  }

  return (
    <BoardPageProvider board={board}>
      <ListProvider>
        <DndProvider>
          <div className={styles["board-page"]}>
            <Board />
          </div>
        </DndProvider>
      </ListProvider>
    </BoardPageProvider>
  );
}

export default BoardPage;
