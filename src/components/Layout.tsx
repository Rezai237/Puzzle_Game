import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <main className="container mx-auto py-4">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}