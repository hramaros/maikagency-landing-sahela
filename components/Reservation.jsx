"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { ArrowRight, Check, Clock, MapPin, Phone, Sparkle } from "./icons";

const SERVICES = [
  "Manucure",
  "Pédicure",
  "Coiffure",
  "Maquillage",
  "Forfait complet",
  "Autre",
];

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const today = new Date().toISOString().slice(0, 10);

const infos = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Lot II, Antaninarenina\n101 Antananarivo, Madagascar",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+261 34 00 000 00",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun – Sam : 9h00 – 18h00\nDimanche : sur rendez-vous",
  },
];

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      setStatus("success");
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      setStatus("error");
    }
  }

  function reset() {
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });
    setStatus("idle");
    setError("");
  }

  const inputClass =
    "w-full rounded-2xl border border-plum/15 bg-white/70 px-4 py-3 text-plum placeholder:text-plum/40 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30";

  return (
    <section id="reserver" className="relative overflow-hidden bg-cream-deep py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 80% at 15% 0%, #fbe9ec 0%, #f3e9e0 55%, #fbf6f1 100%)",
        }}
      />
      <div className="aurora right-[-4rem] top-20 h-80 w-80 bg-rose/30" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Left — info */}
        <div id="contact" className="scroll-mt-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-luxe text-rose-deep">
              Réservation
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
              Offrez-vous une
              <span className="text-gradient-rose"> parenthèse beauté</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-plum/65">
              Réservez votre rendez-vous en moins d'une minute. Nous vous
              confirmons votre créneau par téléphone, avec le sourire.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {infos.map((info, i) => {
              const Icon = info.icon;
              return (
                <Reveal key={info.label} delay={0.15 + i * 0.08}>
                  <div className="flex items-start gap-4 rounded-3xl border border-plum/10 bg-white/60 p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum text-cream">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-rose-deep">
                        {info.label}
                      </p>
                      <p className="mt-1 whitespace-pre-line text-plum/75">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right — form / success */}
        <Reveal delay={0.1}>
          <div className="relative rounded-[2.2rem] border border-white/60 bg-white/70 p-7 shadow-[0_30px_70px_-30px_rgba(89,41,58,0.45)] backdrop-blur sm:p-9">
            {status === "success" ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-rose to-rosegold text-white shadow-glow">
                  <Check className="h-10 w-10" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold text-plum">
                  Merci {form.name.split(" ")[0]} !
                </h3>
                <p className="mt-3 max-w-sm text-plum/70">
                  Votre demande pour un rendez-vous{" "}
                  <strong className="text-plum">{form.service || "beauté"}</strong>
                  {form.date && (
                    <>
                      {" "}le{" "}
                      <strong className="text-plum">
                        {new Date(form.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </strong>
                      {form.time && <> à {form.time}</>}
                    </>
                  )}{" "}
                  a bien été enregistrée. Nous vous rappelons très vite pour la
                  confirmer.
                </p>
                <button onClick={reset} className="btn-ghost mt-8 text-plum">
                  Faire une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkle className="h-5 w-5 text-rose" />
                  <h3 className="font-display text-2xl font-semibold text-plum">
                    Demande de rendez-vous
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-plum/80">
                      Nom complet *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Votre nom"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-plum/80">
                      Téléphone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+261 ..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-plum/80">
                    Email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="vous@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-plum/80">
                    Prestation souhaitée *
                  </label>
                  <select
                    required
                    value={form.service}
                    onChange={update("service")}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Choisir une prestation
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-plum/80">
                      Date *
                    </label>
                    <input
                      required
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={update("date")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-plum/80">
                      Créneau
                    </label>
                    <select
                      value={form.time}
                      onChange={update("time")}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Indifférent</option>
                      {SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-plum/80">
                    Message (optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Une précision, une inspiration à partager ?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="rounded-2xl bg-rose/15 px-4 py-3 text-sm text-rose-deep">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full justify-center disabled:opacity-70"
                >
                  {status === "loading" ? (
                    "Envoi en cours…"
                  ) : (
                    <>
                      Confirmer ma demande
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-plum/50">
                  En envoyant, vous acceptez d'être recontactée pour confirmer
                  votre rendez-vous.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
