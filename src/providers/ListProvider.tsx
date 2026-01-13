import { type PropsWithChildren, type ReactNode, use, useEffect } from "react";

import { useImmerReducer } from "use-immer";

import BoardPageContext from "../context/board-page-context.ts";
import BoardsContext from "../context/boards-context.ts";
import ListContext from "../context/list-context.ts";
import ListReducer from "../reducer/list-reducer.ts";

type Props = PropsWithChildren;

function ListProvider({ children }: Props): ReactNode {
  const { dispatchBoards } = use(BoardsContext);
  const { board } = use(BoardPageContext);

  const [lists, dispatchLists] = useImmerReducer(ListReducer, board.lists);

  useEffect(() => {
    dispatchBoards({
      type: "board_edited",
      boardId: board.id,
      board: { lists },
    });
  }, [board.id, dispatchBoards, lists]);

  return (
    <ListContext value={{ lists, dispatchLists }}>
      <div>{children}</div>
    </ListContext>
  );
}

export default ListProvider;
