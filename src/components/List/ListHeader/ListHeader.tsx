import { type ReactNode, useRef } from "react";

import { MingcuteAddLine } from "../../../icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "../../../icons/MingcuteMore1Line.tsx";
import CreateListItemModal from "../../CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "../../IconButton/IconButton.tsx";

import styles from "./ListHeader.module.css";

type Props = {
  title: string;
  listIndex: number;
};

function ListHeader({ title, listIndex }: Props): ReactNode {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickButton = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles["list-header"]}>
      <div className={styles.title}>{title}</div>
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
