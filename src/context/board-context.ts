import { type ActionDispatch, createContext } from "react";

import type { ListAction } from "../reducer/list-reducer.ts";
import type { ListType } from "../types/list.ts";

type ContextValue = {
  lists: ListType[];
  dispatchLists: ActionDispatch<[action: ListAction]>;
};

const BoardContext = createContext<ContextValue>({
  lists: [],
  dispatchLists: () => {},
});

export default BoardContext;
