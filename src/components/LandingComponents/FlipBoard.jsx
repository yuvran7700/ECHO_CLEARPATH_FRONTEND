import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const MESSAGES = [
  "STAY HUNGRY \nSTAY IN BED \n- STEVE JOBS",
  "What did you get done this week?",
  "I burned $20 \nfor this shit.",
  "DONT WORRY \nBE HAPPY FFS.",
  "LADIES AND GENTLEMEN \nWELCOME TO F#!@# C!@$",
];

const STATES = [
  {
    label: "STORM ALERT",
    labelColor: "#d88a8a",
    forecast: "Heavy rain",
    status: "DELAYED",
  },
  {
    label: "MAJOR ISSUE",
    labelColor: "#d28a57",
    forecast: "Severe storm",
    status: "CANCELLED",
  },
  {
    label: "CLEAR WINDOW",
    labelColor: "#9fb7c9",
    forecast: "Conditions easing",
    status: "ON TIME",
  },
];

const TOP_ROW = ["T", "H", "E", null, "T", "R", "A", "I", "N", null, "I", "S"];
const BOARD_COLS = 12;

/* ───────────────────────────── Helpers ───────────────────────────── */

function getRandomChar() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function textToRow(text) {
  const chars = text.split("");
  return Array.from({ length: BOARD_COLS }, (_, i) =>
    chars[i] === " " ? null : chars[i] ?? null
  );
}

/* ─────────────────────── Split Flap Engine ───────────────────────── */

function useFlapEngine(target, delay = 0, stepMs = 50) {
  const currentRef = useRef(" ");
  const timeoutRef = useRef(null);

  const [state, setState] = useState({
    current: " ",
    prev: " ",
    flipId: 0,
  });

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const normalized = target ?? " ";

    if (normalized === currentRef.current) return;

    const steps =
      normalized === " "
        ? 8 + Math.floor(Math.random() * 5)
        : 20 + Math.floor(Math.random() * 15);

    const run = (i) => {
      const isLast = i === steps;

      const next = isLast ? normalized : getRandomChar();
      const prev = currentRef.current;

      currentRef.current = next;

      setState({
        current: next,
        prev,
        flipId: i + 1,
      });

      if (!isLast) {
        timeoutRef.current = setTimeout(() => run(i + 1), stepMs);
      }
    };

    timeoutRef.current = setTimeout(() => run(0), delay);

    return () => clearTimeout(timeoutRef.current);
  }, [target, delay, stepMs]);

  return state;
}

/* ────────────────────────── Card Face ───────────────────────────── */

function CardFace({ char, type }) {
  const isTop = type === "top";

  return (
    <div
      className={`absolute left-0 right-0 h-1/2 flex justify-center overflow-hidden
      ${isTop ? "top-0 items-end" : "bottom-0 items-start"}`}
      style={{
        background: isTop
          ? "linear-gradient(180deg,#121418,#0a0c0f)"
          : "linear-gradient(180deg,#0c0e12,#05070a)",
      }}
    >
      <span
        className="text-white font-mono font-light select-none"
        style={{
          fontSize: "2rem",
          transform: isTop ? "translateY(50%)" : "translateY(-50%)",
        }}
      >
        {char || "\u00A0"}
      </span>
    </div>
  );
}

/* ────────────────────────── Flap Cell ───────────────────────────── */

function FlapCell({ value, index, trigger }) {
  const { current, prev, flipId } = useFlapEngine(
    value,
    index * 40,
    45
  );

  const isFlipping = flipId > 0;

  if (value === null) {
    return <div className="w-[48px] h-[70px]" />;
  }

  return (
    <div className="relative w-[48px] h-[70px]" style={{ perspective: "1000px" }}>
      {/* Static board state */}
      <CardFace char={current} type="top" />
      <CardFace char={current} type="bottom" />

      {/* Flip animation */}
      <AnimatePresence>
        {isFlipping && (
          <motion.div
            key={flipId}
            className="absolute inset-0 z-10"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -180 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* OLD (top flap) */}
            <div className="absolute inset-0 backface-hidden">
              <CardFace char={prev} type="top" />
            </div>

            {/* NEW (bottom flap) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ transform: "rotateX(180deg)" }}
            >
              <CardFace char={current} type="bottom" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* hinge */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/80 z-20" />
    </div>
  );
}

/* ─────────────────────────── Board ──────────────────────────────── */

export default function FlipBoard() {
  const [stateIndex, setStateIndex] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
 
  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );
 
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);
 

  useEffect(() => {
    const t = setInterval(() => {
      setStateIndex((p) => (p + 1) % STATES.length);
    }, 3000);

    return () => clearInterval(t);
  }, []);

  const current = STATES[stateIndex];

  const bottomRow = useMemo(() => {
    switch (current.status) {
      case "DELAYED":
        return textToRow(" DELAYED   ");
      case "CANCELLED":
        return textToRow("CANCELLED  ");
      case "ON TIME":
        return textToRow(" ON TIME   ");
      default:
        return textToRow(" DELAYED   ");
    }
  }, [current.status]);

  return (
    <div className="relative mx-auto max-w-3xl p-4 rounded-xl bg-black/90 text-white">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="uppercase text-xs tracking-widest text-white/40">
          Live Operations Board
        </div>

        <div
          className="uppercase text-xs tracking-widest font-medium"
          style={{ color: current.labelColor }}
        >
          {current.label}
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-between mb-8">
        <div>
          <div className="text-white/40 text-xs uppercase">Service</div>
          <div className="text-xl">T1 Western Line</div>
        </div>

        <div className="text-right">
          <div className="text-white/40 text-xs uppercase">Forecast</div>
          <div>{current.forecast}</div>
        </div>
      </div>

      {/* Board */}
      {/* <TextFlippingBoard text={MESSAGES[msgIdx]} /> */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 justify-center">
          {TOP_ROW.map((ch, i) => (
            <FlapCell key={`top-${i}`} value={ch} index={i} />
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          {bottomRow.map((ch, i) => (
            <FlapCell
              key={`bottom-${i}`}
              value={ch}
              index={i + TOP_ROW.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}