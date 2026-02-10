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
      { path: '/consumer/wallet', label: 'Wallet', icon: 'fas fa-wallet' },
      { path: '/consumer/profile', label: 'Profile', icon: 'fas fa-user' },
    ];

  const profilePath = currentUser?.userType === 2 ? '/investor/profile' : '/consumer/profile';

  return (
    <div className="d-flex flex-column min-vh-100 font-sans">
      {/* Top Navigation Bar - Dark Green Theme */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#052F2B' }}>
        <div className="container-fluid px-4">
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand font-weight-bold d-flex align-items-center" to="/">
            <i className="fas fa-solar-panel text-[#43EBA6] me-2" style={{ color: '#43EBA6' }}></i>
            <span className="text-white tracking-tight">Samran</span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center text-white/90 hover:text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="w-8 h-8 rounded-full bg-[#43EBA6]/20 flex items-center justify-center text-[#43EBA6] me-2 border border-[#43EBA6]/50">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <span className="font-medium">{userName}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-xl mt-2 overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-bottom">
                    <p className="mb-0 text-sm font-bold text-gray-800">{userName}</p>
                    <p className="mb-0 text-xs text-gray-500">{userRole}</p>
                  </div>
                  <li><Link className="dropdown-item py-2 px-4 hover:bg-gray-50" to={profilePath}><i className="fas fa-cog me-2 text-gray-400"></i> Profile Settings</Link></li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li><button className="dropdown-item py-2 px-4 text-danger hover:bg-red-50" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i> Sign Out</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <div
          className={`border-end bg-white shadow-sm ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`}
          style={{ width: '260px', transition: 'all 0.3s ease' }}
        >
          <div className="list-group list-group-flush py-4">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`list-group-item list-group-item-action py-3 px-4 border-0 d-flex align-items-center mb-1 mx-2 rounded-lg transition-all ${active
                    ? 'bg-[#ECFDF5] text-[#052F2B] font-bold border-l-4 border-[#43EBA6]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#052F2B]'
                    }`}
                  style={active ? { borderLeft: '4px solid #43EBA6' } : {}}
                >
                  <div className={`w-8 flex justify-center ${active ? 'text-[#0f766e]' : 'text-gray-400'}`}>
                    <i className={`${item.icon}`}></i>
                  </div>
                  <span className="ms-2">{item.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="list-group-item list-group-item-action py-3 px-4 border-0 d-flex align-items-center mb-1 mx-2 rounded-lg transition-all text-danger hover:bg-red-50"
            >
              <div className="w-8 flex justify-center text-danger">
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <span className="ms-2">Logout</span>
            </button>
          </div>

          {/* Sidebar Footer/Promo */}
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-br from-[#052F2B] to-[#0f766e] rounded-xl p-4 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-[#43EBA6] rounded-full opacity-20 blur-xl"></div>
              <h6 className="font-bold relative z-10 text-white mb-1">Need Help?</h6>
              <p className="text-xs text-white/70 relative z-10 mb-3">Contact our support team anytime.</p>
              <button className="btn btn-sm bg-[#43EBA6] text-[#052F2B] font-bold w-full border-0 shadow-lg">Support</button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 bg-[#f8fafc] overflow-auto">
          <div className="container-fluid p-4 lg:p-5">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 border-top text-sm text-gray-500">
        <div className="container-fluid px-4 md:px-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <span>© {new Date().getFullYear()} Samran Energy. All rights reserved.</span>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0 space-x-4">
              <Link to="/home/about" className="text-gray-500 hover:text-[#052F2B] transition-colors">About</Link>
              <Link to="/home/contact" className="text-gray-500 hover:text-[#052F2B] transition-colors">Contact</Link>
              <Link to="/home/privacy-policy" className="text-gray-500 hover:text-[#052F2B] transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { UserLayout };