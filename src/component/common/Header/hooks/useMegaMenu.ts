import { useState } from 'react';
import { Category, SubMenu } from 'static/category';

const useMegaMenu = (category: Category[]) => {
  const [panelMenuList, setPanelMenuList] = useState<SubMenu[] | null>();
  const [isExpanded, setIsExpanded] = useState(false);

  const createOnChangeMenu = (title: string) => () => {
    const selectedSubMenu = category
      .find((categoryInfo) => categoryInfo.title === title)?.submenu ?? null;
    setPanelMenuList(selectedSubMenu);
    setIsExpanded(true);
  };
  const onFocusPanel = () => {
    setIsExpanded(true);
  };
  const hideMegaMenu = (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
  ) => {
    if (event.type === 'mouseout') {
      const { currentTarget } = event;
      currentTarget.blur();
    }
    setIsExpanded(false);
  };

  return {
    panelMenuList,
    isExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  };
};

export default useMegaMenu;
