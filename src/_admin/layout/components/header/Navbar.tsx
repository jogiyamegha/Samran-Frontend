import clsx from 'clsx';
import { HeaderUserMenu } from '../../../partials';
import { useAuth } from '../../../../app/modules/auth';
import Down from '../../../assets/media/svg/Down.svg';
const itemClass = 'ms-1 ms-lg-3';
const btnClass = 'btn btn-icon btn-custom btn-icon-muted';
const userAvatarClass =
  'symbol-30px symbol-md-30px symbol-lg-40px symbol-circle';
// const btnIconClass = 'svg-icon-1'
const Navbar = () => {
  // const { config } = useLayout()
  const { currentUser } = useAuth();
  return (
    <div className="app-navbar flex-shrink-0">
      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          className={btnClass}
        >
          <img className="img-fluid" src={NotificationSVG} alt="" />
        </div>
        <HeaderNotificationsMenu />
      </div> */}
      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <div className="d-flex align-items-center gap-2">
            <div className="symbol-label fs-14 fw-bold bg-light text-gray-700 fw-700">
              A
            </div>
            <span className="fs-16 fw-600">Admin</span>
            <img
              src={Down}
              alt="down"
              className="navbar-icon"
            />
          </div>
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  );
};
export { Navbar };
