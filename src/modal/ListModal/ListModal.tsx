import { type ComponentProps, type ReactNode, useContext } from "react";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../../components/Button/Button.tsx";
import TextInput from "../../components/TextInput/TextInput.tsx";
import BoardContext from "../../context/list-context.ts";
import { ListSchema } from "../../schemas/list-schema.ts";
import FormModal from "../FormModal/FormModal.tsx";

type Values = z.infer<typeof ListSchema>;

type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex?: number;
  defaultValues?: Values;
};

function ListModal({ modalRef, listIndex, defaultValues }: Props): ReactNode {
  const { dispatchLists } = useContext(BoardContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ListSchema),
  });

  const handleRemoveClick = (): void => {
    if (listIndex === undefined) {
      return;
    }

    dispatchLists({ type: "list_removed", listIndex });
    toast.success("List removed successfully.");
    modalRef.current?.close();
  };

  const handleFormSubmit = (values: Values): void => {
    if (listIndex !== undefined) {
      dispatchLists({
        type: "list_edited",
        listIndex,
        list: values,
      });
      toast.success("List edited successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "list_created",
        list: { id, items: [], ...values },
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
      onSubmit={handleSubmit(handleFormSubmit)}
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
        {...register("title", { required: true })}
        label="Title"
        type="text"
        error={errors.title?.message}
      />
    </FormModal>
  );
}

export default ListModal;
