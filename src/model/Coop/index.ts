import z from 'zod';

export type Menus = '아침' | '점심' | '저녁';

export const Dinings = z.object({
  date: z.string(),
  id: z.number(),
  kcal: z.number(),
  menu: z.array(z.string()),
  place: z.string(),
  price_card: z.number(),
  price_cash: z.number(),
  type: z.string(),
  updated_at: z.string(),
});

export type Dinings = z.infer<typeof Dinings>;
