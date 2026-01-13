import { type ReactNode, use } from "react";

import BoardCard from "../../components/BoardCard/BoardCard.tsx";
import Button from "../../components/Button/Button.tsx";
import boardsContext from "../../context/boards-context.ts";
import BoardsProvider from "../../providers/BoardsProvider.tsx";

import styles from "./HomePage.module.css";

function HomePage(): ReactNode {
  return (
    <BoardsProvider>
      <HomePageContent />
    </BoardsProvider>
  );
}

function HomePageContent(): ReactNode {
  const { boards } = use(boardsContext);

  return (
    <div className={styles.app}>
      <main>
        <div className={styles.header}>
          <h1>Boards</h1>
          <Button variant={"solid"} color={"primary"}>
            Create
          </Button>
        </div>
        <ul className={styles.boards}>
          {boards.map((board) => (
            <li key={board.id}>
              <BoardCard board={board} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default HomePage;
