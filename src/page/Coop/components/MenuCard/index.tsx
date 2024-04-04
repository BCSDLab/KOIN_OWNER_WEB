import { useGetDining } from 'query/coop';
import { Dinings, Menus } from 'model/Coop';
import SoldoutToggle from 'page/Coop/components/SoldoutToggle';
import { ReactComponent as Photo } from 'assets/svg/coop/photo.svg';
import { useRef, useState } from 'react';
import styles from './MenuCard.module.scss';

interface MenuCardProps {
  selectedMenuType: Menus;
}

export default function MenuCard({ selectedMenuType }: MenuCardProps) {
  const { data } = useGetDining();
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: string }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleImageChange = (menuId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setSelectedImages((prevImages) => ({
          ...prevImages,
          [menuId]: e.target?.result as string,
        }));
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageClick = (menuId: number) => () => {
    fileInputRefs.current[menuId]?.click();
  };

  const getDiningType = (menuType: Menus) => {
    switch (menuType) {
      case '아침':
        return 'BREAKFAST';
      case '점심':
        return 'LUNCH';
      case '저녁':
        return 'DINNER';
      default:
        return '';
    }
  };

  const filteredData = data?.filter((menu:Dinings) => {
    const diningType = getDiningType(selectedMenuType);
    return menu.type === diningType && ['A코너', 'B코너', 'C코너'].includes(menu.place);
  });

  return (
    <div className={styles.container}>
      {filteredData?.map((menu: Dinings) => (
        <div key={menu.id} className={styles.card}>
          <div className={styles.card__header}>
            <span className={styles.card__title}>{menu.place}</span>
            <div className={styles['card__soldout-wrapper']}>
              <span className={styles.card__soldout}>품절</span>
              <SoldoutToggle />
            </div>
          </div>
          <div className={styles.card__wrapper}>
            <div
              className={styles.card__image}
              onClick={handleImageClick(menu.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleImageClick(menu.id)();
              }}
              role="button"
              tabIndex={0}
            >
              {selectedImages[menu.id] ? (
                <img src={selectedImages[menu.id]} alt="" className={styles.card__image} />
              ) : (
                <Photo />
              )}
            </div>
            <div className={styles.card__content}>
              {menu.menu.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange(menu.id)}
            ref={(el) => {
              fileInputRefs.current[menu.id] = el;
            }}
          />
        </div>
      ))}
    </div>
  );
}
