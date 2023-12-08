import { z } from 'zod';

export type Owner = {
  ownerName?:string,
  shopName?:string,
  registrationNumberFront?:string,
  registrationNumberMiddle?:string,
  registrationNumberEnd?:string,
  registrationNumberMobile?:string,
  phoneFront?:string,
  phoneMiddle?:string,
  phoneEnd?:string,
  phoneMobile?:string,
  registerFiles?:File[] | null
};

const File = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

export const OwnerParam = z.object({
  phoneNumber: z.string(),
  ownerName: z.string(),
  shopName: z.string(),
  registrationNumber: z.string(),
  registerFiles: z.array(File),
});
