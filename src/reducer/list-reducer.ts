import type { ListType } from "../types/list.ts";

type ActionTypes =
  | {
      type: "create";
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

function ListReducer(state: ListType[], action: ActionTypes): ListType[] {
  switch (action.type) {
    case "create": {
      const newItem = {
        id: self.crypto.randomUUID(),
        title: self.crypto.randomUUID(),
      };
      return state.map((list) => {
        if (list.id === "1") {
          return { ...list, items: [...list.items, newItem] };
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
