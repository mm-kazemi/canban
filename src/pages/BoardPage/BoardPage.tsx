import { type ReactNode, useRef } from "react";

import Button from "../../components/Button/Button.tsx";
import CreateListItemModal from "../../components/CreateListItemModal/CreateListItemModal.tsx";
import ActiveItemProvider from "../../providers/ActiveItemProvider.tsx";
import BoardProvider from "../../providers/BoardProvider.tsx";

import styles from "./BoardPage.module.css";

function BoardPage(): ReactNode {
  const useRefState = useRef<HTMLDialogElement>(null);

  const openModalHandleClick = (): void => {
    useRefState.current?.showModal();
  };

  return (
    <BoardProvider>
      <ActiveItemProvider>
        <div className={styles["board-page"]}>
          <Button
            variant="solid"
            color="primary"
            onClick={openModalHandleClick}
          >
            open modal
          </Button>
          <CreateListItemModal
            heading={"this is modal"}
            ref={useRefState}
            listId={"1"}
          />
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}

export default BoardPage;
