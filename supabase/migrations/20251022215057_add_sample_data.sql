/*
  # Add Sample Data for Platform
  
  1. Sample Data
    - Categories (Laptops, Desktops, Accessories, Components)
    - Brands (Dell, HP, Lenovo, Apple, ASUS)
    - Products (various computers and accessories)
    - Services (maintenance and support services)
  
  2. Notes
    - All sample data is for demonstration purposes
    - Products include both new and refurbished items
    - Services cover common IT support needs
*/

-- Insert Categories
INSERT INTO categories (name_ar, name_en, slug, icon) VALUES
('أجهزة لابتوب', 'Laptops', 'laptops', 'Laptop'),
('أجهزة مكتبية', 'Desktops', 'desktops', 'Monitor'),
('إكسسوارات', 'Accessories', 'accessories', 'Mouse'),
('قطع الكمبيوتر', 'Components', 'components', 'Cpu')
ON CONFLICT (slug) DO NOTHING;

-- Insert Brands
INSERT INTO brands (name) VALUES
('Dell'),
('HP'),
('Lenovo'),
('Apple'),
('ASUS'),
('Acer'),
('MSI')
ON CONFLICT (name) DO NOTHING;

-- Insert Products
INSERT INTO products (
  category_id,
  brand_id,
  name_ar,
  name_en,
  description_ar,
  description_en,
  price,
  compare_at_price,
  stock_quantity,
  condition,
  cpu,
  ram,
  gpu,
  storage,
  is_featured,
  is_active
)
SELECT
  (SELECT id FROM categories WHERE slug = 'laptops' LIMIT 1),
  (SELECT id FROM brands WHERE name = 'Dell' LIMIT 1),
  'لابتوب ديل XPS 15',
  'Dell XPS 15 Laptop',
  'لابتوب قوي ومثالي للمحترفين مع شاشة عالية الدقة ومعالج قوي',
  'Powerful laptop perfect for professionals with high-resolution display and strong processor',
  5499.00,
  6499.00,
  10,
  'new',
  'Intel Core i7-13700H',
  '16GB DDR5',
  'NVIDIA RTX 4050',
  '512GB NVMe SSD',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name_en = 'Dell XPS 15 Laptop');

INSERT INTO products (
  category_id,
  brand_id,
  name_ar,
  name_en,
  description_ar,
  description_en,
  price,
  stock_quantity,
  condition,
  cpu,
  ram,
  gpu,
  storage,
  is_featured,
  is_active
)
SELECT
  (SELECT id FROM categories WHERE slug = 'laptops' LIMIT 1),
  (SELECT id FROM brands WHERE name = 'HP' LIMIT 1),
  'لابتوب HP Pavilion 14',
  'HP Pavilion 14 Laptop',
  'لابتوب متوسط المواصفات مناسب للاستخدام اليومي والدراسة',
  'Mid-range laptop suitable for daily use and studying',
  2999.00,
  15,
  'new',
  'Intel Core i5-1235U',
  '8GB DDR4',
  'Intel Iris Xe',
  '256GB SSD',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name_en = 'HP Pavilion 14 Laptop');

INSERT INTO products (
  category_id,
  brand_id,
  name_ar,
  name_en,
  description_ar,
  description_en,
  price,
  compare_at_price,
  stock_quantity,
  condition,
  cpu,
  ram,
  gpu,
  storage,
  is_featured,
  is_active
)
SELECT
  (SELECT id FROM categories WHERE slug = 'laptops' LIMIT 1),
  (SELECT id FROM brands WHERE name = 'Lenovo' LIMIT 1),
  'لابتوب Lenovo ThinkPad X1',
  'Lenovo ThinkPad X1 Laptop',
  'لابتوب احترافي للأعمال بجودة بناء ممتازة وأمان عالي',
  'Professional business laptop with excellent build quality and high security',
  6999.00,
  8999.00,
  8,
  'new',
  'Intel Core i7-1365U',
  '32GB DDR5',
  'Intel Iris Xe',
  '1TB NVMe SSD',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name_en = 'Lenovo ThinkPad X1 Laptop');

