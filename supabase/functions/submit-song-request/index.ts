import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const p = await req.json();

    const dbUrl = Deno.env.get("SUPABASE_DB_URL");
    if (!dbUrl) {
      throw new Error("SUPABASE_DB_URL not configured");
    }

    const { default: postgres } = await import("npm:postgres@3.4.5");
    const sql = postgres(dbUrl, { max: 1 });

    let newId: string | null = null;

    try {
      const interests: string[] = Array.isArray(p.interests)
        ? p.interests.map(String)
        : [];
      const instruments: string[] = Array.isArray(p.instruments)
        ? p.instruments.map(String)
        : [];

      function toJsonStr(val: unknown): string {
        if (val && typeof val === "object") return JSON.stringify(val);
        return "{}";
      }

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
          ${toJsonStr(p.education_data)}::jsonb,
          ${toJsonStr(p.parenting_data)}::jsonb,
          ${toJsonStr(p.friends_data)}::jsonb,
          ${toJsonStr(p.other_data)}::jsonb,
          ${toJsonStr(p.style_prompt_data)}::jsonb,
          ${p.lyrics_prompt ?? ""},
          ${p.style_prompt ?? ""},
          ${p.words_to_avoid ?? ""},
          ${p.desired_duration ?? ""}
        ) RETURNING id
      `;

      newId = result[0]?.id ?? null;
    } finally {
      await sql.end();
    }

    // Fire-and-forget: trigger notification email
    try {
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
    } catch (notifyErr) {
      console.error("Notify setup error (non-blocking):", notifyErr);
    }

    return new Response(JSON.stringify({ success: true, id: newId }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    console.error("submit-song-request error:", message);

    return new Response(
      JSON.stringify({
        success: false,
        error: message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
