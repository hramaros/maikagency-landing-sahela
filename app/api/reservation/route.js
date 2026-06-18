import { NextResponse } from "next/server";

/*
 * Les réservations sont transmises à un workflow n8n
 * (Webhook → Data Table « Réservations Sahela » → email au salon
 *  + email de confirmation à la cliente).
 *
 * L'URL est configurable via la variable d'environnement N8N_WEBHOOK_URL.
 * À défaut, l'instance de production est utilisée.
 */
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://n8n.maikagency.dev/webhook/sahela-reservation";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide. Merci de réessayer." },
      { status: 400 }
    );
  }

  const {
    name,
    phone,
    service,
    date,
    time = "",
    email = "",
    message = "",
  } = data || {};

  if (!name || !phone || !service || !date) {
    return NextResponse.json(
      { ok: false, error: "Merci de renseigner votre nom, téléphone, service et date." },
      { status: 400 }
    );
  }

  const payload = {
    name,
    phone,
    email,
    service,
    date,
    time,
    message,
    source: "site-web",
    submittedAt: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`n8n a répondu ${res.status}`);
  } catch (err) {
    console.error("Échec de la transmission de la réservation vers n8n :", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Impossible d'enregistrer votre réservation pour le moment. Merci de réessayer ou de nous appeler.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Votre demande a bien été reçue. Notre équipe vous confirmera votre créneau très vite.",
  });
}
