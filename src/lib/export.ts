import { Transaction } from '../types';

/**
 * Export transactions to CSV file
 */
export function exportToCSV(transactions: Transaction[], filename: string = 'tipes-transactions.csv') {
  // CSV headers
  const headers = ['ID', 'Title', 'Category', 'Amount', 'Type', 'Date', 'Icon', 'IconBg', 'IconColor'];
  
  // Convert transactions to CSV rows
  const rows = transactions.map(tx => [
    tx.id,
    `"${tx.title.replace(/"/g, '""')}"`, // Escape quotes in title
    tx.category,
    tx.amount,
    tx.type,
    tx.date,
    tx.icon || '',
    tx.iconBg || '',
    tx.iconColor || ''
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export transactions to JSON file
 */
export function exportToJSON(transactions: Transaction[], filename: string = 'tipes-transactions.json') {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import transactions from JSON file
 */
export async function importFromJSON(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('Invalid format: expected array of transactions');
        }

        // Validate each transaction
        const transactions: Transaction[] = data.map((item: any, index: number) => {
          if (!item.title || !item.category || typeof item.amount !== 'number' || !item.type || typeof item.date !== 'number') {
            throw new Error(`Invalid transaction at index ${index}`);
          }

          return {
            id: item.id || `imported-${Date.now()}-${index}`,
            title: item.title,
            category: item.category,
            amount: item.amount,
            type: item.type,
            date: item.date,
            icon: item.icon,
            iconBg: item.iconBg,
            iconColor: item.iconColor,
          };
        });

        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Import transactions from CSV file
 */
export async function importFromCSV(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const lines = content.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          throw new Error('CSV file is empty or invalid');
        }

        // Skip header line
        const dataLines = lines.slice(1);
        const transactions: Transaction[] = dataLines.map((line, index) => {
          // Parse CSV line (simple parser)
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          
          if (values.length < 5) {
            throw new Error(`Invalid CSV row at line ${index + 2}`);
          }

          return {
            id: values[0] || `imported-${Date.now()}-${index}`,
            title: values[1],
            category: values[2],
            amount: parseFloat(values[3]),
            type: values[4] as 'income' | 'expense',
            date: parseInt(values[5]) || Date.now(),
            icon: values[6] || undefined,
            iconBg: values[7] || undefined,
            iconColor: values[8] || undefined,
          };
        });

        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
