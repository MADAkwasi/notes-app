import z from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    content: z.string().min(5),
    tags: z.array(z.string()),
  }),
});

export const noteParamSchema = z.object({
  params: z.object({
    noteId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid note ID"),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    content: z.string().min(5),
    tags: z.array(z.string()),
  }),
});
