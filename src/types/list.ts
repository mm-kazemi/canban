import type { ListItemType } from "./list-item.ts";

export type ListType = {
  id: string;
  title: string;
  items: ListItemType[];
}