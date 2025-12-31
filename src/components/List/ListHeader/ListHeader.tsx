import { type ReactNode, useRef } from "react";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { MingcuteAddLine } from "../../../icons/MingcuteAddLine.tsx";
import MingcuteDotsLine from "../../../icons/MingcuteDotsLine.tsx";
import MingcuteMore1Line from "../../../icons/MingcuteMore1Line.tsx";
import CreateListItemModal from "../../CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "../../IconButton/IconButton.tsx";

import styles from "./ListHeader.module.css";

type Props = {
  title: string;
  listIndex: number;
  listeners?: SyntheticListenerMap;
};

function ListHeader({ title, listIndex, listeners }: Props): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickButton = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["list-header"]}>
      <div className={styles["drag-handle"]} {...listeners}>
        <MingcuteDotsLine />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={handleClickButton}>
          <MingcuteAddLine />
        </IconButton>
        <IconButton>
          <MingcuteMore1Line />
        </IconButton>
      </div>
      <CreateListItemModal
        heading={"Create a New Item"}
        ref={modalRef}
        listIndex={listIndex}
      />
    </div>
  );
}

export default ListHeader;
