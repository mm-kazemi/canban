import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

import { toast } from "react-toastify";

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
  const [titleError, setTitleError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const id = self.crypto.randomUUID();

    if (!validateTitle(title)) {
      return;
    }

    create(listId, { id, title: title.trim() });
    toast.success("Item successfully created.");
    ref.current?.close();
  };

  const handleModalClose = (): void => {
    setTitleError(null);
    formRef.current?.reset();
  };

  const handleCancelButtonClick = () => {
    setTitleError(null);
    ref.current?.close();
  };

  const validateTitle = (title: unknown): boolean => {
    if (typeof title !== "string") {
      setTitleError("Title is required");
      return false;
    }
    if (title.trim().length === 0) {
      setTitleError("Title cannot be empty");
      return false;
    }

    setTitleError(null);
    return true;
  };

  return (
    <Modal
      contentClassName={clsx(
        styles["create-list-item-modal"],
        contentClassName,
      )}
      ref={ref}
      heading={heading}
      onClose={handleModalClose}
      {...otherProps}
    >
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label={"Title"}
          type={"text"}
          name={"title"}
          error={titleError}
        />
        <div className={styles.actions}>
          <Button color={"primary"}>Submit</Button>
          <Button type={"reset"} onClick={handleCancelButtonClick}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateListItemModal;
