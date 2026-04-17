/*
  # Add instruments and occasion_other columns to song_requests

  1. Changes
    - Add `instruments` (text array) column to store selected instruments
    - Add `occasion_other` (text) column was not needed since we resolve it in the app before inserting,
      but we add `instruments` to support the new instrument selection feature

  2. Notes
    - instruments defaults to empty array
    - Uses IF NOT EXISTS pattern to be safe
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'song_requests' AND column_name = 'instruments'
  ) THEN
    ALTER TABLE song_requests ADD COLUMN instruments text[] DEFAULT '{}';
  END IF;
END $$;
