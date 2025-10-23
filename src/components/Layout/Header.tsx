import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Globe, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'shop', label: t.nav.shop },
    { key: 'services', label: t.nav.services },
    { key: 'tracking', label: t.nav.tracking },
    { key: 'contact', label: t.nav.contact }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            >
              TechHub
            </button>

            <nav className="hidden md:flex gap-6">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`transition-colors ${
                    currentPage === item.key
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={language === 'ar' ? 'English' : 'العربية'}
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => onNavigate('account')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {t.nav.signOut}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => onNavigate('signin')}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {t.nav.signIn}
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.nav.signUp}
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-3">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`text-${dir === 'rtl' ? 'right' : 'left'} py-2 px-4 rounded-lg transition-colors ${
                    currentPage === item.key
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('account');
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    {t.nav.myAccount}
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    {t.nav.signOut}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate('signin');
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    {t.nav.signIn}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('signup');
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {t.nav.signUp}
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
