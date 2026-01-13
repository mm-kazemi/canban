import {
  type ComponentProps,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

import clsx from "clsx";

import IconButton from "../../components/IconButton/IconButton.tsx";
import MingcuteCloseLine from "../../icons/MingcuteCloseLine.tsx";

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
  onPointerDown,
  ...otherProps
}: Props): ReactNode {
  const closeModalHandleClick = (): void => {
    ref.current?.close();
  };

  const handleDialogClick = (e: PointerEvent<HTMLDialogElement>): void => {
    if (e.target === e.currentTarget) {
      ref.current?.close();
    } else {
      onPointerDown?.(e);
    }
  };

  return (
    <dialog
      onPointerDown={handleDialogClick}
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
