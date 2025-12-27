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

function ListReducer(draft: ListType[], action: ListAction): ListType[] {
  switch (action.type) {
    case "create": {
      const list = draft.find((l) => l.id === action.listId);
      if (list) {
        list.items.push(action.item);
      }
    }
    case "move": {
      const { listId, itemId, destinationListId } = action;

      if (!listId || !itemId || listId === destinationListId) return;

      const sourceList = draft.find((list) => list.id === listId);
      const destList = draft.find((l) => l.id === destinationListId);
      if (!sourceList || !destList) return;

      const itemIndex = sourceList.items.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) return;

      const [movedItem] = sourceList.items.splice(itemIndex, 1);
      destList.items.push(movedItem);

      break;
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
