import { z } from "zod";

import { TitleSchema } from "./title-schema.ts";

export const ListSchema = z.object({
  title: TitleSchema,
});
