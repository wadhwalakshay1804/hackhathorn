import React, { useState } from 'react';
import { Menu, X, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">i360 Hub</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#products" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </a>
              <a href="#community" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Community
              </a>
              <a href="#news" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                News
              </a>
              <a href="#contact" className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </nav>

          {/* User Profile / Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                >
                  <User size={20} />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                      <p className="text-xs text-green-600 capitalize">{user.role}</p>
                    </div>
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile Settings
                    </a>
                    <a
                      href="#notifications"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Bell size={16} className="mr-2" />
                      Notifications
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2">
                <button className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-900 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="#products" className="text-gray-900 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
                Products
              </a>
              <a href="#community" className="text-gray-900 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
                Community
              </a>
              <a href="#news" className="text-gray-900 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
                News
              </a>
              <a href="#contact" className="text-gray-900 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;