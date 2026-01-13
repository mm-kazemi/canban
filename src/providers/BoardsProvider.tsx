import { type PropsWithChildren, type ReactNode, useEffect } from "react";

import { useImmerReducer } from "use-immer";

import BoardContext from "../context/boards-context.ts";
import { boardsData } from "../data/boards-data.ts";
import BoardsReducer from "../reducer/boards-reducer.ts";
import type { BoardType } from "../types/board.ts";

type Props = PropsWithChildren;

function save(boards: BoardType[]): void {
  localStorage.setItem("boards", JSON.stringify(boards));
}

function load(): BoardType[] {
  const item = localStorage.getItem("boards");

  if (!item) {
    return boardsData;
  }

  return JSON.parse(item);
}

function BoardsProvider({ children }: Props): ReactNode {
  const [boards, dispatchBoards] = useImmerReducer(
    BoardsReducer,
    undefined,
    load,
  );

  useEffect(() => {
    save(boards);
  }, [boards]);

  return (
    <BoardContext value={{ boards, dispatchBoards }}>
      <div>{children}</div>
    </BoardContext>
  );
}

export default BoardsProvider;
