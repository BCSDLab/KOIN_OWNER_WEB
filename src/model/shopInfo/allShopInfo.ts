import z from 'zod';

const Open = z.object({
  day_of_week: z.string(),
  closed: z.boolean(),
  open_time: z.string().nullable(),
  close_time: z.string().nullable(),
});

export const Shop = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  delivery: z.boolean(),
  pay_bank: z.boolean(),
  pay_card: z.boolean(),
  open: z.array(Open),
  category_ids: z.array(z.number()),
});

export type Shop = z.infer<typeof Shop>;

export const AllShopList = z.object({
  count: z.number(),
  shops: z.array(Shop),
});

export type AllShopList = z.infer<typeof AllShopList>;
