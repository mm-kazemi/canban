import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import BoardContext from "../Context/board-context.ts";
import { listsData } from "../data/list-data.ts";
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

function CounterProvider({ children }: Props): ReactNode {
  const [lists, setLists] = useState<ListType[]>(load);

  useEffect(() => {
    save(lists);
  }, [lists]);

  const create = () => {
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
  };

  const remove = (listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
          : list,
      ),
    );
  };

  const move = (listId: string, itemId: string, destinationListId: string) => {
    if (!listId || !itemId || listId === destinationListId) {
      return;
    }
    const sourceList = lists.find((list) => list.id === listId);
    const sourceItem = sourceList?.items.find((i) => i.id === itemId);
    if (!sourceItem) {
      return;
    }
    setLists((prev) => {
      return prev.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            items: list.items.filter((i) => i.id !== itemId),
          };
        }
        if (list.id === destinationListId) {
          return { ...list, items: [...list.items, sourceItem] };
        }
        return list;
      });
    });
  };

  return (
    <BoardContext value={{ lists, create, remove, move }}>
      <div>{children}</div>
    </BoardContext>
  );
}

export default CounterProvider;
