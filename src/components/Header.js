import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Logo and Menu */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">App Logo</h1>
            
            {/* Desktop Navigation (hidden on mobile) */}
            <nav className="hidden md:flex ml-10 space-x-8">
              <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md">Home</a>
              <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md">About</a>
              <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md">Contact</a>
            </nav>
          </div>

          {/* Mobile Menu Button (hidden on desktop) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 transform transition-transform ${
                  isMenuOpen ? 'hidden' : 'block'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 transform transition-transform ${
                  isMenuOpen ? 'block' : 'hidden'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only shown on mobile screens) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md">Home</a>
          <a href="#" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md">About</a>
          <a href="#" className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Header;