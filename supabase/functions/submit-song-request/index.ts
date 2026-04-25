import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function toTextArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  return [];
}

function toJsonb(val: unknown): string {
  if (val && typeof val === "object") return JSON.stringify(val);
  return "{}";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const p = await req.json();

    const dbUrl = Deno.env.get("SUPABASE_DB_URL")!;

    const { default: postgres } = await import("npm:postgres@3.4.5");
    const sql = postgres(dbUrl, { max: 1 });

    try {
      const interests = toTextArray(p.interests);
      const instruments = toTextArray(p.instruments);

      const result = await sql`
        INSERT INTO song_requests (
          category, child_name, nickname, age_or_birthday, name_in_song,
          occasion, interests, memory_text, important_people,
          music_style, instruments, adult_name, whatsapp, email, status,
          education_data, parenting_data, friends_data, other_data,
          style_prompt_data, lyrics_prompt, style_prompt,
          words_to_avoid, desired_duration
        ) VALUES (
          ${p.category ?? "birthday"},
          ${p.child_name ?? ""},
          ${p.nickname ?? ""},
          ${p.age_or_birthday ?? ""},
          ${p.name_in_song ?? true},
          ${p.occasion ?? "birthday"},
          ${interests},
          ${p.memory_text ?? ""},
          ${p.important_people ?? ""},
          ${p.music_style ?? ""},
          ${instruments},
          ${p.adult_name ?? ""},
          ${p.whatsapp ?? ""},
          ${p.email ?? ""},
          ${p.status ?? "pending"},
          ${toJsonb(p.education_data)}::jsonb,
          ${toJsonb(p.parenting_data)}::jsonb,
          ${toJsonb(p.friends_data)}::jsonb,
          ${toJsonb(p.other_data)}::jsonb,
          ${toJsonb(p.style_prompt_data)}::jsonb,
          ${p.lyrics_prompt ?? ""},
          ${p.style_prompt ?? ""},
          ${p.words_to_avoid ?? ""},
          ${p.desired_duration ?? ""}
        ) RETURNING id
      `;

      const newId = result[0]?.id;

      // Fire-and-forget: trigger notification email
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      fetch(`${supabaseUrl}/functions/v1/notify-new-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify(p),
      }).catch((e) => console.error("Notify error (non-blocking):", e));

      return jsonResponse({ ok: true, id: newId });
    } finally {
      await sql.end();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("submit-song-request error:", message);
    return jsonResponse({ error: message }, 500);
  }
});
