import { type ReactNode, useRef } from "react";

import Button from "../../components/Button/Button.tsx";
import Modal from "../../components/Modal/Modal.tsx";
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
          <Modal heading={"this is modal"} ref={useRefState}>
            {" "}
            this is modal for children
          </Modal>
          {/*<Board />*/}
        </div>
      </ActiveItemProvider>
    </BoardProvider>
  );
}

export default BoardPage;
