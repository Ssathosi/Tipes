import { Transaction, Wallet, Preset } from './types';

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

// Helper to create a timestamp for "today at HH:MM"
const todayAt = (h: number, m: number): number => {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.getTime();
};

// Helper for "yesterday at HH:MM"
const yesterdayAt = (h: number, m: number): number => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(h, m, 0, 0);
  return d.getTime();
};

// Helper for a date N days ago at HH:MM
const daysAgoAt = (daysAgo: number, h: number, m: number): number => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, m, 0, 0);
  return d.getTime();
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Starbucks Coffee',
    category: 'Makanan',
    amount: 65000,
    type: 'expense',
    date: todayAt(9, 41),
  },
  {
    id: 'tx-2',
    title: 'Gaji Bulanan',
    category: 'Pemasukan',
    amount: 8500000,
    type: 'income',
    date: todayAt(8, 0),
  },
  {
    id: 'tx-3',
    title: 'Freelance Design',
    category: 'Pemasukan',
    amount: 2500000,
    type: 'income',
    date: yesterdayAt(18, 30),
  },
  {
    id: 'tx-4',
    title: 'H&M Outfit',
    category: 'Belanja',
    amount: 450000,
    type: 'expense',
    date: yesterdayAt(15, 45),
  },
  {
    id: 'tx-5',
    title: 'Gojek Ride',
    category: 'Transportasi',
    amount: 35000,
    type: 'expense',
    date: yesterdayAt(11, 30),
  },
  {
    id: 'tx-6',
    title: 'Cinema XXI',
    category: 'Hiburan',
    amount: 75000,
    type: 'expense',
    date: daysAgoAt(3, 20, 15),
  },
  {
    id: 'tx-7',
    title: 'Lunch Padang',
    category: 'Makanan',
    amount: 35000,
    type: 'expense',
    date: daysAgoAt(3, 12, 30),
  },
  {
    id: 'tx-8',
    title: 'Listrik & Air',
    category: 'Utilitas',
    amount: 350000,
    type: 'expense',
    date: daysAgoAt(5, 10, 0),
  },
  {
    id: 'tx-9',
    title: 'Apotek Kimia Farma',
    category: 'Kesehatan',
    amount: 85000,
    type: 'expense',
    date: daysAgoAt(6, 14, 20),
  },
  {
    id: 'tx-10',
    title: 'Grab Car',
    category: 'Transportasi',
    amount: 52000,
    type: 'expense',
    date: daysAgoAt(7, 9, 10),
  },
];

export const initialWallets: Wallet[] = [
  {
    id: 'w-1',
    name: 'Primary Spending',
    number: '.... 1018',
    balance: 5420000,
    bgColor: 'bg-[#5B7FFF]',
    textColor: 'text-white',
    accentColor: 'text-blue-100',
  },
  {
    id: 'w-2',
    name: 'Digital Assets',
    number: '.... 0336',
    balance: 1850000,
    bgColor: 'bg-[#F2A0B6]',
    textColor: 'text-[#39071d]',
    accentColor: 'text-pink-900',
  },
  {
    id: 'w-3',
    name: 'Personal Savings',
    number: '.... 5115',
    balance: 12500000,
    bgColor: 'bg-[#FFD77B]',
    textColor: 'text-[#002115]',
    accentColor: 'text-amber-950',
  },
];

export const initialPresets: Preset[] = [
  {
    id: 'p-1',
    label: 'Kopi',
    amount: 25000,
    category: 'Makanan',
    icon: 'coffee',
  },
  {
    id: 'p-2',
    label: 'Lunch',
    amount: 45000,
    category: 'Makanan',
    icon: 'restaurant',
  },
  {
    id: 'p-3',
    label: 'Grab',
    amount: 35000,
    category: 'Transportasi',
    icon: 'commute',
  },
];
