export const addressKeys = {
  all: ['address'] as const,
  search: (keyword: string) => [...addressKeys.all, 'search', keyword] as const,
};
