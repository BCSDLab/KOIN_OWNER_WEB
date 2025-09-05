import { z } from 'zod';

export const AddressParams = z.object({
  keyword: z.string(),
  currentPage: z.string().default('1'),
  countPerPage: z.string().default('10'),
});

export type AddressParams = z.infer<typeof AddressParams>;

export const Juso = z.object({
  bd_nm: z.string(),
  emd_nm: z.string(),
  eng_address: z.string(),
  jibun_address: z.string(),
  li_nm: z.string(),
  rn: z.string(),
  road_address: z.string(),
  sgg_nm: z.string(),
  si_nm: z.string(),
  zip_no: z.string(),
});

export type Juso = z.infer<typeof Juso>;

export const AddressSearchResponse = z.object({
  addresses: z.array(Juso),
  count_per_page: z.number(),
  current_page: z.number(),
  total_count: z.string(),
});

export type AddressSearchResponse = z.infer<typeof AddressSearchResponse>;
