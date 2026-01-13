import { type ReactNode, useRef } from "react";

import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { MingcuteAddLine } from "../../../icons/MingcuteAddLine.tsx";
import MingcuteDotsLine from "../../../icons/MingcuteDotsLine.tsx";
import { MingcuteEdit2Line } from "../../../icons/MingcuteEdit2Line.tsx";
import ListItemModal from "../../../modal/ListItemModal/ListItemModal.tsx";
import ListModal from "../../../modal/ListModal/ListModal.tsx";
import type { ListType } from "../../../types/list.ts";
import IconButton from "../../IconButton/IconButton.tsx";

import styles from "./ListHeader.module.css";

type Props = {
  listIndex: number;
  list: ListType;
  listeners?: SyntheticListenerMap;
};

function ListHeader({ list, listIndex, listeners }: Props): ReactNode {
  const listItemModalRef = useRef<HTMLDialogElement>(null);
  const listModalRef = useRef<HTMLDialogElement>(null);

  const handleCreateListItemButtonClick = (): void => {
    listItemModalRef.current?.showModal();
  };

  const handleEditListButtonClick = (): void => {
    listModalRef.current?.showModal();
  };

  return (
    <div className={styles["list-header"]}>
      <div className={styles["drag-handle"]} {...listeners}>
        <MingcuteDotsLine />
        <div className={styles.title}>{list.title}</div>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={handleEditListButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
        <IconButton onClick={handleCreateListItemButtonClick}>
          <MingcuteAddLine />
        </IconButton>
      </div>
      <ListModal
        modalRef={listModalRef}
        listIndex={listIndex}
        defaultValues={list}
      />
      <ListItemModal modalRef={listItemModalRef} listIndex={listIndex} />
    </div>
  );
}

export default ListHeader;
