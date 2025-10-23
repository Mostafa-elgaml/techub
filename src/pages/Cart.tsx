import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CartProps {
  onNavigate: (page: string) => void;
}

export const Cart = ({ onNavigate }: CartProps) => {
  const { t, language, dir } = useLanguage();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">{t.cart.empty}</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.cart.continueShopping}
          </button>
        </div>
      </div>
    );
  }

  const getProductName = (product: any) => {
    return language === 'ar' ? product.name_ar : product.name_en;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">{t.cart.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.images && item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={getProductName(item.product)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{getProductName(item.product)}</h3>
                    <p className="text-blue-600 font-bold text-xl mb-4">
                      {item.product.price.toLocaleString()} {t.shop.sar}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">{t.checkout.orderSummary}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.cart.subtotal}</span>
                  <span className="font-semibold">{totalPrice.toLocaleString()} {t.shop.sar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.cart.shipping}</span>
                  <span className="font-semibold text-green-600">{t.cart.free}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">{t.cart.total}</span>
                    <span className="font-bold text-blue-600">{totalPrice.toLocaleString()} {t.shop.sar}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    onNavigate('signin');
                  } else {
                    onNavigate('checkout');
                  }
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {t.cart.checkout}
                <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="w-full mt-3 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
