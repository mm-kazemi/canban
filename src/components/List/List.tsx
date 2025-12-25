import { type ReactNode, memo, useRef } from "react";

import { MingcuteAddLine } from "../../icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "../../icons/MingcuteMore1Line.tsx";
import type { ListType } from "../../types/list.ts";
import CreateListItemModal from "../CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import ListItem from "../ListItem/ListItem.tsx";

import styles from "./List.module.css";

type Props = {
  list: ListType;
  onClick?: (listId: string, itemId: string) => void;
};

const List = memo(function List({ list }: Props): ReactNode {
  const useRefState = useRef<HTMLDialogElement>(null);

  const openModalHandleClick = (): void => {
    useRefState.current?.showModal();
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <div className={styles.actions}>
          <IconButton onClick={openModalHandleClick}>
            <MingcuteAddLine />
          </IconButton>
          <IconButton>
            <MingcuteMore1Line />
          </IconButton>
        </div>
      </div>
      <ul className={styles.items}>
        {list.items.map((item) => (
          <li key={item.id}>
            <ListItem listId={list.id} item={item} />
          </li>
        ))}
      </ul>
      <CreateListItemModal
        heading={"Create a New Item"}
        ref={useRefState}
        listId={list.id}
      />
    </div>
  );
});

export default List;
