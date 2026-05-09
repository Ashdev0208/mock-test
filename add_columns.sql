-- Add missing columns to profiles table
ALTER TABLE profiles ADD COLUMN total_mocks INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN accuracy INTEGER DEFAULT 0;
