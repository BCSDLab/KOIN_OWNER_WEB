import { useState } from 'react';

export default function useModalOpen() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const clickModal = () => {
    setIsOpenModal(true);
    // console.log('열림');
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return { isOpenModal, clickModal, closeModal };
}
