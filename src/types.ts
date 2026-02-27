export type Role = 'user' | 'ngo';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  city: string;
  state: string;
}

export interface Report {
  id: number;
  reporter_id: number;
  reporter_name: string;
  animal_type: string;
  description: string;
  image_url: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  status: 'pending' | 'rescued' | 'in-treatment' | 'adopted';
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  is_read: number;
  created_at: string;
}
