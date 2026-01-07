/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import ChangePasswordModal from '../../../../app/modals/ChangePasswordModal';
import LogoutModal from '../../../../app/modals/LogoutModal';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleShowChangePassword = () => setShowChangePasswordModal(true);
  const handleHideChangePassword = () => setShowChangePasswordModal(false);

  return (
    <>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-900 menu-state-bg menu-state-primary fw-500  fs-16 w-200px py-2"
        data-kt-menu="true"
      >
        <div className="menu-item">
          <a
            className="menu-link bg-white text-black"
            onClick={handleShowChangePassword}
          >
            Change password
          </a>
          <hr className="text-gray-500" />
          <a
            className="menu-link bg-white text-danger"
            onClick={handleLogoutClick}
          >
            Logout
          </a>
        </div>
      </div>

      <ChangePasswordModal
        show={showChangePasswordModal}
        onHide={handleHideChangePassword}
      />

      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export { HeaderUserMenu };
