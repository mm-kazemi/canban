import { type ReactNode } from "react";

import MingcuteEdit2Line from "../../icons/MingcuteEdit2Line.tsx";
import MingcuteAddLine from "../../icons/MingcuteAddLine.tsx";

import styles from "./KanbanHeader.module.css"

function KanbanHeader(): ReactNode {
  return (
    <div className={styles["kanban-header"]}>
      <p>Board Title</p>
      <div className={styles.icons}>
        <MingcuteEdit2Line />
        <MingcuteAddLine />
      </div>

    </div>
  );
}

export default KanbanHeader;