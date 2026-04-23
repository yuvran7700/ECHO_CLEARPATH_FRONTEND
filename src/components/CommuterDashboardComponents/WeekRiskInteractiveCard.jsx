import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    CloudSun,
    Droplets,
    Wind,
    Thermometer,
    CalendarDays,
    AlertTriangle,
} from "lucide-react";

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

function formatDayLabel(dateString) {
    return new Date(dateString).toLocaleDateString("en-AU", {
        weekday: "short",
    });
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}

function getRiskMeta(riskLevel) {
    switch (riskLevel?.toLowerCase()) {
        case "high":
            return {
                badgeClass:
                    "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
                textClass: "text-red-600",
                subtext: "Heavy delays or cancellations are more likely.",
            };
        case "moderate":
            return {
                badgeClass:
                    "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
                textClass: "text-amber-600",
                subtext: "Minor delays are possible. Allow extra time.",
            };
        case "low":
        default:
            return {
                badgeClass:
                    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
                textClass: "text-emerald-600",
                subtext: "Conditions suggest stable and reliable service.",
            };
    }
}

function WeatherMetric({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl bg-[#456990] p-5 text-white shadow-sm border border-white/10">
            {/* Icon Container with subtle glass effect */}
            <div className="shrink-0 rounded-xl bg-white/20 p-3">
                <Icon className="h-6 w-6" strokeWidth={2.5} />
            </div>

            <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">
                    {label}
                </span>
                <span className="truncate text-xl font-semibold tracking-tight">
                    {value}
                </span>
            </div>
        </div>
    );
}

export default function WeeklyInteractiveRiskCard({
    lineId = "T1",
    forecast,
    selectedDayIndex = 0,
    onDayChange,
}) {
    const line = LINE_THEMES[lineId] || LINE_THEMES.default;
    const days = forecast?.days ?? [];
    const selectedDay = days[selectedDayIndex] ?? days[0] ?? null;

    const selectedPercent = useMemo(
        () => formatRiskPercent(selectedDay?.risk),
        [selectedDay]
    );

    if (!days.length || !selectedDay) {
        return (
            <Card className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6 text-sm text-slate-500">
                    No forecast data available.
                </CardContent>
            </Card>
        );
    }

    const riskMeta = getRiskMeta(selectedDay.risk_level);

    return (
        <Card className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <CardContent className="p-0">
                {/* Top strip */}
                <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 md:p-7">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-sm"
                                    style={{ backgroundColor: line.brandColor }}
                                >
                                    {lineId}
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Selected line
                                    </p>
                                    <h2 className="text-lg font-semibold tracking-tight text-slate-950 md:text-xl">
                                        {line.name}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                                <CalendarDays className="h-4 w-4" />
                                <span>{days.length} day forecast</span>
                            </div>
                        </div>

                        {/* Google-like forecast strip */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                            {days.map((day, index) => {
                                const percent = formatRiskPercent(day.risk);
                                const isActive = index === selectedDayIndex;

                                return (
                                    <Button
                                        key={day.date}
                                        type="button"
                                        variant="ghost"
                                        onClick={() => onDayChange?.(index)}
                                        className={`h-auto rounded-2xl border p-4 text-left transition ${
                                            isActive
                                                ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-900"
                                                : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                        }`}
                                    >
                                        <div className="flex w-full flex-col gap-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p
                                                        className={`text-xs font-semibold uppercase tracking-wide ${
                                                            isActive
                                                                ? "text-slate-300"
                                                                : "text-slate-400"
                                                        }`}
                                                    >
                                                        {formatDayLabel(day.date)}
                                                    </p>
                                                    <p className="mt-1 text-sm font-medium">
                                                        {new Date(day.date).toLocaleDateString(
                                                            "en-AU",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                            }
                                                        )}
                                                    </p>
                                                </div>

                                                <CloudSun
                                                    className={`h-4 w-4 ${
                                                        isActive
                                                            ? "text-slate-200"
                                                            : "text-slate-400"
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xl font-semibold leading-none">
                                                    {percent}%
                                                </p>
                                                <p
                                                    className={`mt-1 text-xs ${
                                                        isActive
                                                            ? "text-slate-300"
                                                            : "text-slate-500"
                                                    }`}
                                                >
                                                    {day.risk_level} risk
                                                </p>
                                            </div>
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main detail panel */}
                <div className="p-6 md:p-7">
                    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                        <div className="space-y-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {formatDate(selectedDay.date)}
                                    </p>
                                    <div className="mt-3 flex items-end gap-2">
                                        <span className="text-6xl font-semibold leading-none tracking-tight text-slate-950 md:text-7xl">
                                            {selectedPercent}
                                        </span>
                                        <span className="pb-2 text-2xl font-medium text-slate-400">
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Disruption probability
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Based on forecasted conditions
                                    </span>
                                </div>

                                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: `${selectedPercent}%`,
                                                backgroundColor: line.brandColor,
                                            }}
                                        />
                                    </div>
        
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle
                                        className={`mt-0.5 h-4 w-4 ${riskMeta.textClass}`}
                                    />
                                    <div>
                                        <p className={`text-sm font-semibold ${riskMeta.textClass}`}>
                                            {selectedDay.risk_level} Risk
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            {selectedDay.message || riskMeta.subtext}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                            <WeatherMetric
                                icon={Thermometer}
                                label="Temperature"
                                value={selectedDay.tempSeverity || "Unknown"}
                            />
                            <WeatherMetric
                                icon={Droplets}
                                label="Rain"
                                value={selectedDay.rainSeverity || "Unknown"}
                            />
                            <WeatherMetric
                                icon={Wind}
                                label="Wind"
                                value={selectedDay.windSeverity || "Unknown"}
                            />
                            <WeatherMetric
                                icon={CloudSun}
                                label="Humidity"
                                value={selectedDay.humiditySeverity || "Unknown"}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}