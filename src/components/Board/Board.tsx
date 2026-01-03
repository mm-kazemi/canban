import { type ReactNode, use } from "react";

import { SortableContext } from "@dnd-kit/sortable";

import BoardContext from "../../context/board-context.ts";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import List from "../List/List.tsx";

import styles from "./Board.module.css";

function Board(): ReactNode {
  const { lists } = use(BoardContext);

  return (
    <div className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.title}>Board Title</div>
        <div className={styles.actions}>
          <IconButton>
            <MingcuteEdit2Line />
          </IconButton>

          <IconButton>
            <MingcuteAddLine />
          </IconButton>
        </div>
      </div>
      <SortableContext id="board" items={lists.map((list) => list.id)}>
        <ul className={styles.lists}>
          {lists.map((list, listIndex) => (
            <li key={list.id}>
              <List list={list} listIndex={listIndex} />
            </li>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

export default Board;
