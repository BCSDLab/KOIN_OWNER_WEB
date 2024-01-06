import { useRef, useState } from 'react';

export default function useSearchStoreName(stores :Array<{
  name:string, tel: string, card:boolean, deliver:boolean, account:boolean
}>) {
  const [fillteredStores, setStores] = useState(stores);
  const searchInput = useRef<HTMLInputElement>(null);

  const onClickSearchButton = (event:React.FormEvent) => {
    event.preventDefault();
    if (searchInput.current!.value !== '') {
      setStores(stores.filter((
        store,
      ) => store.name.includes(searchInput.current!.value)));
    } else {
      setStores(stores);
    }
  };

  const onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickSearchButton(e);
    }
  };

  return {
    searchInput, onClickSearchButton, fillteredStores, onKeyPress,
  };
}
