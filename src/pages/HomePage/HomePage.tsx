import { type ReactNode, use, useRef } from "react";

import BoardCard from "../../components/BoardCard/BoardCard.tsx";
import Button from "../../components/Button/Button.tsx";
import boardsContext from "../../context/boards-context.ts";
import BoardModal from "../../modal/BoardModal/BoardModal.tsx";

import styles from "./HomePage.module.css";

function HomePage(): ReactNode {
  const { boards } = use(boardsContext);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCreateButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles.app}>
      <main>
        <div className={styles.header}>
          <h1>Boards</h1>
          <Button
            variant={"solid"}
            color={"primary"}
            onClick={handleCreateButtonClick}
          >
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
        <BoardModal modalRef={modalRef} />
      </main>
    </div>
  );
}

export default HomePage;
