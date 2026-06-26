"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Sparkle,
  Spinner,
  Star,
} from "./icons";

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
    icon: Clock,
    label: "Horaires",
    value: "Lun – Sam : 9h00 – 18h00\nDimanche : sur rendez-vous",
  },
];

/* ---- Validation (client-side, accessible) ---- */
function validateField(key, value) {
  const v = (value || "").trim();
  switch (key) {
    case "name":
      if (!v) return "Merci d'indiquer votre nom.";
      if (v.length < 2) return "Nom trop court.";
      return "";
    case "phone":
      if (!v) return "Numéro requis pour la confirmation.";
      if (!/^[+0-9][0-9\s().-]{6,}$/.test(v)) return "Numéro de téléphone invalide.";
      return "";
    case "email":
      if (!v) return ""; // optional
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Adresse email invalide.";
      return "";
    case "service":
      if (!v) return "Choisissez une prestation.";
      return "";
    case "date":
      if (!v) return "Sélectionnez une date.";
      if (v < today) return "La date doit être à venir.";
      return "";
    default:
      return "";
  }
}

const REQUIRED_FIELDS = ["name", "phone", "email", "service", "date"];
const FIELD_ORDER = ["name", "phone", "email", "service", "date", "time"];

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const fieldRefs = useRef({});

  const setRef = (key) => (el) => {
    if (el) fieldRefs.current[key] = el;
  };

  const update = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    // Re-validate live only once the field has been touched (avoid nagging).
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
    }
  };

  const handleBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }));
  };

  function validateAll() {
    const next = {};
    REQUIRED_FIELDS.forEach((k) => {
      const msg = validateField(k, form[k]);
      if (msg) next[k] = msg;
    });
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const found = validateAll();
    if (Object.keys(found).length) {
      setErrors(found);
      setTouched((t) => {
        const all = { ...t };
        Object.keys(found).forEach((k) => (all[k] = true));
        return all;
      });
      // Focus the first invalid field in visual order.
      const firstInvalid = FIELD_ORDER.find((k) => found[k]);
      if (firstInvalid && fieldRefs.current[firstInvalid]) {
        fieldRefs.current[firstInvalid].focus();
      }
      return;
    }

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
    setErrors({});
    setTouched({});
    setStatus("idle");
    setError("");
  }

  const baseInput =
    "w-full rounded-2xl border px-4 py-3 text-plum placeholder:text-plum/45 outline-none transition-all duration-200 focus:ring-2 focus:bg-white";
  const fieldClass = (key) =>
    `${baseInput} ${
      errors[key]
        ? "border-rose-deep bg-rose/[0.05] focus:border-rose-deep focus:ring-rose-deep/25"
        : "border-plum/15 bg-white/70 hover:border-plum/25 focus:border-rose focus:ring-rose/30"
    }`;
  const labelClass = "mb-1.5 block text-sm font-medium text-plum/80";
  const req = (
    <span className="text-rose-deep" aria-hidden="true">
      {" "}
      *
    </span>
  );

  // Accessible inline error row
  const FieldError = ({ name }) =>
    errors[name] ? (
      <p
        id={`${name}-error`}
        role="alert"
        className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-deep"
      >
        <span aria-hidden="true">⚠</span>
        {errors[name]}
      </p>
    ) : null;

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);

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
      <div className="aurora left-[-4rem] bottom-10 h-72 w-72 bg-lilac/40" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Left — info */}
        <div id="contact" className="scroll-mt-28">
          <Reveal>
            <span className="eyebrow text-rose-deep">Réservation</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
              Offrez-vous une
              <span className="text-gradient-rose"> parenthèse beauté</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-plum/70">
              Réservez votre rendez-vous en moins d'une minute, sans engagement
              et sans paiement en ligne. Nous vous confirmons votre créneau par
              téléphone, avec le sourire.
            </p>
          </Reveal>

          {/* Social proof at the point of decision (Bandwagon) — existing claims only */}
          <Reveal delay={0.12}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} filled className="h-4 w-4 text-gold" />
                  ))}
                </span>
                <span className="text-sm font-semibold text-plum">4,9/5</span>
              </span>
              <span className="text-sm text-plum/65">+320 avis vérifiés</span>
              <span className="h-1 w-1 rounded-full bg-plum/25" aria-hidden="true" />
              <span className="text-sm text-plum/65">+12 000 clientes choyées</span>
            </div>
          </Reveal>

          {/* Honest scarcity — mirrors the FAQ, no fabricated counters */}
          <Reveal delay={0.16}>
            <p className="mt-5 flex items-start gap-2 text-sm text-plum/60">
              <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
              Les créneaux du week-end partent vite — réservez quelques jours à
              l'avance.
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

          {/* Map */}
          <Reveal delay={0.4}>
            <div className="mt-5 overflow-hidden rounded-3xl border border-plum/10 shadow-sm">
              <iframe
                title="Carte de localisation du salon Sahela à Antaninarenina, Antananarivo"
                src="https://maps.google.com/maps?q=Antaninarenina%2C%20Antananarivo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>

        {/* Right — form / success */}
        <Reveal delay={0.1}>
          <div className="relative rounded-[2.2rem] border border-white/60 bg-white/70 p-7 shadow-[0_30px_70px_-30px_rgba(89,41,58,0.45)] backdrop-blur sm:p-9">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[460px] flex-col items-center justify-center text-center"
                aria-live="polite"
              >
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-rose to-rosegold text-white shadow-glow"
                >
                  <Check className="h-10 w-10" />
                </motion.span>
                <h3 className="mt-6 font-display text-3xl font-semibold text-plum">
                  Merci {form.name.split(" ")[0]} !
                </h3>
                <p className="mt-3 max-w-sm text-plum/75">
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
              </motion.div>
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
                    <label htmlFor="res-name" className={labelClass}>
                      Nom complet{req}
                    </label>
                    <input
                      ref={setRef("name")}
                      id="res-name"
                      name="name"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={describedBy("name")}
                      value={form.name}
                      onChange={update("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Votre nom"
                      className={fieldClass("name")}
                    />
                    <FieldError name="name" />
                  </div>
                  <div>
                    <label htmlFor="res-phone" className={labelClass}>
                      Téléphone{req}
                    </label>
                    <input
                      ref={setRef("phone")}
                      id="res-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={errors.phone ? "true" : undefined}
                      aria-describedby={describedBy("phone")}
                      value={form.phone}
                      onChange={update("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder="+261 ..."
                      className={fieldClass("phone")}
                    />
                    <FieldError name="phone" />
                  </div>
                </div>

                <div>
                  <label htmlFor="res-email" className={labelClass}>
                    Email (optionnel)
                  </label>
                  <input
                    ref={setRef("email")}
                    id="res-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={describedBy("email")}
                    value={form.email}
                    onChange={update("email")}
                    onBlur={handleBlur("email")}
                    placeholder="vous@email.com"
                    className={fieldClass("email")}
                  />
                  <FieldError name="email" />
                </div>

                <div>
                  <label htmlFor="res-service" className={labelClass}>
                    Prestation souhaitée{req}
                  </label>
                  <div className="relative">
                    <select
                      ref={setRef("service")}
                      id="res-service"
                      name="service"
                      aria-required="true"
                      aria-invalid={errors.service ? "true" : undefined}
                      aria-describedby={describedBy("service")}
                      value={form.service}
                      onChange={update("service")}
                      onBlur={handleBlur("service")}
                      className={`${fieldClass("service")} appearance-none pr-11 ${
                        form.service ? "" : "text-plum/45"
                      }`}
                    >
                      <option value="" disabled>
                        Choisir une prestation
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="text-plum">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/55"
                    />
                  </div>
                  <FieldError name="service" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-date" className={labelClass}>
                      Date{req}
                    </label>
                    <input
                      ref={setRef("date")}
                      id="res-date"
                      name="date"
                      type="date"
                      min={today}
                      aria-required="true"
                      aria-invalid={errors.date ? "true" : undefined}
                      aria-describedby={describedBy("date")}
                      value={form.date}
                      onChange={update("date")}
                      onBlur={handleBlur("date")}
                      className={fieldClass("date")}
                    />
                    <FieldError name="date" />
                  </div>
                  <div>
                    <label htmlFor="res-time" className={labelClass}>
                      Créneau
                    </label>
                    <div className="relative">
                      <select
                        ref={setRef("time")}
                        id="res-time"
                        name="time"
                        value={form.time}
                        onChange={update("time")}
                        className={`${fieldClass("time")} appearance-none pr-11 ${
                          form.time ? "" : "text-plum/45"
                        }`}
                      >
                        <option value="">Indifférent</option>
                        {SLOTS.map((t) => (
                          <option key={t} value={t} className="text-plum">
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/55"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="res-message" className={labelClass}>
                    Message (optionnel)
                  </label>
                  <textarea
                    id="res-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Une précision, une inspiration à partager ?"
                    className={`${fieldClass("message")} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="rounded-2xl bg-rose/15 px-4 py-3 text-sm text-rose-deep"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="btn-primary group w-full justify-center disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Spinner className="h-4 w-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Confirmer ma demande
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-plum/65">
                  Sans engagement · Aucun paiement en ligne · Réponse rapide par
                  téléphone
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
