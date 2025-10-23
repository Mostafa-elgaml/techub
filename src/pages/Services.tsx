import { useEffect, useState } from 'react';
import { Wrench, Cpu, Code, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Database } from '../lib/supabase';

type Service = Database['public']['Tables']['services']['Row'];

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export const Services = ({ onNavigate }: ServicesProps) => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);
    if (data) setServices(data);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'hardware_repair': return Wrench;
      case 'motherboard_fix': return Cpu;
      case 'software_support': return Code;
      case 'it_contract': return FileText;
      default: return Wrench;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.services.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t.services.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(service => {
            const Icon = getIcon(service.service_type);
            return (
              <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? service.name_ar : service.name_en}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {language === 'ar' ? service.description_ar : service.description_en}
                </p>
                {service.price_from && (
                  <div className="text-2xl font-bold text-blue-600 mb-6">
                    {t.services.from} {service.price_from.toLocaleString()} {t.shop.sar}
                  </div>
                )}
                <button
                  onClick={() => onNavigate('maintenance')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t.services.requestService}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'هل لديك استفسار؟' : 'Have a Question?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'فريقنا جاهز لمساعدتك في اختيار الخدمة المناسبة لاحتياجاتك'
              : 'Our team is ready to help you choose the right service for your needs'}
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {t.contact.title}
          </button>
        </div>
      </div>
    </div>
  );
};
