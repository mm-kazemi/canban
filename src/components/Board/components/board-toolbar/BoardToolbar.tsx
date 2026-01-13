import { type ReactNode, use, useRef } from "react";

import BoardPageContext from "../../../../context/board-page-context.ts";
import { MingcuteAddLine } from "../../../../icons/MingcuteAddLine.tsx";
import { MingcuteEdit2Line } from "../../../../icons/MingcuteEdit2Line.tsx";
import BoardModal from "../../../../modal/BoardModal/BoardModal.tsx";
import ListModal from "../../../../modal/ListModal/ListModal.tsx";
import IconButton from "../../../IconButton/IconButton.tsx";

import styles from "./BoardToolbar.module.css";

function BoardToolbar(): ReactNode {
  const { board } = use(BoardPageContext);

  const boardModalRef = useRef<HTMLDialogElement | null>(null);
  const listModalRef = useRef<HTMLDialogElement | null>(null);

  const handleCreateListButtonClick = (): void => {
    listModalRef.current?.showModal();
  };

  const handleEditListButtonClick = (): void => {
    boardModalRef.current?.showModal();
  };

  return (
    <div className={styles["board-toolbar"]}>
      <div className={styles.title}>{board.title}</div>
      <div className={styles.actions}>
        <IconButton onClick={handleEditListButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
      <ListModal modalRef={listModalRef} />
      <BoardModal
        modalRef={boardModalRef}
        boardId={board.id}
        defaultValues={board}
      />
    </div>
  );
}

export default BoardToolbar;
