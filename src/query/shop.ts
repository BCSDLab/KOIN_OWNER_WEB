import { useQuery } from '@tanstack/react-query';
import { getMyStore } from 'api/store';
import useAuthStore from 'store/auth';

const useMyStore = () => {
  const { data } = useQuery(['myStore'], getMyStore, {
    enabled: !!useAuthStore.getState().user?.shops,
  });
  return {
    data,
  };
};

export default useMyStore;
// import {MyShopList, MyStoreInfoRes} from 'model/storeInfo/myStoreInfo';
