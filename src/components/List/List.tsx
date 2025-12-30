import { type ReactNode } from "react";

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
  return (
    <div className={styles.list}>
      <ListHeader title={list.title} listIndex={listIndex} />
      <ListItems
        list={list}
        listIndex={listIndex}
        presentational={presentational}
      />
    </div>
  );
}

export default List;
