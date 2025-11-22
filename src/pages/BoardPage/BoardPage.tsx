import { type ReactNode } from "react";

import { useParams } from "react-router";

function BoardPage(): ReactNode {
  const { id } = useParams();

  return <div>Board Page {id}</div>;
}

export default BoardPage;
