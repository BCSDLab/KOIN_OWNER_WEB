import { useRef, useState } from 'react';

export default function useSearchShopName(shops :Array<{
  name:string, tel: string, card:boolean, deliver:boolean, account:boolean
}>) {
  const [fillteredShops, setShops] = useState(shops);
  const searchInput = useRef<HTMLInputElement>(null);

  const onClickSearchButton = (event:React.FormEvent) => {
    event.preventDefault();
    if (searchInput.current!.value !== '') {
      setShops(shops.filter((
        shop,
      ) => shop.name.includes(searchInput.current!.value)));
    } else {
      setShops(shops);
    }
  };

  const onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearchButton(e);
    }
  };

  return {
    searchInput, onClickSearchButton, fillteredShops, onKeyPress,
  };
}
