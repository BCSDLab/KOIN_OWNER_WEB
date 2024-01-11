import z from 'zod';

export const File = z.object({
  fileURL: z.string(),
});

export type File = z.infer<typeof File>;

export const Files = z.object({
  fileURLs: z.array(File),
});

export type Files = z.infer<typeof Files>;
