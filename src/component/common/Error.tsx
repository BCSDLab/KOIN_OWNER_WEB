import React from 'react';

interface Props {
  message: string;
}

export default function Error(error: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        에러 발생:
        {error?.message}
      </div>
    </div>
  );
}
