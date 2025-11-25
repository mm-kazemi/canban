import { type ReactNode } from "react";

import MingcuteMore1Line from "../../icons/MingcuteMore1Line.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import ListItem from "../ListItem/ListItem.tsx";

import styles from "./List.module.css";
import type { ListType } from "../../types/list.ts";

type Props = {
  list: ListType;
};

function List({ list }: Props): ReactNode {
  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.title}>{list.title}</div>
        <IconButton>
          <MingcuteMore1Line />
        </IconButton>
      </div>
      <ul className={styles.items}>
        {list.items.map((item) => (
          <li key={item.id}>
            <ListItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
