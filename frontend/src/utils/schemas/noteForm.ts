import z from "zod";

export const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Note Content must be 5+ characters"),
  tags: z.string().optional(),
});
