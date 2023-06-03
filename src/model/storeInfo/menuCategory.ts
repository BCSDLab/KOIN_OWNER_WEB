import z from 'zod';

export const MenuBase = z.object({
  id: z.number(),
  name: z.string(),
  image_urls: z.array(z.string()),
  is_hidden: z.boolean(),
  is_single: z.boolean(),
  is_signature: z.boolean(),
  description: z.string().nullable(),
});

export type MenuBase = z.infer<typeof MenuBase>;

export const SinglePriceMenu = MenuBase.extend({
  sigle_price: z.number(),
  option_price: z.null(),
});

export type SinglePriceMenu = z.infer<typeof SinglePriceMenu>;

export const MultiPriceMenu = MenuBase.extend({
  sigle_price: z.null(),
  option_price: z.array(
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

export const MenuCategories = z.object({
  count: z.number(),
  menu_categorie: z.array(MenuCategory),
});

export type MenuCategories = z.infer<typeof MenuCategories>;
