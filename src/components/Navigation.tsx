import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Gamepad2, Trophy, Coins } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export default function Navigation() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  const navItems = [
    { path: '/', icon: Home },
    { path: '/profile', icon: User },
    { path: '/game', icon: Gamepad2 },
    { path: '/top', icon: Trophy },
    { path: '/earn', icon: Coins },
  ];

  return (
    <nav className="bg-white shadow-lg fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {navItems.map(({ path, icon: Icon }, index) => (
            <Link
              key={path}
              to={path}
              className={`p-3 rounded-full transition-colors duration-200
                ${location.pathname === path
                  ? 'text-blue-600'
                  : 'text-gray-600'
                }
                ${index === 2 ? 'transform -translate-y-3 bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Icon size={index === 2 ? 24 : 20} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}