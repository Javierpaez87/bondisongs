import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTIFICATION_EMAIL = "javierpaezbondiapps@gmail.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const order = await req.json();

    const occasionMap: Record<string, string> = {
      birthday: "Cumpleaños",
      christmas: "Navidad",
      "new-year": "Año Nuevo",
      graduation: "Graduación",
      "get-well": "Recuperación",
      "just-because": "Sin motivo especial",
      other: "Otro",
    };

    const styleMap: Record<string, string> = {
      fun: "Divertido y animado",
      calm: "Tranquilo y suave",
      pop: "Pop moderno",
      rock: "Rock",
      folk: "Folk / acústico",
      cumbia: "Cumbia",
      reggaeton: "Reggaetón",
    };

    const occasionLabel = occasionMap[order.occasion] ?? order.occasion;
    const styleLabel = styleMap[order.music_style] ?? order.music_style;
    const interests = Array.isArray(order.interests) ? order.interests.join(", ") : order.interests ?? "No especificado";
    const instruments = Array.isArray(order.instruments) && order.instruments.length > 0
      ? order.instruments.join(", ")
      : "No especificado";

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
        <h1 style="color: #1a1a2e; font-size: 22px; margin-bottom: 4px;">Nuevo pedido de cancion 🎵</h1>
        <p style="color: #666; font-size: 14px; margin-bottom: 24px;">BondiSongs - ${new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })}</p>

        <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 16px; border: 1px solid #eee;">
          <h2 style="font-size: 16px; color: #f97316; margin: 0 0 16px;">Sobre el nino/a</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #999; width: 40%;">Nombre</td><td style="font-weight: bold; color: #1a1a2e;">${order.child_name ?? "-"}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">Apodo</td><td style="font-weight: bold; color: #1a1a2e;">${order.nickname || "-"}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">Edad / Cumple</td><td style="font-weight: bold; color: #1a1a2e;">${order.age_or_birthday || "-"}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">Nombre en la cancion</td><td style="font-weight: bold; color: #1a1a2e;">${order.name_in_song ? "Si" : "No"}</td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 16px; border: 1px solid #eee;">
          <h2 style="font-size: 16px; color: #f97316; margin: 0 0 16px;">Detalles de la cancion</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #999; width: 40%;">Ocasion</td><td style="font-weight: bold; color: #1a1a2e;">${occasionLabel}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">Estilo musical</td><td style="font-weight: bold; color: #1a1a2e;">${styleLabel}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">Intereses</td><td style="font-weight: bold; color: #1a1a2e;">${interests}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">Instrumentos</td><td style="font-weight: bold; color: #1a1a2e;">${instruments}</td></tr>
          </table>
        </div>

        ${order.memory_text ? `
        <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 16px; border: 1px solid #eee;">
          <h2 style="font-size: 16px; color: #f97316; margin: 0 0 8px;">Recuerdo especial</h2>
          <p style="font-size: 14px; color: #444; font-style: italic; line-height: 1.6;">"${order.memory_text}"</p>
        </div>
        ` : ""}

        ${order.important_people ? `
        <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 16px; border: 1px solid #eee;">
          <h2 style="font-size: 16px; color: #f97316; margin: 0 0 8px;">Personas importantes</h2>
          <p style="font-size: 14px; color: #444;">${order.important_people}</p>
        </div>
        ` : ""}

        <div style="background: #fff8f0; border-radius: 10px; padding: 20px; border: 1px solid #f97316;">
          <h2 style="font-size: 16px; color: #f97316; margin: 0 0 16px;">Contacto</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #999; width: 40%;">Nombre</td><td style="font-weight: bold; color: #1a1a2e;">${order.adult_name ?? "-"}</td></tr>
            <tr><td style="padding: 6px 0; color: #999;">WhatsApp</td><td style="font-weight: bold; color: #1a1a2e;"><a href="https://wa.me/${(order.whatsapp ?? "").replace(/\D/g, "")}" style="color: #f97316;">${order.whatsapp ?? "-"}</a></td></tr>
            ${order.email ? `<tr><td style="padding: 6px 0; color: #999;">Email</td><td style="font-weight: bold; color: #1a1a2e;">${order.email}</td></tr>` : ""}
          </table>
        </div>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "BondiSongs <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `Nuevo pedido: cancion para ${order.child_name ?? "un nino"}`,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      throw new Error(`Resend error: ${errText}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
