import { z } from "zod";

import { DescriptionSchema } from "./description-schema.ts";
import { TitleSchema } from "./title-schema.ts";

export const ListItemSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  dueDate: z.string(),
});
