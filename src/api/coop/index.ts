import { accessClient } from 'api';

export const getDining = async () => {
  const { data } = await accessClient.get('/dinings');
  return data;
};
