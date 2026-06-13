-- ============================================
-- TIPES Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TRANSACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  icon TEXT,
  icon_bg TEXT,
  icon_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);

-- ============================================
-- 2. PRESETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS presets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_presets_user_id ON presets(user_id);

-- ============================================
-- 3. USER PREFERENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username TEXT NOT NULL,
  monthly_budget DECIMAL(12,2) DEFAULT 5000000 NOT NULL,
  selected_categories TEXT[] DEFAULT ARRAY['Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Kesehatan', 'Utilitas', 'Pemasukan', 'Lainnya'] NOT NULL,
  theme TEXT DEFAULT 'light' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- TRANSACTIONS policies
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);

-- PRESETS policies
CREATE POLICY "Users can view their own presets"
  ON presets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own presets"
  ON presets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own presets"
  ON presets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own presets"
  ON presets FOR DELETE
  USING (auth.uid() = user_id);

-- USER PREFERENCES policies
CREATE POLICY "Users can view their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 5. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for transactions
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Triggers for presets
CREATE TRIGGER update_presets_updated_at
  BEFORE UPDATE ON presets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Triggers for user_preferences
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. AUTO-CREATE USER PREFERENCES ON SIGNUP
-- ============================================

-- Function to create default user preferences when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id, username, monthly_budget)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'User'), 5000000)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create preferences on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Done! Database schema is ready.
-- ============================================
