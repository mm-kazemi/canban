import { type ReactNode, memo, use, useMemo } from "react";

import { toast } from "react-toastify";

import ActiveItemContext from "../../context/active-item-context.ts";
import BoardContext from "../../context/board-context.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import Button from "../Button/Button.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  const { lists, dispatchLists } = use(BoardContext);
  const { activeListId, activeItemId } = use(ActiveItemContext);

  const handleMoveButtonClick = (destinationListId: string): void => {
    if (activeListId && activeItemId) {
      dispatchLists({
        type: "move",
        listId: activeListId,
        itemId: activeItemId,
        destinationListId,
      });
      toast.success("Item successfully moved.");
    }
  };

  const editIcon = useMemo(() => <MingcuteEdit2Line />, []);

  const addIcon = useMemo(() => <MingcuteAddLine />, []);

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          {activeListId !== null && (
            <div className={styles.spacer}>
              {lists
                .filter((list) => list.id !== activeListId)
                .map((list) => (
                  <Button
                    key={list.id}
                    onClick={() => handleMoveButtonClick(list.id)}
                  >
                    {list.title}
                  </Button>
                ))}
            </div>
          )}
          <IconButton>{editIcon}</IconButton>
          <IconButton>{addIcon}</IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <li key={list.id}>
            <List list={list} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Board);
