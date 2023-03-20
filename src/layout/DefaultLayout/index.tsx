import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <>
      <div> DefaultLayout test </div>
      <Outlet />
    </>
  );
}
