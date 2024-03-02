import useAddMenuStore from 'store/addMenu';
import { useErrorMessageStore } from 'store/errorMessageStore';

const useFormValidation = () => {
  const { setMenuError, setCategoryError } = useErrorMessageStore();
  const { name, categoryIds } = useAddMenuStore();

  const validateFields = () => {
    let isValid = true;

    if (name.length === 0) {
      setMenuError('메뉴명을 입력해주세요.');
      isValid = false;
    } else {
      setMenuError('');
    }

    if (categoryIds.length === 0) {
      setCategoryError('카테고리를 1개 이상 선택해주세요.');
      isValid = false;
    } else {
      setCategoryError('');
    }

    return isValid;
  };

  return { validateFields };
};

export default useFormValidation;
