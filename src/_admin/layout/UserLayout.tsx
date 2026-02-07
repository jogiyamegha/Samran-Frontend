import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/modules/auth/core/Auth';
import { WithChildren } from '../helpers';

const UserLayout: React.FC<WithChildren> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userRole = currentUser?.userType === 2 ? 'Investor' : 'Consumer';
  const userName = currentUser?.name || 'User';

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  // Navigation items based on user type
  const navItems = currentUser?.userType === 2
    ? [ // Investor navigation
      { path: '/investor/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
      { path: '/investor/investments', label: 'My Investments', icon: 'fas fa-chart-line' },
      { path: '/investor/returns', label: 'Returns', icon: 'fas fa-money-bill-wave' },
      { path: '/investor/profile', label: 'Profile', icon: 'fas fa-user' },
    ]
    : [ // Consumer navigation
      { path: '/consumer/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
      { path: '/consumer/plants', label: 'My Plants', icon: 'fas fa-solar-panel' },
      { path: '/consumer/bills', label: 'Bills', icon: 'fas fa-file-invoice-dollar' },
      { path: '/consumer/profile', label: 'Profile', icon: 'fas fa-user' },
    ];

  const profilePath = currentUser?.userType === 2 ? '/investor/profile' : '/consumer/profile';

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            Solar Energy Platform
          </Link>

          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user me-1"></i>
                {userName}
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li><Link className="dropdown-item" to={profilePath}>Profile Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Sign Out</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <div className={`bg-light border-end ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} style={{ width: '250px' }}>
          <div className="list-group list-group-flush mt-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`list-group-item list-group-item-action py-3 border-0 rounded-0 ${isActive(item.path) ? 'active bg-primary text-white' : ''
                  }`}
              >
                <i className={`${item.icon} me-3 w-20px text-center`}></i>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4 bg-white">
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-4 border-top">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <span className="text-muted">© {new Date().getFullYear()} Solar Energy Management System</span>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <Link to="/home/about" className="text-muted text-decoration-none mx-2 hover-primary">About</Link>
              <Link to="/home/contact" className="text-muted text-decoration-none mx-2 hover-primary">Contact</Link>
              <Link to="/home/privacy-policy" className="text-muted text-decoration-none mx-2 hover-primary">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { UserLayout };