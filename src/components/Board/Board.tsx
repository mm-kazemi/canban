import { type ReactNode } from "react";

import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import MingcuteMore1Line from "../../icons/MingcuteMore1Line.tsx";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./Board.module.css";
import List from "../List/List.tsx";

function Board(): ReactNode {


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
      <ul className={styles.lists}>
        <li>
          <List list={}/>
        </li>
      </ul>
    </div>
  );
}

export default Board;
