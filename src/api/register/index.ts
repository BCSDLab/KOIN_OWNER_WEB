import { client } from 'api';

const getEmailDuplicate = async (param: string) => {
  const { status } = await client.get(`/user/check/email?address=${param}`);
  return status;
};

export default getEmailDuplicate;
