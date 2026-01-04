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
  listIndex: number;
};

function CreateListItemModal({
  ref,
  heading,
  className,
  contentClassName,
  listIndex,
  ...otherProps
}: Props): ReactNode {
  const { dispatchLists } = useContext(BoardContext);
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);

  const normalizeTitle = (value: string): string =>
    value.trimStart().replace(/\s{2,}/g, " ");

  const validateTitle = (value: string): string | null => {
    if (!value.length) return "Title is required";
    if (!value.trim().length) return "Title cannot be only spaces";
    if (value.length > 50) return "Max 50 characters allowed";
    if (!/^[a-zA-Z0-9 ]*$/.test(value)) return "Invalid characters detected";

    return null;
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeTitle(e.target.value);
    setTitle(value);
    setTitleError(validateTitle(value));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const error = validateTitle(title);

    if (error) {
      setTitleError(error);
      return;
    }

    dispatchLists({
      type: "item_created",
      listIndex,
      item: {
        id: crypto.randomUUID(),
        title: title.trim(),
      },
    });

    toast.success("Item successfully created.");
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle("");
    setTitleError(null);
    ref.current?.close();
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
          <Button
            color={"primary"}
            type="submit"
            disabled={!!validateTitle(title)}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateListItemModal;
