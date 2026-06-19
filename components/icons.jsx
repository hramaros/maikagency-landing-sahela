/* Hand-built line icons — currentColor, no external dependency */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function NailPolish(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M10 3h4v3h-4z" />
      <path d="M9.5 6h5l1 2.2c.4.9.5 1.9.5 2.8V19a2 2 0 0 1-2 2h-4.5a2 2 0 0 1-2-2v-8c0-.9.1-1.9.5-2.8L9.5 6Z" />
      <path d="M8 13h8" />
    </svg>
  );
}

export function Foot(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 4.5c1.2 0 2 1 2 2.4 0 2.2-1 3.6-1 6.1 0 2.4 1.4 3.6 1.4 5.3 0 1.3-1 2.2-2.4 2.2-1.8 0-3.5-1.6-3.5-4.4 0-2 .6-3.2.6-5.4 0-3.4.4-6.2 3.3-6.2Z" />
      <circle cx="13.5" cy="6" r="1" />
      <circle cx="16" cy="7" r="1" />
      <circle cx="18" cy="9" r="1" />
      <circle cx="19" cy="11.5" r="1" />
    </svg>
  );
}

export function Scissors(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8.1 7.7 20 18" />
      <path d="M8.1 16.3 20 6" />
      <path d="M12 12 8.1 16.3" />
    </svg>
  );
}

export function Lipstick(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 9.5 11 3l2.6 1-1.4 6" />
      <rect x="8.5" y="9.5" width="5.5" height="4" rx="1" />
      <path d="M9 13.5h5v6a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9 19.5v-6Z" />
    </svg>
  );
}

export function Sparkle(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3c.4 4.3 1.7 5.6 6 6-4.3.4-5.6 1.7-6 6-.4-4.3-1.7-5.6-6-6 4.3-.4 5.6-1.7 6-6Z" />
      <path d="M19 14c.2 1.8.7 2.3 2.5 2.5-1.8.2-2.3.7-2.5 2.5-.2-1.8-.7-2.3-2.5-2.5 1.8-.2 2.3-.7 2.5-2.5Z" />
    </svg>
  );
}

export function Star({ filled, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6.1L12 17.8 6.6 19.7l1.2-6.1-4.5-4.2 6.1-.8L12 3Z" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Clock(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Phone(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L19 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-1Z" />
    </svg>
  );
}

export function MapPin(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s-6.5-5.2-6.5-10.2A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.8C18.5 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  );
}

export function Instagram(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Heart(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 20s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.5C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

export function Check(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
