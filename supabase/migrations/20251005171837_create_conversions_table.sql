/*
  # Create Conversions Table

  1. New Tables
    - `conversions`
      - `id` (uuid, primary key)
      - `input` (text) - The input number
      - `output` (text) - The converted output
      - `from_base` (integer) - Source base (2-36)
      - `to_base` (integer) - Target base (2-36)
      - `steps` (jsonb) - Step-by-step conversion details
      - `created_at` (timestamptz) - Timestamp of conversion

  2. Security
    - Enable RLS on `conversions` table
    - Add policy for public insert access (no auth required for MVP)
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input text NOT NULL,
  output text NOT NULL,
  from_base integer NOT NULL CHECK (from_base >= 2 AND from_base <= 36),
  to_base integer NOT NULL CHECK (to_base >= 2 AND to_base <= 36),
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert conversions"
  ON conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read conversions"
  ON conversions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can delete conversions"
  ON conversions
  FOR DELETE
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_conversions_created_at ON conversions(created_at DESC);
