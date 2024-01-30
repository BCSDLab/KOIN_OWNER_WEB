import z from 'zod';

export const MonoMenuBase = z.object({
  id: z.number(),
  name: z.string(),
  image_urls: z.array(z.string()),
  is_hidden: z.boolean(),
  is_single: z.boolean(),
  description: z.string().nullable(),
  category_ids: z.array(z.number()),
});

export type MonoMenuBase = z.infer<typeof MonoMenuBase>;

const MenuBase = MonoMenuBase.omit({ category_ids: true });

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

export const SinglePriceMonoMenu = MonoMenuBase.extend({
  single_price: z.number(),
  option_prices: z.null(),
});

export type SinglePriceMonoMenu = z.infer<typeof SinglePriceMonoMenu>;

export const MultiPriceMonoMenu = MonoMenuBase.extend({
  single_price: z.null(),
  option_prices: z.array(
    z.object({
      option: z.string(),
      price: z.number(),
    }),
  ),
});

export type MultiPriceMonoMenu = z.infer<typeof MultiPriceMonoMenu>;

export const Menu = z.union([SinglePriceMenu, MultiPriceMenu]);

export type Menu = z.infer<typeof Menu>;

export const MonoMenu = z.union([SinglePriceMonoMenu, MultiPriceMonoMenu]);

export type MonoMenu = z.infer<typeof MonoMenu>;

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
