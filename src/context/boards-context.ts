import { type ActionDispatch, createContext } from "react";

import type { BoardAction } from "../reducer/boards-reducer.ts";
import type { BoardType } from "../types/board.ts";

type ContextValue = {
  boards: BoardType[];
  dispatchBoards: ActionDispatch<[action: BoardAction]>;
};

const BoardsContext = createContext<ContextValue>({
  boards: [],
  dispatchBoards: () => {},
});

export default BoardsContext;
