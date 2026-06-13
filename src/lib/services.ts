import { supabase } from './supabase';
import { Transaction, Preset } from '../types';

// ============================================
// TRANSACTIONS
// ============================================

export async function fetchTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    amount: row.amount,
    type: row.type as 'income' | 'expense',
    date: new Date(row.date).getTime(),
    icon: row.icon,
    iconBg: row.icon_bg,
    iconColor: row.icon_color,
  }));
}

export async function createTransaction(
  userId: string,
  tx: Omit<Transaction, 'id'>
): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: userId,
      title: tx.title,
      category: tx.category,
      amount: tx.amount,
      type: tx.type,
      date: new Date(tx.date).toISOString(),
      icon: tx.icon,
      icon_bg: tx.iconBg,
      icon_color: tx.iconColor,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    amount: data.amount,
    type: data.type as 'income' | 'expense',
    date: new Date(data.date).getTime(),
    icon: data.icon,
    iconBg: data.icon_bg,
    iconColor: data.icon_color,
  };
}

export async function updateTransaction(tx: Transaction): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .update({
      title: tx.title,
      category: tx.category,
      amount: tx.amount,
      type: tx.type,
      date: new Date(tx.date).toISOString(),
      icon: tx.icon,
      icon_bg: tx.iconBg,
      icon_color: tx.iconColor,
    })
    .eq('id', tx.id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    amount: data.amount,
    type: data.type as 'income' | 'expense',
    date: new Date(data.date).getTime(),
    icon: data.icon,
    iconBg: data.icon_bg,
    iconColor: data.icon_color,
  };
}

export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
}

// ============================================
// PRESETS
// ============================================

export async function fetchPresets(userId: string): Promise<Preset[]> {
  const { data, error } = await supabase
    .from('presets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    label: row.label,
    amount: row.amount,
    category: row.category,
    icon: row.icon,
  }));
}

export async function createPreset(
  userId: string,
  preset: Omit<Preset, 'id'>
): Promise<Preset> {
  const { data, error } = await supabase
    .from('presets')
    .insert({
      user_id: userId,
      label: preset.label,
      amount: preset.amount,
      category: preset.category,
      icon: preset.icon,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    label: data.label,
    amount: data.amount,
    category: data.category,
    icon: data.icon,
  };
}

export async function updatePreset(preset: Preset): Promise<Preset> {
  const { data, error } = await supabase
    .from('presets')
    .update({
      label: preset.label,
      amount: preset.amount,
      category: preset.category,
      icon: preset.icon,
    })
    .eq('id', preset.id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    label: data.label,
    amount: data.amount,
    category: data.category,
    icon: data.icon,
  };
}

export async function deletePreset(id: string): Promise<void> {
  const { error } = await supabase.from('presets').delete().eq('id', id);
  if (error) throw error;
}

// ============================================
// USER PREFERENCES
// ============================================

export interface UserPreferences {
  username: string;
  monthly_budget: number;
  selected_categories: string[];
  theme: string;
}

export async function fetchUserPreferences(userId: string): Promise<UserPreferences | null> {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

  if (!data) return null;

  return {
    username: data.username,
    monthly_budget: data.monthly_budget,
    selected_categories: data.selected_categories,
    theme: data.theme,
  };
}

export async function updateUserPreferences(
  userId: string,
  prefs: Partial<UserPreferences>
): Promise<void> {
  const { error } = await supabase
    .from('user_preferences')
    .update(prefs)
    .eq('user_id', userId);

  if (error) throw error;
}
