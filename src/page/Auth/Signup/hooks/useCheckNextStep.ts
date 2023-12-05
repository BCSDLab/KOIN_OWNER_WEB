import { useState } from 'react';
import { User, UserParam } from 'page/Auth/Signup/types/User';
import { Owner, OwnerParam } from 'page/Auth/Signup/types/Owner';

export default function useCheckNextStep() {
  const [isDone, setDone] = useState(false);

  const checkUserDataStep = (userData:User) => {
    if (UserParam.safeParse(userData).success) {
      setDone(true);
    }
  };

  const checkOwnerDataStep = (data:Owner) => {
    const ownerData = {
      ownerName: data.ownerName,
      shopName: data.shopName,
      phoneNumber: `${data.phoneFront}-${data.phoneMiddle}-${data.phoneEnd}`,
      registrationNumber: `${data.registrationNumberFront}-${data.registrationNumberMiddle}-${data.registrationNumberEnd}`,
      registerFiles: data.registerFiles ? Array.from(data.registerFiles) : null,
    };
    if (OwnerParam.safeParse(ownerData).success) {
      setDone(true);
    }
  };

  return { isDone, checkUserDataStep, checkOwnerDataStep };
}
