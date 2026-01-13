import type { Draft } from "immer";

import type { BoardType } from "../types/board.ts";

export type BoardAction =
  | {
      type: "board_created";
      board: BoardType;
    }
  | {
      type: "board_edited";
      boardId: string;
      board: Partial<BoardType>;
    }
  | {
      type: "board_removed";
      boardId: string;
    };
function BoardsReducer(draft: Draft<BoardType[]>, action: BoardAction): void {
  switch (action.type) {
    case "board_created": {
      draft.push(action.board);
      break;
    }
    case "board_edited": {
      const boardIndex = draft.findIndex(
        (board) => board.id === action.boardId,
      );

      if (boardIndex === -1) {
        return;
      }

      draft[boardIndex] = {
        ...draft[boardIndex],
        ...action.board,
      };
      break;
    }
    case "board_removed": {
      const boardIndex = draft.findIndex(
        (board) => board.id === action.boardId,
      );

      if (boardIndex === -1) {
        return;
      }

      draft.splice(boardIndex, 1);
      break;
    }
    default: {
      throw new Error("No action type");
    }
  }
}

export default BoardsReducer;
