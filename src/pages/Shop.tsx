import { useEffect, useState } from 'react';
import { Search, Filter, Monitor, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Database } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';

type Product = Database['public']['Tables']['products']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Brand = Database['public']['Tables']['brands']['Row'];

interface ShopProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Shop = ({ onNavigate }: ShopProps) => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    if (data) setCategories(data);
  };

  const loadBrands = async () => {
    const { data } = await supabase.from('brands').select('*');
    if (data) setBrands(data);
  };

  const loadProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').eq('is_active', true);

    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.brand) {
      query = query.eq('brand_id', filters.brand);
    }

    if (filters.condition) {
      query = query.eq('condition', filters.condition);
    }

    if (filters.minPrice) {
      query = query.gte('price', parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      query = query.lte('price', parseFloat(filters.maxPrice));
    }

    if (filters.sortBy === 'priceAsc') {
      query = query.order('price', { ascending: true });
    } else if (filters.sortBy === 'priceDesc') {
      query = query.order('price', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;

    if (data) {
      let filtered = data;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = data.filter(p =>
          p.name_ar.toLowerCase().includes(searchLower) ||
          p.name_en.toLowerCase().includes(searchLower)
        );
      }
      setProducts(filtered);
    }

    setLoading(false);
  };

  const getProductName = (product: Product) => {
    return language === 'ar' ? product.name_ar : product.name_en;
  };

  const getCategoryName = (category: Category) => {
    return language === 'ar' ? category.name_ar : category.name_en;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t.shop.title}</h1>
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.shop.search}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">{t.shop.filters}</h2>
              <button
                onClick={() => setFilters({
                  search: '',
                  category: '',
                  brand: '',
                  condition: '',
                  minPrice: '',
                  maxPrice: '',
                  sortBy: 'newest'
                })}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-2 text-sm">{t.shop.category}</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.shop.allCategories}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{getCategoryName(cat)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-sm">{t.shop.brand}</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.shop.allBrands}</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-sm">{t.shop.condition}</label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="new">{t.shop.new}</option>
                  <option value="refurbished">{t.shop.refurbished}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-sm">{t.shop.price}</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-sm">{t.shop.sortBy}</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">{t.shop.newest}</option>
                  <option value="priceAsc">{t.shop.priceAsc}</option>
                  <option value="priceDesc">{t.shop.priceDesc}</option>
                </select>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {products.length} {language === 'ar' ? 'منتج' : 'products'}
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
              >
                <Filter className="w-5 h-5" />
                {t.shop.filters}
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Monitor className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.shop.noProducts}</h3>
                <p className="text-gray-500">{language === 'ar' ? 'جرب تغيير الفلاتر' : 'Try adjusting your filters'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => onNavigate('product', { id: product.id })}
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={getProductName(product)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Monitor className="w-20 h-20 text-gray-300" />
                        </div>
                      )}
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {Math.round((1 - product.price / product.compare_at_price) * 100)}%
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {product.condition === 'new' ? t.shop.new : t.shop.refurbished}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {getProductName(product)}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-600 mr-2">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {product.price.toLocaleString()} {t.shop.sar}
                          </div>
                          {product.compare_at_price && (
                            <div className="text-sm text-gray-400 line-through">
                              {product.compare_at_price.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock_quantity > 0 ? t.shop.inStock : t.shop.outOfStock}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (product.stock_quantity > 0) {
                              addToCart(product);
                            }
                          }}
                          disabled={product.stock_quantity === 0}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {t.product.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
