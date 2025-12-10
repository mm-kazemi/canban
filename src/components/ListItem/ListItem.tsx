import { type MouseEvent, type ReactNode, memo, use } from "react";

import clsx from "clsx";

import ActiveItemContext from "../../context/active-item-context.ts";
import BoardContext from "../../context/board-context.ts";
import MingcuteDelete2Line from "../../icons/MingcuteDelete2Line.tsx";
import type { ListItemType } from "../../types/list-item.ts";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./ListItem.module.css";

type Props = {
  listId: string;
  item: ListItemType;
};

const ListItem = memo(function ListItem({ item, listId }: Props): ReactNode {
  const { remove } = use(BoardContext);
  const { activate, deactivate, activeItemId } = use(ActiveItemContext);

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    remove(listId, item.id);
    deactivate();
  };

  const handleItemClick = (): void => {
    if (activeItemId === item.id) {
      deactivate();
    } else {
      activate(listId, item.id);
    }
  };

  return (
    <div
      className={clsx(
        styles["list-item"],
        item.id === activeItemId && styles.active,
      )}
      onClick={handleItemClick}
    >
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
