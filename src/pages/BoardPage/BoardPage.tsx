import { type ReactNode } from "react";

import BoardList from "../../components/BoardList/BoardList.tsx";
import KanbanHeader from "../../components/KanbanHeader/KanbanHeader.tsx";

function BoardPage(): ReactNode {
  return (
    <div>
      <KanbanHeader />
      <div className="list">
        <BoardList />

      </div>
    </div>
  );
}

export default BoardPage;
