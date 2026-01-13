import { type PropsWithChildren, type ReactNode } from "react";

import BoardPageContext from "../context/board-page-context.ts";
import type { BoardType } from "../types/board.ts";

type Props = PropsWithChildren<{
  board: BoardType;
}>;

function BoardPageProvider({ board, children }: Props): ReactNode {
  return (
    <BoardPageContext value={{ board }}>
      <div>{children}</div>
    </BoardPageContext>
  );
}

export default BoardPageProvider;
