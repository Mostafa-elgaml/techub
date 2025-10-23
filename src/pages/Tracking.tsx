import { useState } from 'react';
import { Search, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Database } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type MaintenanceRequest = Database['public']['Tables']['maintenance_requests']['Row'];

interface TrackingProps {
  onNavigate: (page: string) => void;
}

export const Tracking = ({ onNavigate }: TrackingProps) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setNotFound(false);
    setOrder(null);
    setMaintenance(null);

    if (trackingNumber.startsWith('ORD-')) {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', trackingNumber)
        .maybeSingle();

      if (data) setOrder(data);
      else setNotFound(true);
    } else if (trackingNumber.startsWith('MNT-')) {
      const { data } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('request_number', trackingNumber)
        .maybeSingle();

      if (data) setMaintenance(data);
      else setNotFound(true);
    } else {
      setNotFound(true);
    }

    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing':
      case 'in_progress': return Package;
      case 'shipped': return Truck;
      case 'delivered':
      case 'completed':
      case 'ready': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing':
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered':
      case 'completed':
      case 'ready': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6">{t.tracking.title}</h1>

          <div className="flex gap-3">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={language === 'ar' ? 'ORD-12345678 أو MNT-12345678' : 'ORD-12345678 or MNT-12345678'}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {t.tracking.track}
            </button>
          </div>
        </div>

        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-semibold">
              {language === 'ar' ? 'رقم التتبع غير صحيح' : 'Tracking number not found'}
            </p>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{t.tracking.orderDetails}</h2>
                <p className="text-gray-600">#{order.order_number}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                {t.tracking[order.status as keyof typeof t.tracking]}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">{t.tracking.shippingAddress}</h3>
                <p className="text-gray-600">{order.shipping_address}</p>
                <p className="text-gray-600">{order.shipping_city}</p>
                <p className="text-gray-600">{order.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.tracking.total}</h3>
                <p className="text-2xl font-bold text-blue-600">{order.total_amount.toLocaleString()} {t.shop.sar}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                  const Icon = getStatusIcon(status);
                  const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index;

                  return (
                    <div key={status} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className={`text-sm mt-2 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                          {t.tracking[status as keyof typeof t.tracking]}
                        </p>
                      </div>
                      {index < 3 && (
                        <div className={`w-24 h-1 ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {maintenance && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{t.tracking.maintenanceDetails}</h2>
                <p className="text-gray-600">#{maintenance.request_number}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(maintenance.status)}`}>
                {t.tracking[maintenance.status as keyof typeof t.tracking]}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{t.maintenance.deviceInfo}</h3>
                <p className="text-gray-600">{maintenance.device_type} {maintenance.device_brand} {maintenance.device_model}</p>
                <p className="text-gray-600 mt-2">{maintenance.issue_description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.maintenance.serviceType}</h3>
                <p className="text-gray-600">{t.maintenance[maintenance.service_type as keyof typeof t.maintenance]}</p>
                {maintenance.estimated_cost && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">{t.tracking.estimatedCost}</h3>
                    <p className="text-xl font-bold text-blue-600">{maintenance.estimated_cost.toLocaleString()} {t.shop.sar}</p>
                  </div>
                )}
                {maintenance.technician_notes && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">{t.tracking.technicianNotes}</h3>
                    <p className="text-gray-600">{maintenance.technician_notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
