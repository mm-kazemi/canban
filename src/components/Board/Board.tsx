import { type ReactNode, useState } from "react";

import { listsData } from "../../data/list-data.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import type { ListType } from "../../types/list.ts";
import Button from "../Button/Button.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  const [lists, setLists] = useState<ListType[]>(listsData);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleListItemClick = (listId: string, itemId: string): void => {
    setActiveListId(listId);
    setActiveItemId(itemId);
  };

  const handleDeleteListItemClick = (): void => {
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
  };

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
                  <Button key={list.id}>{list.title}</Button>
                ))}
              <Button onClick={handleDeleteListItemClick}>Remove</Button>
            </div>
          )}
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>
          <IconButton>
            <MingcuteAddLine />
          </IconButton>
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

export default Board;
