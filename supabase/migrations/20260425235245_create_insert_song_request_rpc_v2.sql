/*
  # Create insert_song_request RPC function

  1. New Functions
    - `insert_song_request(payload jsonb)` - Accepts a JSONB payload with all song request fields
      and inserts a new row into `song_requests`, returning the new UUID.
    - Uses SECURITY DEFINER so it runs with the function owner's privileges,
      bypassing RLS for this specific insert path.

  2. Security
    - GRANT EXECUTE to `anon` and `authenticated` roles so the frontend
      can call it via `supabase.rpc()` without needing direct table insert policies.
*/

CREATE OR REPLACE FUNCTION insert_song_request(payload jsonb)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_id uuid;
BEGIN
  INSERT INTO song_requests (
    category, child_name, nickname, age_or_birthday, name_in_song,
    occasion, interests, memory_text, important_people,
    music_style, instruments, adult_name, whatsapp, email, status,
    education_data, parenting_data, friends_data, other_data,
    style_prompt_data, lyrics_prompt, style_prompt,
    words_to_avoid, desired_duration
  ) VALUES (
    COALESCE(payload->>'category', 'birthday'),
    COALESCE(payload->>'child_name', ''),
    COALESCE(payload->>'nickname', ''),
    COALESCE(payload->>'age_or_birthday', ''),
    COALESCE((payload->>'name_in_song')::boolean, true),
    COALESCE(payload->>'occasion', 'birthday'),
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(payload->'interests')), '{}'::text[]),
    COALESCE(payload->>'memory_text', ''),
    COALESCE(payload->>'important_people', ''),
    COALESCE(payload->>'music_style', ''),
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(payload->'instruments')), '{}'::text[]),
    COALESCE(payload->>'adult_name', ''),
    COALESCE(payload->>'whatsapp', ''),
    COALESCE(payload->>'email', ''),
    COALESCE(payload->>'status', 'pending'),
    COALESCE(payload->'education_data', '{}'::jsonb),
    COALESCE(payload->'parenting_data', '{}'::jsonb),
    COALESCE(payload->'friends_data', '{}'::jsonb),
    COALESCE(payload->'other_data', '{}'::jsonb),
    COALESCE(payload->'style_prompt_data', '{}'::jsonb),
    COALESCE(payload->>'lyrics_prompt', ''),
    COALESCE(payload->>'style_prompt', ''),
    COALESCE(payload->>'words_to_avoid', ''),
    COALESCE(payload->>'desired_duration', '')
  )
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;

GRANT EXECUTE ON FUNCTION insert_song_request(jsonb) TO anon;
GRANT EXECUTE ON FUNCTION insert_song_request(jsonb) TO authenticated;
