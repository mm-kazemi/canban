import { type ReactNode, use, useRef } from "react";

import BoardPageContext from "../../../../context/board-page-context.ts";
import { MingcuteAddLine } from "../../../../icons/MingcuteAddLine.tsx";
import { MingcuteEdit2Line } from "../../../../icons/MingcuteEdit2Line.tsx";
import ListModal from "../../../../modal/ListModal/ListModal.tsx";
import IconButton from "../../../IconButton/IconButton.tsx";

import styles from "./BoardToolbar.module.css";

function BoardToolbar(): ReactNode {
  const { board } = use(BoardPageContext);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCreateListButtonClick = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["board-toolbar"]}>
      <div className={styles.title}>{board.title}</div>
      <div className={styles.actions}>
        <IconButton>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
      <ListModal modalRef={modalRef} />
    </div>
  );
}

export default BoardToolbar;
