import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Centered on mobile, left-aligned on desktop */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <h1 className="text-xl font-bold">App Logo</h1>
          </div>

          {/* Desktop Navigation - Right-aligned */}
          <nav className="hidden md:flex space-x-8 ml-auto">
            <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md">Home</a>
            <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md">About</a>
            <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md">Contact</a>
          </nav>

          {/* Mobile Menu Button - Right-aligned */}
          <div className="md:hidden flex-1 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Centered links */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 text-center">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-700">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-700">About</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-700">Contact</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;