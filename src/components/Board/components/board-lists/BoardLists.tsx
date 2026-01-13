import { type ReactNode, use } from "react";

import { SortableContext } from "@dnd-kit/sortable";

import BoardContext from "../../../../context/list-context.ts";
import List from "../../../List/List.tsx";

import styles from "./BoardLists.module.css";

function BoardLists(): ReactNode {
  const { lists } = use(BoardContext);

  return (
    <SortableContext id="board" items={lists.map((list) => list.id)}>
      <ul className={styles["board-lists"]}>
        {lists.map((list, listIndex) => (
          <li key={list.id}>
            <List list={list} listIndex={listIndex} />
          </li>
        ))}
      </ul>
    </SortableContext>
  );
}

export default BoardLists;
