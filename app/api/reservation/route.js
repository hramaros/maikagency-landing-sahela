import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone, service, date, time } = data || {};

    if (!name || !phone || !service || !date) {
      return NextResponse.json(
        { ok: false, error: "Merci de renseigner votre nom, téléphone, service et date." },
        { status: 400 }
      );
    }

    /*
     * Point d'intégration : en production, branchez ici l'envoi d'email
     * (Resend, Nodemailer), un CRM, Google Agenda ou une base de données.
     * La demande est pour l'instant simplement journalisée côté serveur.
     */
    console.log("📅 Nouvelle demande de réservation :", {
      name,
      phone,
      service,
      date,
      time,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Votre demande a bien été reçue. Notre équipe vous confirmera votre créneau très vite.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide. Merci de réessayer." },
      { status: 400 }
    );
  }
}
