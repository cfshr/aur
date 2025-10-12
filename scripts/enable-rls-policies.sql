-- Run this script AFTER creating the table

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public signup)
CREATE POLICY "Enable insert for all users" ON public.users
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (you can restrict this later)
CREATE POLICY "Enable read for all users" ON public.users
  FOR SELECT
  USING (true);
