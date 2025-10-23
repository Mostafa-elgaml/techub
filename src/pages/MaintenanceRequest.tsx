import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface MaintenanceRequestProps {
  onNavigate: (page: string) => void;
}

export const MaintenanceRequest = ({ onNavigate }: MaintenanceRequestProps) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestNumber, setRequestNumber] = useState('');

  const [formData, setFormData] = useState({
    deviceType: '',
    deviceBrand: '',
    deviceModel: '',
    issueDescription: '',
    serviceType: 'walkin',
    phone: '',
    address: '',
    city: '',
    preferredDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onNavigate('signin');
      return;
    }

    setLoading(true);
    const reqNumber = 'MNT-' + Date.now().toString().slice(-8);

    const { error } = await supabase.from('maintenance_requests').insert({
      user_id: user.id,
      request_number: reqNumber,
      device_type: formData.deviceType,
      device_brand: formData.deviceBrand,
      device_model: formData.deviceModel,
      issue_description: formData.issueDescription,
      service_type: formData.serviceType as 'pickup' | 'onsite' | 'walkin',
      phone: formData.phone,
      address: formData.serviceType !== 'walkin' ? formData.address : null,
      city: formData.serviceType !== 'walkin' ? formData.city : null,
      preferred_date: formData.preferredDate || null,
      status: 'pending'
    });

    setLoading(false);

    if (!error) {
      setRequestNumber(reqNumber);
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">{t.maintenance.success}</h2>
          <p className="text-gray-600 mb-2">{t.maintenance.requestNumber}:</p>
          <p className="text-2xl font-bold text-blue-600 mb-6">{requestNumber}</p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('tracking')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t.tracking.track}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              {t.nav.home}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">{t.maintenance.title}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">{t.maintenance.deviceInfo}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.maintenance.deviceType} *</label>
                  <input
                    type="text"
                    required
                    value={formData.deviceType}
                    onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'ar' ? 'مثال: لابتوب' : 'e.g. Laptop'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.maintenance.deviceBrand}</label>
                  <input
                    type="text"
                    value={formData.deviceBrand}
                    onChange={(e) => setFormData({ ...formData, deviceBrand: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">{t.maintenance.deviceModel}</label>
                  <input
                    type="text"
                    value={formData.deviceModel}
                    onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">{t.maintenance.issueDescription} *</label>
                  <textarea
                    required
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">{t.maintenance.serviceType} *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['pickup', 'onsite', 'walkin'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: type })}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.serviceType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{t.maintenance[type as keyof typeof t.maintenance]}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">{t.maintenance.contactInfo}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.maintenance.phone} *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.maintenance.preferredDate}</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {formData.serviceType !== 'walkin' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.maintenance.city} *</label>
                      <input
                        type="text"
                        required={formData.serviceType !== 'walkin'}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">{t.maintenance.address} *</label>
                      <input
                        type="text"
                        required={formData.serviceType !== 'walkin'}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? t.checkout.processing : t.maintenance.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
