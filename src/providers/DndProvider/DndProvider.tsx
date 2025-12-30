import {
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useState,
} from "react";

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import ListItem from "../../components/ListItem/ListItem.tsx";
import BoardContext from "../../context/board-context.ts";
import type { DraggableData } from "../../types/draggable-data.ts";

type Props = PropsWithChildren;

function DndProvider({ children }: Props): ReactNode {
  const { dispatchLists } = useContext(BoardContext);
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeData, setActiveData] = useState<DraggableData | null>(null);

  const handleDragStart = (e: DragStartEvent): void => {
    setActiveData(e.active.data.current as DraggableData);
  };

  const handleDragEnd = (e: DragEndEvent): void => {
    setActiveData(null);

    if (!e.over) {
      return;
    }

    dispatchLists({
      type: "item_dragged_end",
      activeListIndex: e.active.data.current!.listIndex,
      activeItemIndex: e.active.data.current!.itemIndex,
      overItemIndex: e.over.data.current!.itemIndex,
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeData &&
          (activeData.isList ? (
            <ListItem
              presentational
              listIndex={activeData.listIndex}
              itemIndex={activeData.itemIndex}
              item={activeData.item}
            />
          ) : null)}
      </DragOverlay>
    </DndContext>
  );
}

export default DndProvider;
