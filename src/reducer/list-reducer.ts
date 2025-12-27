import type { ListItemType } from "../types/list-item.ts";
import type { ListType } from "../types/list.ts";

export type ListAction =
  | {
      type: "create";
      listId: string;
      item: ListItemType;
    }
  | {
      type: "move";
      listId: string;
      itemId: string;
      destinationListId: string;
    }
  | {
      type: "remove";
      listId: string;
      itemId: string;
    };

function ListReducer(state: ListType[], action: ListAction): ListType[] {
  switch (action.type) {
    case "create": {
      return state.map((list) => {
        if (list.id === action.listId) {
          return { ...list, items: [...list.items, action.item] };
        }
        return list;
      });
    }
    case "move": {
      const { listId, itemId, destinationListId } = action;

      if (!listId || !itemId || listId === destinationListId) {
        return state;
      }
      const sourceList = state.find((list) => list.id === listId);
      const sourceItem = sourceList?.items.find((i) => i.id === itemId);
      if (!sourceItem) {
        return state;
      }
      return state.map((list) => {
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
    }
    case "remove": {
      const { listId, itemId } = action;

      return state.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
          : list,
      );
    }
    default: {
      throw new Error("No action type");
    }
  }
}

export default ListReducer;
