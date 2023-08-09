import { Outlet } from 'react-router-dom';

function LayoutBody(): JSX.Element {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default LayoutBody;
