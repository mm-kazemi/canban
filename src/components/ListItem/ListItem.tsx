import { memo, type ReactNode } from "react";

import type { ListItemType } from "../../types/list-item.ts";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
  onClick?: (listId: string, itemId: string) => void;
};

const ListItem=memo(function ListItem({ item, listId, onClick }: Props): ReactNode {
  return (
    <div
      className={styles["list-item"]}
      onClick={() => onClick?.(listId, item.id)}
    >
      {item.title}
    </div>
  );
})

export default ListItem;
