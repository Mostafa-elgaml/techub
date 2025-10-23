import { useEffect, useState } from 'react';
import { Monitor, ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { supabase, Database } from '../lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductDetailsProps {
  productId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductDetails = ({ productId, onNavigate }: ProductDetailsProps) => {
  const { t, language, dir } = useLanguage();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .maybeSingle();

    if (data) {
      setProduct(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{language === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</h2>
        <button onClick={() => onNavigate('shop')} className="text-blue-600 hover:text-blue-700">
          {language === 'ar' ? 'العودة للمتجر' : 'Back to Shop'}
        </button>
      </div>
    </div>;
  }

  const name = language === 'ar' ? product.name_ar : product.name_en;
  const description = language === 'ar' ? product.description_ar : product.description_en;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          {language === 'ar' ? 'العودة' : 'Back'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm p-8">
          <div>
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Monitor className="w-32 h-32 text-gray-300" />
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                product.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {product.condition === 'new' ? t.shop.new : t.shop.refurbished}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">(4.8)</span>
              <span className="text-gray-400">|</span>
              <span className={product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock_quantity > 0 ? t.product.inStock : t.product.outOfStock}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-600">
                  {product.price.toLocaleString()} {t.shop.sar}
                </span>
                {product.compare_at_price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {product.compare_at_price.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-semibold">
                      {Math.round((1 - product.price / product.compare_at_price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">{t.product.specifications}</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.cpu && (
                  <div>
                    <span className="text-gray-600 text-sm">{t.shop.cpu}</span>
                    <p className="font-semibold">{product.cpu}</p>
                  </div>
                )}
                {product.ram && (
                  <div>
                    <span className="text-gray-600 text-sm">{t.shop.ram}</span>
                    <p className="font-semibold">{product.ram}</p>
                  </div>
                )}
                {product.gpu && (
                  <div>
                    <span className="text-gray-600 text-sm">{t.shop.gpu}</span>
                    <p className="font-semibold">{product.gpu}</p>
                  </div>
                )}
                {product.storage && (
                  <div>
                    <span className="text-gray-600 text-sm">Storage</span>
                    <p className="font-semibold">{product.storage}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                }}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {t.product.addToCart}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">{t.home.whyUs.delivery}</p>
                  <p className="text-xs text-gray-600">{language === 'ar' ? '2-3 أيام' : '2-3 days'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-sm">{t.home.whyUs.warranty}</p>
                  <p className="text-xs text-gray-600">{language === 'ar' ? 'سنة واحدة' : '1 Year'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
