import { z } from "zod";

import { ColorSchema } from "./color-schema.ts";
import { DescriptionSchema } from "./description-schema.ts";
import { TitleSchema } from "./title-schema.ts";

export const BoardSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  color: ColorSchema,
});
