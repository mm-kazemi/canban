import { type MouseEvent, type ReactNode, memo, useRef } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import clsx from "clsx";

import { MingcuteEdit2Line } from "../../icons/MingcuteEdit2Line.tsx";
import ListItemModal from "../../modal/ListItemModal/ListItemModal.tsx";
import type { ListItemType } from "../../types/list-item.ts";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./ListItem.module.css";

type Props = {
  presentational?: boolean;
  listIndex: number;
  itemIndex: number;
  item: ListItemType;
};

const ListItem = memo(function ListItem({
  presentational,
  item,
  listIndex,
  itemIndex,
}: Props): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    over,
  } = useSortable({
    id: item.id,
    data: { isList: false, listIndex, itemIndex, item },
  });

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleEditButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    modalRef.current?.showModal();
  };

  const overListIndex = over?.data.current?.listIndex;

  return (
    <>
      {" "}
      <div
        ref={setNodeRef}
        className={clsx(
          styles["list-item"],
          presentational && styles.presentational,
        )}
        style={{
          opacity: isDragging ? "0.5" : undefined,
          transform: CSS.Translate.toString(transform),
          transition: listIndex === overListIndex ? transition : undefined,
        }}
        {...attributes}
        {...listeners}
      >
        {item.title}
        <IconButton onPointerDown={handleEditButtonClick}>
          <MingcuteEdit2Line />
        </IconButton>
      </div>
      <ListItemModal
        modalRef={modalRef}
        listIndex={listIndex}
        itemIndex={itemIndex}
        defaultValues={item}
      />
    </>
  );
});

export default ListItem;
