// import { accessClient, client } from 'api';
import MENU_CATEGORYS, { MenuCategories } from 'model/storeInfo/menuCategory';

export const mockupMenuCategories = (id:number) => new Promise((res) => {
  setTimeout(() => res(MENU_CATEGORYS), 1000 + id);
});

export const getMenuCategories = async (id:number) => {
  const data = await mockupMenuCategories(id);
  return MenuCategories.parse(data);
};

// api를 호출하는 함수를 만들어라
// api를 호출하는 함수를 만들어라 => 비동기적인 함수 => promise를 리턴하는 함수 => async await를 사용할 수 있다.
// mockup을 만들어 가상의 api를 호출

// 목업을 만들어라 => 비동기적인 함수 => promise를 리턴하는 함수 => async await를 사용할 수 있다.

//
