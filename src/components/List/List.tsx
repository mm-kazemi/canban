import { type ReactNode, memo } from "react";

import type { ListType } from "../../types/list.ts";
import ListHeader from "./ListHeader/ListHeader.tsx";
import ListItems from "./ListItems/ListItems.tsx";

import styles from "./List.module.css";

type Props = {
  list: ListType;
  listIndex: number;
  onClick?: (listId: string, itemId: string) => void;
};

const List = memo(function List({ list, listIndex }: Props): ReactNode {
  return (
    <div className={styles.list}>
      <ListHeader title={list.title} listIndex={listIndex} />
      <ListItems list={list} listIndex={listIndex} />
    </div>
  );
});

export default List;
