import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  children?: MenuItem[];
}

export interface KPIStats {
  label: string;
  value: string | number;
  trend: number; // percentage
  trendLabel: string;
  icon: LucideIcon;
  color: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'lead';
  message: string;
  time: string;
  read: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'busy' | 'offline';
  score: number;
  customerCount: number;
  tags: string[];
}

export interface Lead {
  id: string;
  name: string;
  source: string;
  status: 'new' | 'contacted' | 'negotiation' | 'closed';
  salesperson: string;
  lastInteraction: string;
  probability: number;
}
