// AnalyticsDashboardComponents/WeatherChart.jsx 

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Thermometer,
    Wind,
    CloudRain,
    TrendingUp,
    Activity,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ReferenceLine,
} from "recharts";

const axisStyle = {
    fontSize: 12,
    fill: "var(--muted-foreground)",
};

const tooltipStyle = {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    fontSize: 12,
    color: "var(--foreground)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
};

const CHART_COLOR = "var(--primary)";
const CHART_COLOR_MUTED = "var(--muted-foreground)";
const CHART_GRID = "var(--border)";

function ChartWrapper({ height = 260, children }) {
    return (
        <div style={{ width: "100%", minWidth: 0, height }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={height}>
                {children}
            </ResponsiveContainer>
        </div>
    );
}

function formatThreshold(value, unit) {
    return `${value}${unit}`;
}

function getPeakPoint(data) {
    if (!data?.length) return null;
    return data.reduce((max, item) =>
        item.ratePercent > max.ratePercent ? item : max
    );
}

function getAverageRate(data) {
    if (!data?.length) return 0;
    return Number(
        (data.reduce((sum, item) => sum + item.ratePercent, 0) / data.length).toFixed(1)
    );
}

function ThresholdChart({ title, icon: Icon, unit, data }) {
    const peakPoint = useMemo(() => getPeakPoint(data), [data]);
    const averageRate = useMemo(() => getAverageRate(data), [data]);

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-border bg-muted/60 p-2.5 shrink-0">
                        <Icon className="h-4 w-4 text-foreground/80" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground">
                            Disruption rate above each threshold
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 md:min-w-[240px]">
                    <div className="rounded-2xl border border-border bg-muted/40 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Peak
                        </div>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                            {peakPoint ? `${peakPoint.ratePercent}%` : "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {peakPoint
                                ? `at ${formatThreshold(peakPoint.threshold, unit)}`
                                : "No data"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/40 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                            <Activity className="h-3.5 w-3.5" />
                            Average
                        </div>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                            {averageRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Across all thresholds
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-3">
                <ChartWrapper height={250}>
                    <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 4 }}>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke={CHART_GRID}
                        />
                        <XAxis
                            dataKey="threshold"
                            tickFormatter={(v) => `${v}${unit}`}
                            tickLine={false}
                            axisLine={false}
                            tick={axisStyle}
                        />
                        <YAxis
                            tickFormatter={(v) => `${v}%`}
                            tickLine={false}
                            axisLine={false}
                            tick={axisStyle}
                        />
                        <Tooltip
                            formatter={(value) => [`${value}%`, "Disruption rate"]}
                            labelFormatter={(label) => `Threshold: ${label}${unit}`}
                            contentStyle={tooltipStyle}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: 12,
                                color: "var(--muted-foreground)",
                                paddingTop: 8,
                            }}
                        />
                        <ReferenceLine
                            y={averageRate}
                            stroke={CHART_COLOR_MUTED}
                            strokeDasharray="4 4"
                        />
                        <Line
                            type="monotone"
                            dataKey="ratePercent"
                            name="Disruption rate"
                            stroke={CHART_COLOR}
                            strokeWidth={2.75}
                            dot={{
                                r: 3.5,
                                fill: CHART_COLOR,
                                stroke: "var(--background)",
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 5,
                                fill: CHART_COLOR,
                                stroke: "var(--background)",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ChartWrapper>
            </div>
        </div>
    );
}

export default function WeatherThresholdPanel({ data }) {
    const temperature = data.weather_threshold_analysis.temperature.map((d) => ({
        threshold: d.threshold_c,
        ratePercent: Number((d.disruption_rate * 100).toFixed(1)),
        sampleSize: d.sample_size,
    }));

    const wind = data.weather_threshold_analysis.wind.map((d) => ({
        threshold: d.threshold_kmh,
        ratePercent: Number((d.disruption_rate * 100).toFixed(1)),
        sampleSize: d.sample_size,
    }));

    const rainfall = data.weather_threshold_analysis.rainfall.map((d) => ({
        threshold: d.threshold_mm,
        ratePercent: Number((d.disruption_rate * 100).toFixed(1)),
        sampleSize: d.sample_size,
    }));

    const [activeTab, setActiveTab] = useState("temp");

    const tabs = [
        {
            id: "temp",
            label: "Temperature",
            shortLabel: "Temp",
            icon: Thermometer,
            unit: "°C",
            data: temperature,
            accent: "from-orange-500/15 to-orange-500/5",
        },
        {
            id: "wind",
            label: "Wind",
            shortLabel: "Wind",
            icon: Wind,
            unit: "km/h",
            data: wind,
            accent: "from-sky-500/15 to-sky-500/5",
        },
        {
            id: "rain",
            label: "Rainfall",
            shortLabel: "Rain",
            icon: CloudRain,
            unit: "mm",
            data: rainfall,
            accent: "from-blue-500/15 to-blue-500/5",
        },
    ];

    const activeTabData = tabs.find((tab) => tab.id === activeTab);

    return (
        <Card className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold tracking-tight">
                            Weather threshold analysis
                        </CardTitle>
                        <CardDescription className="text-sm">
                            Compare how disruption risk changes as conditions become more severe
                        </CardDescription>
                    </div>

                    {activeTabData && (
                        <div className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                            Active view:{" "}
                            <span className="font-medium text-foreground">
                                {activeTabData.label}
                            </span>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-muted/35 p-1.5">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                aria-pressed={isActive}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="weather-threshold-active-tab"
                                        className="absolute inset-0 rounded-xl border border-border bg-background shadow-sm"
                                        transition={{
                                            type: "spring",
                                            stiffness: 320,
                                            damping: 28,
                                        }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center gap-2">
                                    <tab.icon
                                        className={cn(
                                            "h-4 w-4 transition-transform duration-200",
                                            isActive ? "scale-105" : "scale-100"
                                        )}
                                    />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden">{tab.shortLabel}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {activeTabData && (
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                            Metric: <span className="font-medium text-foreground">Disruption rate</span>
                        </div>
                        <div className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                            Unit: <span className="font-medium text-foreground">{activeTabData.unit}</span>
                        </div>
                        <div className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                            Points: <span className="font-medium text-foreground">{activeTabData.data.length}</span>
                        </div>
                    </div>
                )}

                <div className="relative min-h-[340px]">
                    <AnimatePresence mode="wait">
                        {activeTabData && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                <ThresholdChart
                                    title={activeTabData.label}
                                    icon={activeTabData.icon}
                                    unit={activeTabData.unit}
                                    data={activeTabData.data}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}