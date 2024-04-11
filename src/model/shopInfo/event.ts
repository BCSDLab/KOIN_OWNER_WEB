import z from 'zod';

export const EventInfo = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail_images: z.array(z.string()),
  start_date: z.string(),
  end_date: z.string(),
});

export type EventInfo = z.infer<typeof EventInfo>;
