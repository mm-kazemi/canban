import { type ReactNode } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { ListType } from "../../types/list.ts";
import ListHeader from "./ListHeader/ListHeader.tsx";
import ListItems from "./ListItems/ListItems.tsx";

import styles from "./List.module.css";

type Props = {
  presentational?: boolean;
  listIndex: number;
  list: ListType;
};

function List({ list, listIndex, presentational }: Props): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { isList: true, listIndex, list } });

  return (
    <div
      ref={setNodeRef}
      className={styles.list}
      style={{
        opacity: isDragging ? "0.5" : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <ListHeader
        title={list.title}
        listIndex={listIndex}
        listeners={listeners}
      />
      <ListItems
        list={list}
        listIndex={listIndex}
        presentational={presentational}
      />
    </div>
  );
}

export default List;
