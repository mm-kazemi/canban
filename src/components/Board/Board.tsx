import { type ReactNode, memo, use, useMemo } from "react";

import BoardContext from "../../context/board-context.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  const { lists } = use(BoardContext);

  const editIcon = useMemo(() => <MingcuteEdit2Line />, []);

  const addIcon = useMemo(() => <MingcuteAddLine />, []);

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
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
