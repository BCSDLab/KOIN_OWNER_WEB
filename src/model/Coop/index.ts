import z from 'zod';

export type Menus = '아침' | '점심' | '저녁';

export type DiningTypes = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export type Corner = 'A코너' | 'B코너' | 'C코너';

export const DINING_TYPES: Record<Menus, DiningTypes> = {
  아침: 'BREAKFAST',
  점심: 'LUNCH',
  저녁: 'DINNER',
};

export const Dinings = z.object({
  date: z.string(),
  id: z.number(),
  kcal: z.number(),
  menu: z.array(z.string()),
  place: z.string(),
  price_card: z.number(),
  price_cash: z.number(),
  type: z.string(),
  image_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  soldout_at: z.string(),
  changed_at: z.string(),
});

export const CoopResponse = z.object({
  email: z.string(),
  gender: z.number().nullable(),
  name: z.string(),
  phone_number: z.string(),
  user_type: z.string(),
});

export type CoopResponse = z.infer<typeof CoopResponse>;

export type Dinings = z.infer<typeof Dinings>;

export const DiningImages = z.object({
  menu_id: z.number(),
  image_url: z.string(),
});

export type DiningImages = z.infer<typeof DiningImages>;

export const SoldOut = z.object({
  menu_id: z.number(),
  sold_out: z.boolean(),
});

export type SoldOut = z.infer<typeof SoldOut>;
