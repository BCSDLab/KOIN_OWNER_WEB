import z from 'zod';

export const MyShop = z.object({
  id: z.number(),
  name: z.string(),
});

export type MyShop = z.infer<typeof MyShop>;

export const MyShopListRes = z.object({
  count: z.number(),
  shops: z.array(MyShop),
});

export type MyShopListRes = z.infer<typeof MyShopListRes>;

export const OpenInfo = z.object({
  day_of_week: z.string(),
  closed: z.boolean(),
  open_time: z.string().nullable(),
  close_time: z.string().nullable(),
});

export type OpenInfo = z.infer<typeof OpenInfo>;

export const ShopCategory = z.object({
  id: z.number(),
  name: z.string(),
});

export type ShopCategory = z.infer<typeof ShopCategory>;

export const MenuCategory = z.object({
  id: z.number(),
  name: z.string(),
});

export type MenuCategory = z.infer<typeof MenuCategory>;

export const MyShopInfoRes = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  description: z.string(),
  delivery: z.boolean(),
  delivery_price: z.number(),
  pay_card: z.boolean(),
  pay_bank: z.boolean(),
  open: z.array(OpenInfo),
  image_urls: z.array(z.string()),
  shop_categories: z.array(ShopCategory),
  menu_categories: z.array(MenuCategory),
});

export type MyShopInfoRes = z.infer<typeof MyShopInfoRes>;

export interface MyShopParam {
  id: number;
}