INSERT INTO products (
  category_id,
  brand_id,
  name_ar,
  name_en,
  description_ar,
  description_en,
  price,
  stock_quantity,
  condition,
  cpu,
  ram,
  gpu,
  storage,
  is_featured,
  is_active
)
SELECT
  (SELECT id FROM categories WHERE slug = 'desktops' LIMIT 1),
  (SELECT id FROM brands WHERE name = 'ASUS' LIMIT 1),
  'كمبيوتر ASUS للألعاب',
  'ASUS Gaming Desktop',
  'كمبيوتر ألعاب قوي بمواصفات عالية وتبريد ممتاز',
  'Powerful gaming PC with high-end specs and excellent cooling',
  8999.00,
  5,
  'new',
  'AMD Ryzen 7 7700X',
  '32GB DDR5',
  'NVIDIA RTX 4070',
  '1TB NVMe + 2TB HDD',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name_en = 'ASUS Gaming Desktop');

INSERT INTO products (
  category_id,
  brand_id,
  name_ar,
  name_en,
  description_ar,
  description_en,
  price,
  compare_at_price,
  stock_quantity,
  condition,
  cpu,
  ram,
  storage,
  is_featured,
  is_active
)
SELECT
  (SELECT id FROM categories WHERE slug = 'laptops' LIMIT 1),
  (SELECT id FROM brands WHERE name = 'Dell' LIMIT 1),
  'لابتوب ديل Latitude مجدد',
  'Dell Latitude Refurbished Laptop',
  'لابتوب مجدد بحالة ممتازة ومناسب للأعمال المكتبية',
  'Refurbished laptop in excellent condition, suitable for office work',
  1999.00,
  3499.00,
  20,
  'refurbished',
  'Intel Core i5-10210U',
  '8GB DDR4',
  '256GB SSD',
  false,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name_en = 'Dell Latitude Refurbished Laptop');

INSERT INTO products (
  category_id,
  brand_id,
  name_ar,
  name_en,
  description_ar,
  description_en,
  price,
  stock_quantity,
  condition,
  is_featured,
  is_active
)
SELECT
  (SELECT id FROM categories WHERE slug = 'accessories' LIMIT 1),
  (SELECT id FROM brands WHERE name = 'Lenovo' LIMIT 1),
  'ماوس لاسلكي لينوفو',
  'Lenovo Wireless Mouse',
  'ماوس لاسلكي مريح ودقيق للاستخدام اليومي',
  'Comfortable and precise wireless mouse for daily use',
  89.00,
  50,
  'new',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name_en = 'Lenovo Wireless Mouse');

-- Insert Services
INSERT INTO services (
  name_ar,
  name_en,
  description_ar,
  description_en,
  service_type,
  price_from,
  is_active
) VALUES
(
  'إصلاح الهاردوير',
  'Hardware Repair',
  'إصلاح جميع مشاكل الهاردوير للحواسيب واللابتوبات بما في ذلك استبدال القطع التالفة',
  'Repair all hardware issues for computers and laptops including replacement of damaged parts',
  'hardware_repair',
  150.00,
  true
),
(
  'إصلاح اللوحات الأم',
  'Motherboard Repair',
  'إصلاح وصيانة اللوحات الأم بأحدث التقنيات والمعدات',
  'Motherboard repair and maintenance with latest techniques and equipment',
  'motherboard_fix',
  300.00,
  true
),
(
  'الدعم البرمجي',
  'Software Support',
  'تثبيت وتحديث أنظمة التشغيل والبرامج وحل المشاكل البرمجية',
  'Installation and update of operating systems and software, solving software issues',
  'software_support',
  100.00,
  true
),
(
  'عقود الدعم الفني',
  'IT Support Contracts',
  'عقود صيانة ودعم فني شاملة للشركات والمؤسسات',
  'Comprehensive maintenance and technical support contracts for companies and institutions',
  'it_contract',
  500.00,
  true
)
ON CONFLICT DO NOTHING;
