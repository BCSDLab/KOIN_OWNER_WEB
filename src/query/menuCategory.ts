import { useQuery } from '@tanstack/react-query';
import { getMenuCategories } from 'api/store';

const useMenuCategories = (id:number) => {
  const { data } = useQuery(['menuCategory', id], () => getMenuCategories(id));
  return {
    data,
  };
};

export default useMenuCategories;
