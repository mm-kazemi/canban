import { type ReactNode, memo, useRef } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { MingcuteAddLine } from "../../icons/MingcuteAddLine.tsx";
import MingcuteMore1Line from "../../icons/MingcuteMore1Line.tsx";
import type { ListType } from "../../types/list.ts";
import CreateListItemModal from "../CreateListItemModal/CreateListItemModal.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import ListItem from "../ListItem/ListItem.tsx";

import styles from "./List.module.css";

type Props = {
  list: ListType;
  listIndex: number;
  onClick?: (listId: string, itemId: string) => void;
};

const List = memo(function List({ list, listIndex }: Props): ReactNode {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { isList: true, listIndex, list },
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickButton = (): void => {
    modalRef.current?.showModal();
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <div className={styles.actions}>
          <IconButton onClick={handleClickButton}>
            <MingcuteAddLine />
          </IconButton>
          <IconButton>
            <MingcuteMore1Line />
          </IconButton>
        </div>
      </div>
      <SortableContext id={list.id} items={list.items.map((item) => item.id)}>
        <ul className={styles.items} ref={setNodeRef}>
          {list.items.map((item, itemIndex) => (
            <li key={item.id}>
              <ListItem
                listIndex={listIndex}
                itemIndex={itemIndex}
                item={item}
              />
            </li>
          ))}
        </ul>
      </SortableContext>
      <CreateListItemModal
        heading={"Create a New Item"}
        ref={modalRef}
        listIndex={listIndex}
      />
    </div>
  );
});

export default List;
