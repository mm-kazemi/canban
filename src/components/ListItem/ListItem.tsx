import { type MouseEvent, type ReactNode, memo } from "react";

import MingcuteDelete2Line from "../../icons/MingcuteDelete2Line.tsx";
import type { ListItemType } from "../../types/list-item.ts";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
  onClick?: (listId: string, itemId: string) => void;
  onRemove?: (listId: string, itemId: string) => void;
};

const ListItem = memo(function ListItem({
  item,
  listId,
  onClick,
  onRemove,
}: Props): ReactNode {
  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    onRemove?.(listId, item.id);
  };

  return (
    <div
      className={styles["list-item"]}
      onClick={() => onClick?.(listId, item.id)}
    >
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
