import React from "react";

const LINE_THEMES = {
  T1: { name: "North Shore & Western Line", brandColor: "#EE854B" },
  T2: { name: "Leppington & Inner West Line", brandColor: "#0098CD" },
  T3: { name: "Liverpool & Inner West Line", brandColor: "#F37021" },
  T4: { name: "Eastern Suburbs & Illawarra Line", brandColor: "#005AA3" },
  T5: { name: "Cumberland Line", brandColor: "#C70F9F" },
  T6: { name: "Lidcombe & Bankstown Line", brandColor: "#8B5A2B" },
  T7: { name: "Olympic Park Line", brandColor: "#737373" },
  T8: { name: "Airport & South Line", brandColor: "#16DA23" },
  T9: { name: "Northern Line", brandColor: "#CC0000" },
  M1: { name: "Metro North West & Bankstown", brandColor: "#08BFBF" },
  default: { name: "Transit Line", brandColor: "#64748B" },
};

function formatRiskPercent(risk) {
  if (typeof risk !== "number") return 0;
  return Math.round(risk * 100);
}

function getRiskConfig(riskLevel) {
  switch (riskLevel?.toLowerCase()) {
    case "high":
      return {
        label: "High Risk",
        color: "#DC2626",
        info: "Heavy delays or cancellations are more likely.",
      };
    case "moderate":
      return {
        label: "Moderate Risk",
        color: "#D97706",
        info: "Minor delays are possible. Allow buffer time.",
      };
    case "low":
    default:
      return {
        label: "Low Risk",
        color: "#059669",
        info: "Conditions suggest stable and reliable service.",
      };
  }
}

function formatDisplayDate(dateString) {
  if (!dateString) return "Forecast";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function RiskCard({
  lineId = "T1",
  forecastDay,
}) {
  const line = LINE_THEMES[lineId] || LINE_THEMES.default;

  const percent = formatRiskPercent(forecastDay?.risk);
  const risk = getRiskConfig(forecastDay?.risk_level);

  return (
    <div className="w-full">
      <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8">
        {/* Top row */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-sm"
              style={{ backgroundColor: line.brandColor }}
            >
              {lineId}
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Selected Line
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                {line.name}
              </h2>
            </div>
          </div>

          <span
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: line.brandColor }}
          >
            {formatDisplayDate(forecastDay?.date)}
          </span>
        </div>

        {/* Main score */}
        <div className="mb-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold leading-none tracking-tight text-slate-950 md:text-7xl">
              {percent}
            </span>
            <span className="pb-2 text-2xl font-medium text-slate-400">%</span>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-slate-200">
            <p
              className="mb-1 text-sm font-semibold"
              style={{ color: risk.color }}
            >
              {risk.label}
            </p>
            <p className="text-sm leading-6 text-slate-600">
              {forecastDay?.message || risk.info}
            </p>
          </div>
        </div>

        {/* Weather summary chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {forecastDay?.weather_summary && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {forecastDay.weather_summary}
            </span>
          )}
          {forecastDay?.rainSeverity && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {forecastDay.rainSeverity}
            </span>
          )}
          {forecastDay?.windSeverity && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {forecastDay.windSeverity}
            </span>
          )}
          {forecastDay?.humiditySeverity && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {forecastDay.humiditySeverity}
            </span>
          )}
        </div>

        {/* Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Disruption probability
            </span>
            <span className="text-xs font-medium text-slate-500">
              Based on forecasted conditions
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                backgroundColor: line.brandColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}