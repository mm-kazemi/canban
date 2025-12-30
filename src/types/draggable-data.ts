import type { ListItemType } from "./list-item.ts";
import type { ListType } from "./list.ts";

type ListDraggableData = {
  isList: true;
  listIndex: number;
  list: ListType;
};

type ListItemDraggableData = {
  isList: false;
  listIndex: number;
  itemIndex: number;
  item: ListItemType;
};

export type DraggableData = ListDraggableData | ListItemDraggableData;
