import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          address: string | null;
          city: string | null;
          company_name: string | null;
          preferred_language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          brand_id: string | null;
          name_ar: string;
          name_en: string;
          description_ar: string | null;
          description_en: string | null;
          price: number;
          compare_at_price: number | null;
          stock_quantity: number;
          condition: 'new' | 'refurbished';
          cpu: string | null;
          ram: string | null;
          gpu: string | null;
          storage: string | null;
          specs_json: Record<string, any> | null;
          images: string[];
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          slug: string;
          icon: string | null;
          created_at: string;
        };
      };
      brands: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          created_at: string;
        };
      };
      services: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          description_ar: string | null;
          description_en: string | null;
          icon: string | null;
          price_from: number | null;
          service_type: 'hardware_repair' | 'motherboard_fix' | 'software_support' | 'it_contract';
          is_active: boolean;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          order_number: string;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total_amount: number;
          shipping_address: string;
          shipping_city: string;
          phone: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      maintenance_requests: {
        Row: {
          id: string;
          user_id: string | null;
          request_number: string;
          device_type: string;
          device_brand: string | null;
          device_model: string | null;
          issue_description: string;
          service_type: 'pickup' | 'onsite' | 'walkin';
          status: 'pending' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
          address: string | null;
          city: string | null;
          phone: string;
          preferred_date: string | null;
          estimated_cost: number | null;
          actual_cost: number | null;
          technician_notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
