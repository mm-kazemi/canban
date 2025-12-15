import { type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";

import Button from "../Button/Button.tsx";
import Modal from "../Modal/Modal.tsx";
import TextInput from "../TextInput/TextInput.tsx";

import styles from "./CreateListItemModal.module.css";

type Props = Omit<ComponentProps<typeof Modal>, "children">;

function CreateListItemModal({
  ref,
  heading,
  className,
  contentClassName,
  ...otherProps
}: Props): ReactNode {
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
      <form>
        <TextInput label={"Title"} />
        <div className={styles.actions}>
          <Button color={"primary"}>Submit</Button>
          <Button type={"button"}>Cancel</Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateListItemModal;
