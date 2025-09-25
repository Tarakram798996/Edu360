import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useState } from 'react';
import { ChevronDown, Menu, X, LogIn, UserPlus, User, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.trim().split(' ');
    return names.length === 1
      ? names[0].charAt(0).toUpperCase()
      : names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  };

  const userInitials = getInitials(user?.sub || '');

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logoo.jpg" alt="Logo" className="w-10 h-10 rounded-full shadow-md" />
          <span className="text-2xl font-extrabold text-gray-800 hover:text-blue-600 transition">
            Edu360
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {!user && (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <LogIn size={18} /> <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <UserPlus size={18} /> <span>Register</span>
              </Link>
            </>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white font-semibold shadow-md transition-transform transform hover:scale-105 ${
                  user.role === 'TEACHER'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : user.role === 'STUDENT'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    : 'bg-gray-500'
                }`}
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20">
                  {userInitials}
                </span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-fade-in">
                  <Link
                    to={`/${user.role.toLowerCase()}/profile`}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
                    onClick={toggleDropdown}
                  >
                    <User size={18} /> <span>My Profile</span>
                  </Link>
                  <Link
                    to="/profile-setup"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
                    onClick={toggleDropdown}
                  >
                    <Settings size={18} /> <span>Change Bio Data</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleDropdown();
                    }}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
                  >
                    <LogOut size={18} /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
          <div className="flex flex-col px-6 py-4 space-y-3">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={18} /> <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus size={18} /> <span>Register</span>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to={`/${user.role.toLowerCase()}/profile`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} /> <span>My Profile</span>
                </Link>
                <Link
                  to="/profile-setup"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings size={18} /> <span>Change Bio Data</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 text-left transition"
                >
                  <LogOut size={18} /> <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
