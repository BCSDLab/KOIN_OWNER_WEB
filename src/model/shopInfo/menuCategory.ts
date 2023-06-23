import z from 'zod';

export const MenuBase = z.object({
  id: z.number(),
  name: z.string(),
  image_urls: z.array(z.string()),
  is_hidden: z.boolean(),
  is_single: z.boolean(),
  description: z.string().nullable(),
});

export type MenuBase = z.infer<typeof MenuBase>;

export const SinglePriceMenu = MenuBase.extend({
  single_price: z.number(),
  option_prices: z.null(),
});

export type SinglePriceMenu = z.infer<typeof SinglePriceMenu>;

export const MultiPriceMenu = MenuBase.extend({
  single_price: z.null(),
  option_prices: z.array(
    z.object({
      option: z.string(),
      price: z.number(),
    }),
  ),
});

export type MultiPriceMenu = z.infer<typeof MultiPriceMenu>;

export const Menu = z.union([SinglePriceMenu, MultiPriceMenu]);

export type Menu = z.infer<typeof Menu>;

export const MenuCategory = z.object({
  id: z.number(),
  name: z.string(),
  menus: z.array(Menu),
});

export type MenuCategory = z.infer<typeof MenuCategory>;

export const MenuInfoRes = z.object({
  count: z.number(),
  menu_categories: z.array(MenuCategory),
});

export type MenuInfoRes = z.infer<typeof MenuInfoRes>;