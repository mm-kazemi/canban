import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useContext,
  useState,
} from "react";

import { toast } from "react-toastify";

import { z } from "zod";

import Button from "../../components/Button/Button.tsx";
import TextInput from "../../components/TextInput/TextInput.tsx";
import BoardContext from "../../context/list-context.ts";
import { ListSchema } from "../../schemas/list-shema.ts";
import type { ListType } from "../../types/list.ts";
import FormModal from "../FormModal/FormModal.tsx";

type Values = Omit<ListType, "id" | "items">;

type Errors = { [key in keyof Values]?: string[] };

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex?: number;
  defaultValues?: Partial<Values>;
};

function ListModal({ modalRef, listIndex, defaultValues }: Props): ReactNode {
  const { dispatchLists } = useContext(BoardContext);

  const [errors, setErrors] = useState<Errors>({});

  const handleRemoveClick = (): void => {
    if (listIndex === undefined) {
      return;
    }

    dispatchLists({ type: "list_removed", listIndex });
    toast.success("List removed successfully.");
    modalRef.current?.close();
  };

  const handleFormReset = (): void => {
    setErrors({});
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Values = {
      title: formData.get("title") as string,
    };

    const { error, data } = ListSchema.safeParse(values);

    if (error) {
      setErrors(z.flattenError(error).fieldErrors);
      return;
    }
    if (listIndex !== undefined) {
      dispatchLists({
        type: "list_edited",
        listIndex,
        list: data,
      });
      toast.success("List edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "list_created",
        list: { id, items: [], ...data },
      });
      toast.success("List created successfully.");
    }

    modalRef.current?.close();
  };

  return (
    <FormModal
      modalRef={modalRef}
      heading={
        listIndex !== undefined ? "Edit Existing List" : "Create a New List"
      }
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
      extraActions={
        listIndex !== undefined && (
          <Button
            type={"button"}
            variant={"text"}
            color={"danger"}
            onClick={handleRemoveClick}
          >
            Remove
          </Button>
        )
      }
    >
      <TextInput
        label="Title"
        type="text"
        name="title"
        defaultValue={defaultValues?.title}
        error={errors.title?.[0]}
      />
    </FormModal>
  );
}

export default ListModal;
