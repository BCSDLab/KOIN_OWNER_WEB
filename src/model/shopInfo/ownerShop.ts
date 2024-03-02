import z from 'zod';
import { Shop } from './allShopInfo';

export const OwnerShop = Shop.omit({ id: true }).extend({
  address: z.string(),
  description: z.string(),
  delivery_price: z.number(),
  image_urls: z.array(z.string()),
});

export type OwnerShop = z.infer<typeof OwnerShop>;
