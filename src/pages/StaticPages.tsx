import { useLanguage } from '../contexts/LanguageContext';

export const About = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6">
            {language === 'ar' ? 'من نحن' : 'About Us'}
          </h1>
          <div className="prose prose-lg max-w-none">
            {language === 'ar' ? (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  نحن شركة رائدة في مجال الحواسيب والخدمات التقنية في المملكة العربية السعودية. نقدم أحدث الأجهزة والإكسسوارات من أفضل العلامات التجارية العالمية.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  بالإضافة إلى بيع الأجهزة، نوفر مجموعة شاملة من خدمات الصيانة والدعم الفني، بما في ذلك إصلاح الهاردوير، إصلاح اللوحات الأم، الدعم البرمجي، وعقود الدعم الفني للشركات.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  نلتزم بتقديم أفضل خدمة للعملاء وضمان رضاهم التام عن منتجاتنا وخدماتنا.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are a leading company in computers and technical services in Saudi Arabia. We offer the latest devices and accessories from the best international brands.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In addition to selling devices, we provide a comprehensive range of maintenance and technical support services, including hardware repair, motherboard repair, software support, and IT support contracts for businesses.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to providing the best customer service and ensuring complete satisfaction with our products and services.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Privacy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <div className="prose prose-lg max-w-none space-y-6">
            {language === 'ar' ? (
              <>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">جمع المعلومات</h2>
                  <p className="text-gray-700 leading-relaxed">
                    نقوم بجمع المعلومات التي تقدمها لنا عند إنشاء حساب، تقديم طلب، أو الاتصال بنا. قد تتضمن هذه المعلومات الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">استخدام المعلومات</h2>
                  <p className="text-gray-700 leading-relaxed">
                    نستخدم المعلومات التي نجمعها لمعالجة طلباتك، تحسين خدماتنا، وإرسال رسائل دورية متعلقة بطلباتك أو منتجاتنا.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">حماية المعلومات</h2>
                  <p className="text-gray-700 leading-relaxed">
                    نطبق مجموعة متنوعة من الإجراءات الأمنية للحفاظ على سلامة معلوماتك الشخصية.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Information Collection</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We collect information you provide when creating an account, placing an order, or contacting us. This may include name, email, phone number, and address.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Information Usage</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We use the collected information to process your orders, improve our services, and send periodic emails related to your orders or products.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Information Protection</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement various security measures to maintain the safety of your personal information.
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Terms = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6">
            {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <div className="prose prose-lg max-w-none space-y-6">
            {language === 'ar' ? (
              <>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">الطلبات والمدفوعات</h2>
                  <p className="text-gray-700 leading-relaxed">
                    جميع الطلبات تخضع للتوافر. نحتفظ بالحق في رفض أي طلب لأي سبب. الأسعار قابلة للتغيير دون إشعار مسبق.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">الشحن والتوصيل</h2>
                  <p className="text-gray-700 leading-relaxed">
                    نقوم بالشحن لجميع مناطق المملكة. أوقات التسليم تقديرية وقد تختلف حسب الموقع.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">الضمان والإرجاع</h2>
                  <p className="text-gray-700 leading-relaxed">
                    جميع المنتجات تأتي مع ضمان الشركة المصنعة. يمكن إرجاع المنتجات خلال 7 أيام من الاستلام في حالتها الأصلية.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Orders and Payments</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All orders are subject to availability. We reserve the right to refuse any order for any reason. Prices are subject to change without notice.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Shipping and Delivery</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We ship to all regions of Saudi Arabia. Delivery times are estimates and may vary by location.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Warranty and Returns</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All products come with manufacturer's warranty. Products can be returned within 7 days of receipt in original condition.
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
