import { z } from "zod";

export const acountSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: "Account name required!" }),
  type: z.string().min(3, { message: "Type required!" }),
});

export type accountSchemaType = z.infer<typeof acountSchema>;
