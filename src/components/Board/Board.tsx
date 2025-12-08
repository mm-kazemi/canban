import {
  type ReactNode,
  memo,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import BoardContext from "../../Context/board-context.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import Button from "../Button/Button.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const { lists, create, move } = use(BoardContext);

  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent): void => {
      if (e.code !== "Escape") {
        return;
      }
      setActiveListId(null);
      setActiveItemId(null);
    };
    document.addEventListener("keydown", handleDocumentKeyDown);
    return (): void => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, []);

  const handleListItemClick = useCallback(
    (listId: string, itemId: string): void => {
      setActiveListId(listId);
      setActiveItemId(itemId);
    },
    [],
  );

  const handleMoveButtonClick = (destinationListId: string): void => {
    if (activeListId && activeItemId) {
      move(activeListId, activeItemId, destinationListId);
    }
    setActiveItemId(null);
    setActiveListId(null);
  };

  const handleCreateItem = (): void => {
    create();
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
          <IconButton onClick={handleCreateItem}>{addIcon}</IconButton>
        </div>
      </div>
      <ul className={styles.lists}>
        {lists.map((list) => (
          <li key={list.id}>
            <List list={list} onClick={handleListItemClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Board);
