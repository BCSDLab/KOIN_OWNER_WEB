import z from 'zod';

export const OptionPrice = z.object({
  option: z.string(),
  price: z.number(),
});
export type OptionPrice = z.infer<typeof OptionPrice>;

export const NewMenu = z.object({
  category_id: z.array(z.string()),
  description: z.string().nullable(),
  image_urls: z.array(z.string()),
  is_single: z.boolean(),
  name: z.string(),
  option_prices: z.array(OptionPrice.nullable()),
  single_price: z.number(),
});

export type NewMenu = z.infer<typeof NewMenu>;
