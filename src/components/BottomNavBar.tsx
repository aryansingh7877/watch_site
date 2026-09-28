import React from 'react';

interface BottomNavBarProps {
  activeNav: string;
  onNavClick: (item: string) => void;
  isDark?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeNav, onNavClick, isDark = false }) => {
  const navItems = ['WATCHES', 'COLLECTION', 'CRAFT', 'ABOUT'];

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full transition-colors duration-500 pointer-events-auto select-none backdrop-blur-md ${
        isDark ? 'bg-black/85 border-t border-white/10' : 'bg-[#fafaf9]/85 border-t border-black/[0.04]'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto w-full px-6 sm:px-12 md:px-16 py-3.5 md:py-4 flex items-center justify-between gap-4 sm:gap-8"
        aria-label="Persistent Bottom Navigation"
      >
        {navItems.map((item) => {
          const isActive = activeNav === item;

          return (
            <button
              key={item}
              onClick={() => onNavClick(item)}
              className="group relative flex-1 text-center py-1 transition-all cursor-pointer"
            >
              <span
                className={`font-display font-extrabold text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.24em] uppercase block transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? 'text-white translate-y-[-1px]'
                      : 'text-black translate-y-[-1px]'
                    : isDark
                    ? 'text-neutral-500 hover:text-white group-hover:translate-y-[-1px]'
                    : 'text-neutral-800 hover:text-black group-hover:translate-y-[-1px]'
                }`}
              >
                {item}
              </span>

              {/* Smooth active and hover underline indicator */}
              <div
                className={`relative w-full max-w-[120px] mx-auto h-[2.5px] mt-1.5 overflow-hidden rounded-full transition-colors duration-300 ${
                  isDark ? 'bg-white/20' : 'bg-black/20'
                }`}
              >
                <div
                  className={`h-full transition-all duration-300 ease-out ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
