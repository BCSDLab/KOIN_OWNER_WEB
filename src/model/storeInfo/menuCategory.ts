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

const MENU_CATEGORYS: MenuCategories[] = [
  {
    count: 2,
    menu_categorie: [
      {
        id: 1,
        name: '이벤트메뉴',
        menus: [
          {
            id: 1724,
            name: '삼겹살',
            is_hidden: false,
            is_signature: false,
            is_single: false,
            sigle_price: null,
            option_price: [
              {
                option: '1인분',
                price: 13000,
              },
            ],
            description: null,
            image_urls: [],
          },
        ],
      },
      {
        id: 137,
        name: '대표메뉴',
        menus: [
          {
            id: 1824,
            name: '갈매기살',
            is_hidden: false,
            is_signature: false,
            is_single: false,
            sigle_price: null,
            option_price: [
              {
                option: '1인분',
                price: 15000,
              },
            ],
            description: null,
            image_urls: [],
          },
        ],
      },
    ],
  },
];

export default MENU_CATEGORYS as MenuCategories[];
