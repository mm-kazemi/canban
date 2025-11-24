import { type ReactNode } from "react";

import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";
import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import MingcuteMore1Line from "../../icons/MingcuteMore1Line.tsx";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./Board.module.css";

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
          <div className={styles.list}>
            <div className={styles.header}>
              <div className={styles.title}>To Do</div>
              <IconButton>
                <MingcuteMore1Line />
              </IconButton>
            </div>
            <ul className={styles.items}>
              <li>
                <div className={styles.item}>Setup Backend project</div>
              </li>
              <li>
                <div className={styles.item}>
                  Find a Good Name for the project
                </div>
              </li>
              <li>
                <div className={styles.item}>Implement Landing page</div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.list}>
            <div className={styles.header}>
              <div className={styles.title}>Doing</div>
              <IconButton>
                <MingcuteMore1Line />
              </IconButton>
            </div>
            <ul className={styles.items}>
              <li>
                <div className={styles.item}>Setup Backend project</div>
              </li>
              <li>
                <div className={styles.item}>
                  Find a Good Name for the project
                </div>
              </li>
              <li>
                <div className={styles.item}>Implement Landing page</div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.list}>
            <div className={styles.header}>
              <div className={styles.title}>Done</div>
              <IconButton>
                <MingcuteMore1Line />
              </IconButton>
            </div>
            <ul className={styles.items}>
              <li>
                <div className={styles.item}>Setup Backend project</div>
              </li>
              <li>
                <div className={styles.item}>
                  Find a Good Name for the project
                </div>
              </li>
              <li>
                <div className={styles.item}>Implement Landing page</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Board;
