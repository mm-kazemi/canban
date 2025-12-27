import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";

import BoardContext from "../context/board-context.ts";
import { listsData } from "../data/list-data.ts";
import ListReducer from "../reducer/list-reducer.ts";
import type { ListType } from "../types/list.ts";

type Props = PropsWithChildren;

function save(lists: ListType[]): void {
  localStorage.setItem("lists", JSON.stringify(lists));
}

function load(): ListType[] {
  const item = localStorage.getItem("lists");

  if (!item) {
    return listsData;
  }

  return JSON.parse(item);
}

function BoardProvider({ children }: Props): ReactNode {
  const [lists, dispatchLists] = useReducer(ListReducer, load());

  useEffect(() => {
    save(lists);
  }, [lists]);

  return (
    <BoardContext value={{ lists, dispatchLists }}>
      <div>{children}</div>
    </BoardContext>
  );
}

export default BoardProvider;
