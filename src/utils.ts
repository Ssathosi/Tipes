/**
 * Shared utility functions for TIPES
 */

/**
 * Format amount as IDR (Rupiah)
 */
export const formatIDR = (val: number): string => {
  return `Rp ${val.toLocaleString('id-ID', { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  })}`;
};

/**
 * Format date to Indonesian format
 */
export const formatDateID = (timestamp: number): string => {
  const date = new Date(timestamp);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  
  return `${dayName}, ${day} ${month}`;
};

/**
 * Get relative date string (Hari Ini, Kemarin, or formatted date)
 */
export const getRelativeDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (targetDate.getTime() === today.getTime()) {
    return 'Hari Ini';
  } else if (targetDate.getTime() === yesterday.getTime()) {
    return 'Kemarin';
  } else {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
};

/**
 * Format time string (HH:MM)
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Format display date (relative + time)
 */
export const formatDisplayDate = (timestamp: number): string => {
  const relative = getRelativeDate(timestamp);
  const time = formatTime(timestamp);
  return `${relative}, ${time}`;
};

/**
 * Calculate streak from transaction dates
 */
export const calculateStreak = (transactions: Array<{ date: number }>): { 
  current: number; 
  best: number;
  lastTransactionDate: number | null;
} => {
  if (transactions.length === 0) {
    return { current: 0, best: 0, lastTransactionDate: null };
  }

  // Get unique dates (day-level granularity)
  const uniqueDates = Array.from(
    new Set(transactions.map(t => {
      const d = new Date(t.date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }))
  ).sort((a, b) => b - a); // Sort descending (newest first)

  if (uniqueDates.length === 0) {
    return { current: 0, best: 0, lastTransactionDate: null };
  }

  const lastTransactionDate = uniqueDates[0];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();

  // Check if last transaction was today or yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayTime = yesterday.getTime();

  if (lastTransactionDate !== todayTime && lastTransactionDate !== yesterdayTime) {
    // Streak is broken
    return { current: 0, best: uniqueDates.length, lastTransactionDate };
  }

  // Calculate current streak
  let currentStreak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = uniqueDates[i - 1];
    const currDate = uniqueDates[i];
    const dayDiff = (prevDate - currDate) / (1000 * 60 * 60 * 24);
    
    if (dayDiff === 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { 
    current: currentStreak, 
    best: Math.max(currentStreak, uniqueDates.length), 
    lastTransactionDate 
  };
};

/**
 * Get start of day timestamp
 */
export const getStartOfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

/**
 * Get start of week timestamp (Monday)
 */
export const getStartOfWeek = (timestamp: number): number => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(date.getFullYear(), date.getMonth(), diff, 0, 0, 0).getTime();
};

/**
 * Get start of month timestamp
 */
export const getStartOfMonth = (timestamp: number): number => {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0).getTime();
};
