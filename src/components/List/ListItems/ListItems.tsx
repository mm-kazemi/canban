import { type ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import type { ListType } from "../../../types/list.ts";
import ListItem from "../../ListItem/ListItem.tsx";

import styles from "./ListItems.module.css";

type Props = {
  presentational?: boolean;
  list: ListType;
  listIndex: number;
};

function ListItems({ list, listIndex, presentational }: Props): ReactNode {
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { isList: true, listIndex, list },
  });

  return (
    <SortableContext id={list.id} items={list.items.map((item) => item.id)}>
      <ul className={styles["list-items"]} ref={setNodeRef}>
        {list.items.map((item, itemIndex) => (
          <li key={item.id}>
            <ListItem
              listIndex={listIndex}
              itemIndex={itemIndex}
              item={item}
              presentational={presentational}
            />
          </li>
        ))}
      </ul>
    </SortableContext>
  );
}

export default ListItems;
