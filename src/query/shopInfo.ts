import { useQuery } from '@tanstack/react-query';
import { getMyStoreInfo } from 'api/store';
import { MyStoreParam } from 'model/storeInfo/myStoreInfo';

const useMyStoreInfo = (id:number) => {
  const { data } = useQuery(['myStoreInfo', id], () => getMyStoreInfo(id as unknown as MyStoreParam));
  return {
    data,
  };
};

export default useMyStoreInfo;
