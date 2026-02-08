import { type ComponentProps, type ReactNode, useContext } from "react";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TextArea from "../../components/TextArea/TextArea.tsx";
import TextInput from "../../components/TextInput/TextInput.tsx";
import BoardContext from "../../context/list-context.ts";
import { ListItemSchema } from "../../schemas/list-item-schema.ts";
import FormModal from "../FormModal/FormModal.tsx";

type Values = z.infer<typeof ListItemSchema>;
type Props = Pick<ComponentProps<typeof FormModal>, "modalRef"> & {
  listIndex: number;
  itemIndex?: number;
  defaultValues?: Values;
};

function ListItemModal({
  modalRef,
  listIndex,
  itemIndex,
  defaultValues,
}: Props): ReactNode {
  const { dispatchLists } = useContext(BoardContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(ListItemSchema),
  });

  const handleRemoveButtonClick = (): void => {
    if (itemIndex === undefined) {
      return;
    }

    dispatchLists({ type: "item_removed", listIndex, itemIndex });
    toast.success("Item removed successfully.");
    modalRef.current?.close();
  };

  const handleFormSubmit = (values: Values): void => {
    if (itemIndex !== undefined) {
      dispatchLists({
        type: "item_edited",
        listIndex,
        itemIndex,
        item: values,
      });
      toast.success("Item created successfully.");
    } else {
      const id = globalThis.crypto.randomUUID();
      dispatchLists({
        type: "item_created",
        listIndex,
        item: { id, ...values },
      });
      toast.success("Item created successfully.");
    }

    modalRef.current?.close();
  };

  return (
    <FormModal
      modalRef={modalRef}
      heading={
        itemIndex === undefined ? "Create a New Item" : "Edit Exising Item"
      }
      onSubmit={handleSubmit(handleFormSubmit)}
      onRemove={itemIndex !== undefined && handleRemoveButtonClick}
    >
      <TextInput
        {...register("title")}
        label="Title"
        type="text"
        error={errors.title?.message}
      />
      <TextArea {...register("description")} label="Description" />
      <TextInput
        {...register("dueDate")}
        label="Due Date"
        type="date"
        error={errors.dueDate?.message}
      />
    </FormModal>
  );
}

export default ListItemModal;
