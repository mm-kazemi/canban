import {
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useContext,
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
  const { dispatchLists } = useContext(BoardContext);
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value.trim().length > 0) {
      setTitleError(null);
    } else if (value.length > 0) {
      setTitleError("Title cannot be only spaces");
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const id = self.crypto.randomUUID();

    if (!validateTitle(title)) {
      return;
    }

    dispatchLists({
      type: "create",
      listId,
      item: { id, title: title.trim() },
    });
    toast.success("Item successfully created.");
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle("");
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
      onClose={resetAndClose}
      {...otherProps}
    >
      <form onSubmit={handleFormSubmit}>
        <TextInput
          label={"Title"}
          type={"text"}
          name={"title"}
          value={title}
          onChange={handleTitleChange}
          error={titleError}
        />
        <div className={styles.actions}>
          <Button type={"reset"} onClick={resetAndClose}>
            Cancel
          </Button>
          <Button color={"primary"} disabled={title.trim().length === 0}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateListItemModal;
