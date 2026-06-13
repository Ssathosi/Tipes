export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: number; // timestamp in ms
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}

export interface Wallet {
  id: string;
  name: string;
  number: string;
  balance: number;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export interface Budget {
  monthlyLimit: number;
  spent: number;
}

export interface Preset {
  id: string;
  label: string;
  amount: number;
  category: string;
  icon: string;
}

export interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  dotClass: string;
  chipClass: string;
  iconColor: string;
}
