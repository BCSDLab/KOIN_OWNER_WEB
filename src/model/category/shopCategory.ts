import { z } from 'zod';

export const Category = z.object({
  id: z.number(),
  name: z.string(),
  image_url: z.string().url(),
});

export type Category = z.infer<typeof Category>;

const TotalCount = z.object({
  total_count: z.number(),
});

export type TotalCount = z.infer<typeof TotalCount>;

export const ShopCategory = TotalCount.extend({
  shop_categories: z.array(Category),
});

export type ShopCategory = z.infer<typeof ShopCategory>;
