import {
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

import clsx from "clsx";

import MingcuteCloseLine from "../../icons/MingcuteCloseLine.tsx";
import IconButton from "../IconButton/IconButton.tsx";

import styles from "./Modal.module.css";

type Props = ComponentProps<"dialog"> & {
  ref: RefObject<HTMLDialogElement | null>;
  contentClassName?: string;
  heading: string;
};

function Modal({
  ref,
  className,
  heading,
  children,
  contentClassName,
  ...otherProps
}: Props): ReactNode {
  const closeModalHandleClick = (): void => {
    ref.current?.close();
  };

  const handleDialogClick = (e: MouseEvent<HTMLDialogElement>): void => {
    console.log("target", e.target);
    console.log("current target", e.currentTarget);
    if (e.target === e.currentTarget) {
      ref.current?.close();
    }
  };

  return (
    <dialog
      onClick={handleDialogClick}
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
      <main className={contentClassName}>{children}</main>
    </dialog>
  );
}

export default Modal;
