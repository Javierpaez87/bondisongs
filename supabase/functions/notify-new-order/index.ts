import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTIFICATION_EMAIL = "javierpaezbondiapps@gmail.com";
const FROM_EMAIL = "BondiSongs <bondisongs@bondiapps.com>";

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

    const adminHtmlBody = `
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

    const customerHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

        <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); padding: 40px 32px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 12px;">🎵</div>
          <h1 style="color: white; font-size: 26px; font-weight: 900; margin: 0 0 8px;">¡Recibimos tu pedido!</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 15px; margin: 0;">Gracias por confiar en BondiSongs</p>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
            Hola <strong>${order.adult_name ?? ""}!</strong> 👋
          </p>
          <p style="font-size: 15px; color: #555; line-height: 1.7; margin: 0 0 20px;">
            Ya tenemos todo lo que necesitamos para crear la canción de <strong>${order.child_name ?? "tu peque"}</strong>. Estamos procesando tu pedido y en breve nos contactaremos con vos para que puedas escuchar la canción antes de pagar.
          </p>

          <div style="background: #fff8f0; border-left: 4px solid #f97316; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="font-size: 14px; color: #555; margin: 0 0 8px; font-weight: bold;">¿Cómo funciona?</p>
            <ol style="font-size: 14px; color: #555; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Creamos la canción personalizada para ${order.child_name ?? "tu peque"}</li>
              <li>Te enviamos un <strong>link de escucha previa</strong> para que la puedas escuchar</li>
              <li>Solo pagás si estás conforme con el resultado</li>
              <li>Una vez realizado el pago, te enviamos el archivo con la canción</li>
            </ol>
          </div>

          <p style="font-size: 14px; color: #777; line-height: 1.6; margin: 0 0 24px;">
            Si tenés alguna consulta o duda, no dudes en escribirnos por WhatsApp:
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="https://wa.me/5493517631693" style="display: inline-flex; align-items: center; gap: 10px; background: #25D366; color: white; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-size: 15px; font-weight: bold; box-shadow: 0 4px 12px rgba(37,211,102,0.3);">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribinos por WhatsApp
            </a>
          </div>

          <p style="font-size: 13px; color: #aaa; text-align: center; margin: 24px 0 0;">
            Con cariño, el equipo de <strong style="color: #f97316;">BondiSongs</strong> 🎶
          </p>
        </div>
      </div>
    `;

    const resendKey = Deno.env.get("RESEND_API_KEY");

    const adminEmailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFICATION_EMAIL],
        subject: `Nuevo pedido: cancion para ${order.child_name ?? "un nino"}`,
        html: adminHtmlBody,
      }),
    });

    const promises: Promise<Response>[] = [adminEmailPromise];

    if (order.email) {
      const customerEmailPromise = fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [order.email],
          subject: `¡Recibimos el pedido de la canción para ${order.child_name ?? "tu peque"}! 🎵`,
          html: customerHtmlBody,
        }),
      });
      promises.push(customerEmailPromise);
    }

    const results = await Promise.all(promises);

    for (const res of results) {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Resend error: ${errText}`);
      }
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
