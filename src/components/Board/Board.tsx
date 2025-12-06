import { type ReactNode, memo, useCallback, useMemo, useState, useEffect } from "react";

import { listsData } from "../../data/list-data.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import type { ListType } from "../../types/list.ts";
import Button from "../Button/Button.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function save(lists: ListType[]): void {
  localStorage.setItem("lists", JSON.stringify(lists));
}

function load (): ListType[] {
  const item = localStorage.getItem("lists");

  if (!item) {
    return listsData;
  }

  return JSON.parse(item);
}

function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(load);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  useEffect(() => {
    save(lists);
  }, [lists]);

  const handleListItemClick = useCallback(
    (listId: string, itemId: string): void => {
      setActiveListId(listId);
      setActiveItemId(itemId);
    },
    [],
  );

  const handleDeleteListItemClick = useCallback((): void => {
    if (!activeListId || !activeItemId) {
      return;
    }
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.filter((i) => i.id !== activeItemId) }
          : list,
      ),
    );
    setActiveItemId(null);
    setActiveListId(null);
  }, [activeListId, activeItemId]);

  const handleMoveButtonClick = useCallback(
    (destinationListId: string): void => {
      if (
        !activeListId ||
        !activeItemId ||
        activeListId === destinationListId
      ) {
        return;
      }
      const sourceList = lists.find((list) => list.id === activeListId);
      const sourceItem = sourceList?.items.find((i) => i.id === activeItemId);
      if (!sourceItem) {
        return;
      }
      setLists((prev) => {
        return prev.map((list) => {
          if (list.id === activeListId) {
            return {
              ...list,
              items: list.items.filter((i) => i.id !== activeItemId),
            };
          }
          if (list.id === destinationListId) {
            return { ...list, items: [...list.items, sourceItem] };
          }
          return list;
        });
      });
      setActiveItemId(null);
      setActiveListId(null);
    },
    [lists, activeListId, activeItemId],
  );

  const editIcon = useMemo(() => <MingcuteEdit2Line />, []);

  const addIcon = useMemo(() => <MingcuteAddLine />, []);

  const handleCreateItem = useCallback((): void => {
    const newItem = {
      id: self.crypto.randomUUID(),
      title: self.crypto.randomUUID(),
    };

    setLists((prev) => {
      return prev.map((list) => {
        if (list.id === "1") {
          return { ...list, items: [...list.items, newItem] };
        }
        return list;
      });
    });
  }, [lists]);

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
              <Button onClick={handleDeleteListItemClick}>Remove</Button>
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
