import type { Draft } from "immer";

import { arrayMove } from "@dnd-kit/sortable";

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
    }
  | {
      type: "item_dragged_over";
      activeItemIndex: number;
      activeListIndex: number;
      overListIndex: number;
      overItemIndex?: number;
    }
  | {
      type: "item_dragged_end";
      activeItemIndex: number;
      activeListIndex: number;
      overItemIndex: number;
    }
  | {
      type: "list_dragged_end";
      activeListIndex: number;
      overListIndex: number;
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
    case "item_dragged_over": {
      const { activeListIndex, activeItemIndex, overListIndex, overItemIndex } =
        action;

      if (activeListIndex === overListIndex) {
        return;
      }

      const activeList = draft[activeListIndex];
      const activeItem = activeList.items[activeItemIndex];
      const overList = draft[overListIndex];

      const newIndex = overItemIndex ?? overList.items.length;

      overList.items.splice(newIndex, 0, activeItem);
      activeList.items.splice(activeItemIndex, 1);

      return;
    }
    case "item_dragged_end": {
      const { activeListIndex, activeItemIndex, overItemIndex } = action;

      if (activeItemIndex === overItemIndex) {
        return;
      }

      const activeList = draft[activeListIndex];

      activeList.items = arrayMove(
        activeList.items,
        activeItemIndex,
        overItemIndex,
      );

      return;
    }
    case "list_dragged_end": {
      const { activeListIndex, overListIndex } = action;

      if (activeListIndex === overListIndex) {
        return;
      }

      const activeList = draft[activeListIndex];

      draft.splice(activeListIndex, 1);
      draft.splice(overListIndex, 0, activeList);

      return;
    }
    default: {
      throw new Error("No action type");
    }
  }
}

export default ListReducer;
