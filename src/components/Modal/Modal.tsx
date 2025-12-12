import { type ComponentProps, type ReactNode, type RefObject } from "react";

import clsx from "clsx";

import MingcuteCloseLine from "../../icons/MingcuteCloseLine.tsx";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./Modal.module.css";

type Props = ComponentProps<"dialog"> & {
  ref: RefObject<HTMLDialogElement | null>;
  heading: string;
};

function Modal({
  ref,
  className,
  heading,
  children,
  ...otherProps
}: Props): ReactNode {
  const closeModalHandleClick = (): void => {
    ref.current?.close();
  };

  return (
    <>
      <dialog
        ref={ref}
        className={clsx(styles.modal, className)}
        {...otherProps}
      >
        <header>
          <div className={styles.heading}>{heading}</div>
          <div className={styles.actions}>
            <IconButton onClick={closeModalHandleClick}>
              <MingcuteCloseLine />
            </IconButton>
          </div>
        </header>
        <main>{children}</main>
      </dialog>
    </>
  );
}

export default Modal;
