/*
  # Create RPC function for inserting song requests

  1. New Function
    - `insert_song_request` - Accepts all song request fields as a JSONB parameter
      and inserts into `song_requests` table directly via SQL, bypassing PostgREST
      schema cache issues with newly added columns.

  2. Security
    - Function is accessible to anon and authenticated roles
    - Uses SECURITY DEFINER to execute with table owner permissions
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
    category,
    child_name,
    nickname,
    age_or_birthday,
    name_in_song,
    occasion,
    interests,
    memory_text,
    important_people,
    music_style,
    instruments,
    adult_name,
    whatsapp,
    email,
    status,
    education_data,
    parenting_data,
    friends_data,
    other_data,
    style_prompt_data,
    lyrics_prompt,
    style_prompt,
    words_to_avoid,
    desired_duration
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
