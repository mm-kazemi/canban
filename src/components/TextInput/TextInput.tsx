import { type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";

import styles from "./TextInput.module.css";

type Props = ComponentProps<"input"> & {
  label: string;
};

function TextInput({ className, label, ...otherProps }: Props): ReactNode {
  return (
    <div className={clsx(styles["text-input"], className)}>
      <label htmlFor="xyz">{label}</label>
      <input id="xyz" {...otherProps} />
    </div>
  );
}

export default TextInput;
