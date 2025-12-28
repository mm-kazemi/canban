import { type MouseEvent, type ReactNode, memo, use } from "react";

import { toast } from "react-toastify";

import BoardContext from "../../context/board-context.ts";
import MingcuteDelete2Line from "../../icons/MingcuteDelete2Line.tsx";
import type { ListItemType } from "../../types/list-item.ts";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./ListItem.module.css";

type Props = {
  listIndex: number;
  itemIndex: number;
  item: ListItemType;
};

const ListItem = memo(function ListItem({
  item,
  listIndex,
  itemIndex,
}: Props): ReactNode {
  const { dispatchLists } = use(BoardContext);

  const handleRemoveButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();

    dispatchLists({ type: "item_removed", listIndex, itemIndex });
    toast.success("Item successfully deleted.");
  };

  return (
    <div className={styles["list-item"]}>
      {item.title}
      <IconButton onClick={handleRemoveButtonClick}>
        <MingcuteDelete2Line />
      </IconButton>
    </div>
  );
});

export default ListItem;
