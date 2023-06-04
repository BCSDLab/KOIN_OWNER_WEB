/* eslint-disable jsx-a11y/label-has-associated-control */
import PreviousStep from 'component/common/Auth/PreviousStep';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import ProgressBar from 'component/common/Auth/ProgressBar';
import { ReactComponent as EmptyImgIcon } from 'assets/svg/storereg/mobile-empty-img.svg';
import Complete from 'component/common/Auth/Complete';
import SubTitle from 'component/common/Auth/SubTitle';
import useStepStore from 'store/useStepStore';
import { Link } from 'react-router-dom';
import STORE_CATEGORY from 'static/storeCategory';
import cn from 'utils/ts/className';
import { useState } from 'react';
import styles from './StoreReg.module.scss';
import PROGRESS_TITLE from './constant/progress';

const TOTAL_STEP = 4;
export default function StoreReg() {
  const { isMobile } = useMediaQuery();
  const [isSelected, setIsSelected] = useState('');
  const { step, setStep, clickBackArrow } = useStepStore();
  return (
    <div>
      {isMobile ? (
        <>
          <PreviousStep step={step} clickBackArrow={clickBackArrow} />
          <div className={styles.content}>
            {step === 0 && (
              <>
                <SubTitle topTitle="가게 등록" bottomTitle="" topText="등록 하시려는 업체의" bottomText="메인 정보를 입력해 주세요." />
                <ProgressBar step={step} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
                <div className={styles['mobile-category']}>
                  <div className={styles['mobile-category__title']}>카테고리를 골라주세요.</div>
                  <div className={styles['mobile-category__wrapper']}>
                    {STORE_CATEGORY.map((value) => (
                      <button
                        className={cn({
                          [styles['mobile-category__menu']]: true,
                          [styles['mobile-category__menu--selected']]: value.title === isSelected,
                        })}
                        type="button"
                        onClick={() => setIsSelected(value.title)}
                        key={value.tag}
                      >
                        <img className={styles['mobile-category__image']} src={value.image} alt="category_img" />
                        <span className={styles['mobile-category__type']}>{value.title}</span>
                      </button>
                    ))}
                  </div>
                  <div className={styles['mobile-category__button']}>
                    <button type="button" onClick={() => setStep(step + 1)}>다음</button>
                  </div>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <SubTitle topTitle="가게 등록" bottomTitle="" topText="등록 하시려는 업체의" bottomText="메인 정보를 입력해 주세요." />
                <ProgressBar step={step} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
                <div className={styles.form}>
                  <div className={styles.form__img}>
                    <EmptyImgIcon />
                    <div>등록된 이미지가 없습니다.</div>
                  </div>
                  <label htmlFor="name" className={styles.form__label}>
                    가게명
                    <input type="text" id="name" className={styles.form__input} />
                  </label>
                  <label htmlFor="address" className={styles.form__label}>
                    주소정보
                    <input type="text" id="address" className={styles.form__input} />
                  </label>
                  <div className={styles.form__button}>
                    <button type="button" onClick={() => setStep(step + 1)}>다음</button>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <SubTitle topTitle="가게 등록" bottomTitle="" topText="등록 하시려는 업체의" bottomText="세부 정보를 입력해 주세요." />
                <ProgressBar step={step} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
                <div className={styles.form}>
                  <label htmlFor="phone" className={styles.form__label}>
                    전화번호
                    <input type="text" id="phone" className={styles.form__input} />
                  </label>
                  <label htmlFor="delivery-cost" className={styles.form__label}>
                    배달금액
                    <input type="text" id="delivery-cost" className={styles.form__input} />
                  </label>
                  <label className={styles.form__label}>
                    운영시간
                    <span>00:00~24:00</span>
                    <Link
                      to="/operate-time"
                      className={styles['form__label-link']}
                    >
                      수정
                    </Link>
                  </label>
                  <label htmlFor="extra-info" className={styles.form__label}>
                    기타정보
                    <input type="text" id="extra-info" className={styles.form__input} />
                  </label>
                  <div className={styles.form__checkbox}>
                    <label htmlFor="delivery" className={styles['form__checkbox-label']}>
                      <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} />
                      <span>배달 가능</span>
                    </label>
                    <label htmlFor="card" className={styles['form__checkbox-label']}>
                      <input type="checkbox" id="card" className={styles['form__checkbox-input']} />
                      <span>카드 가능</span>
                    </label>
                    <label htmlFor="bank" className={styles['form__checkbox-label']}>
                      <input type="checkbox" id="bank" className={styles['form__checkbox-input']} />
                      <span>계좌이체 가능</span>
                    </label>
                  </div>
                  <div className={styles.form__button}>
                    <button type="button" onClick={() => setStep(step + 1)}>다음</button>
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <SubTitle topTitle="가게 등록" bottomTitle="" topText="입력하신 정보가 맞습니까?" bottomText="" />
                <ProgressBar step={step} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
                <div className={styles.form}>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>카테고리</span>
                    <span className={styles.form__value}>족발</span>
                  </div>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>가게명</span>
                    <span className={styles.form__value}>가장 맛있는 족발</span>
                  </div>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>주소정보</span>
                    <span className={styles.form__value}>천안시 동남구 충절로 880 가동 1층</span>
                  </div>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>전화번호</span>
                    <span className={styles.form__value}>010-1234-5678</span>
                  </div>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>배달금액</span>
                    <span className={styles.form__value}>무료</span>
                  </div>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>운영시간</span>
                    <span className={styles.form__value}>
                      11:00~21:00
                      <br />
                      매주 화요일 정기 휴무
                    </span>
                  </div>
                  <div className={styles.form__info}>
                    <span className={styles.form__title}>기타정보</span>
                    <span className={styles.form__value}>3대째 다져온 고집스러운 맛</span>
                  </div>
                  <div className={styles.form__checkbox}>
                    <label htmlFor="delivery" className={styles['form__checkbox-label']}>
                      <input type="checkbox" id="delivery" className={styles['form__checkbox-input']} />
                      <span>배달 가능</span>
                    </label>
                    <label htmlFor="card" className={styles['form__checkbox-label']}>
                      <input type="checkbox" id="card" className={styles['form__checkbox-input']} />
                      <span>카드 가능</span>
                    </label>
                    <label htmlFor="bank" className={styles['form__checkbox-label']}>
                      <input type="checkbox" id="bank" className={styles['form__checkbox-input']} />
                      <span>계좌이체 가능</span>
                    </label>
                  </div>
                </div>
                <div className={styles.form__button}>
                  <button type="button" onClick={() => setStep(step + 1)}>등록</button>
                </div>
              </>
            )}
            {step > 3 && (
              <Complete title="가게 등록 완료" textTop="가게 등록이 완료되었습니다." textBottom="업체 정보 수정은 내 상점에서 가능합니다." link="/" buttonText="메인 화면 바로가기" />
            )}
          </div>
        </>
      ) : (<div>Desktop</div>)}
    </div>
  );
}
