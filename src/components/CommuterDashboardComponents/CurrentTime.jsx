import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const seconds = time.toLocaleTimeString("en-AU", {
    second: "2-digit",
  });

  const date = time.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="flex flex-col items-end">
      {/* Main time */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight text-slate-900">
          {formattedTime}
        </span>
        <span className="text-sm text-slate-400">
          :{seconds}
        </span>
      </div>

      {/* Subtle date */}
      <span className="text-xs text-slate-400">
        {date}
      </span>
    </div>
  );
}