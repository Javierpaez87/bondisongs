/*
  # Make child_name column more flexible

  1. Modified Tables
    - `song_requests`
      - `child_name` changed to allow empty default (NOT NULL with default '')
  
  2. Notes
    - With multi-category support, child_name may be empty for non-birthday categories
    - Keeping NOT NULL but adding default empty string so inserts never fail
*/

ALTER TABLE song_requests ALTER COLUMN child_name SET DEFAULT '';
