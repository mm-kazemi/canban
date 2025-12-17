import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";

import BoardContext from "../context/board-context.ts";
import { listsData } from "../data/list-data.ts";
import ListReducer from "../reducer/list-reducer.ts";
import type { ListItemType } from "../types/list-item.ts";
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
  const [lists, dispatch] = useReducer(ListReducer, load());

  useEffect(() => {
    save(lists);
  }, [lists]);

  const create = (listId: string, item: ListItemType) => {
    dispatch({ type: "create", listId, item });
  };

  const move = (listId: string, itemId: string, destinationListId: string) => {
    dispatch({
      type: "move",
      listId,
      itemId,
      destinationListId,
    });
  };

  const remove = (listId: string, itemId: string) => {
    dispatch({
      type: "remove",
      listId,
      itemId,
    });
  };

  return (
    <BoardContext value={{ lists, create, remove, move }}>
      <div>{children}</div>
    </BoardContext>
  );
}

export default BoardProvider;
