import { type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";

import styles from "./TextInput.module.css";

type Props = ComponentProps<"input"> & {
  label: string;
  error?: string | null;
};

function TextInput({
  className,
  label,
  error,
  ...otherProps
}: Props): ReactNode {
  return (
    <div
      className={clsx(styles["text-input"], !!error && styles.error, className)}
    >
      <label htmlFor="xyz">{label}</label>
      <input id="xyz" {...otherProps} />
      <span className={styles.error}>{error}</span>
    </div>
  );
}

export default TextInput;
