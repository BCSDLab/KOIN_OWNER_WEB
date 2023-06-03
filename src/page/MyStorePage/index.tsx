import useMyStore from 'query/shop';
// import useMyStoreInfo from 'query/shopInfo';
import React from 'react';
import useAuthStore from 'store/auth';
import styles from './MyStorePage.module.scss';

export default function MyStorePage() {
  console.log(useAuthStore((state) => state.user));
  const MyStoreTest = useMyStore();
  const shopId = MyStoreTest.data?.shops[0].id;
  console.log('shopId: ', shopId);

  // let MyStoreInfo = null;
  // if (typeof shopId === 'number') {
  //   MyStoreInfo = useMyStoreInfo(shopId);
  // }
  // console.log('MyStoreInfo: ', MyStoreInfo);

  // const MyStoreInfo = useConditionalMyStoreInfo(shopId);
  // console.log('MyStoreInfo: ', MyStoreInfo);

  // const MyStoreInfo = useMyStoreInfo(testId);
  // console.log('MyStoreInfo: ', MyStoreInfo);
  // testId가 num일때만 api를 호출할 수 있어야해
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>가게정보</h1>
        <button type="button" className={styles['header__btn-update']}>메뉴수정</button>
        <button
          type="button"
          className={styles['header__btn-add']}
        >
          메뉴추가
        </button>
      </div>
      {/* <StoreInfo storeInfo={} />
      {MENU_CATEGORYS.map((category) => (
        <CatagoryMenuList
          menus={category.menus}
          name={category.name}
        />
      ))} */}
    </div>
  );
  // function useConditionalMyStoreInfo(testId: number | undefined) {
  //   if (typeof testId === 'number') {
  //     return useMyStoreInfo(testId);
  //   }
  //   return null;
  // }
}
