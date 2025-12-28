import type { Draft } from "immer";

import type { ListItemType } from "../types/list-item.ts";
import type { ListType } from "../types/list.ts";

export type ListAction =
  | {
      type: "item_created";
      listIndex: number;
      item: ListItemType;
    }
  | {
      type: "item_removed";
      itemIndex: number;
      listIndex: number;
    };

function ListReducer(draft: Draft<ListType[]>, action: ListAction): void {
  switch (action.type) {
    case "item_created": {
      const list = draft[action.listIndex];
      list.items.push(action.item);
      break;
    }
    case "item_removed": {
      const list = draft[action.listIndex];
      list.items.splice(action.itemIndex, 1);
      break;
    }
    default: {
      throw new Error("No action type");
    }
  }
}

export default ListReducer;
