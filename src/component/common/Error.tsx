import React from 'react';

interface Props {
  message: string;
}

export default function Error(error: Props) {
  return (
    <div>
      {error?.message}
    </div>
  );
}
