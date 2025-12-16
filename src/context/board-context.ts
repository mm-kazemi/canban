import { createContext } from "react";

import type { ListType } from "../types/list.ts";

type ContextValue = {
  lists: ListType[];
  create: (listId: string, item: ListType) => void;
  remove: (listId: string, itemId: string) => void;
  move: (listId: string, itemId: string, destinationListId: string) => void;
};

const BoardContext = createContext<ContextValue>({
  lists: [],
  create: () => {},
  remove: () => {},
  move: () => {},
});

export default BoardContext;
