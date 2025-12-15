import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useContext,
} from "react";

import clsx from "clsx";

import BoardContext from "../../context/board-context.ts";
import Button from "../Button/Button.tsx";
import Modal from "../Modal/Modal.tsx";
import TextInput from "../TextInput/TextInput.tsx";

import styles from "./CreateListItemModal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "children"> & {
  listId: string;
};

function CreateListItemModal({
  ref,
  heading,
  className,
  contentClassName,
  listId,
  ...otherProps
}: Props): ReactNode {
  const { create } = useContext(BoardContext);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const id = self.crypto.randomUUID();

    create(listId, { id, title });
  };

  return (
    <Modal
      contentClassName={clsx(
        styles["create-list-item-modal"],
        contentClassName,
      )}
      ref={ref}
      heading={"Create a New Item"}
      {...otherProps}
    >
      <form onSubmit={handleFormSubmit}>
        <TextInput label={"Title"} type={"text"} name={"title"} />
        <div className={styles.actions}>
          <Button color={"primary"}>Submit</Button>
          <Button type={"button"}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateListItemModal;
