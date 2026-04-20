import { useMemo, useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const CHART_COLOR = "var(--chart-1)";

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
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
};

function ChartWrapper({ height = 300, children }) {
    return (
        <div style={{ width: "100%", minWidth: 0, height }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={height}>
                {children}
            </ResponsiveContainer>
        </div>
    );
}

function StatCard({ label, value, helper }) {
    return (
        <div 
            className="rounded-2xl border px-4 py-3" 
            style={{ backgroundColor: '#456990' }}
        >
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                {label}
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                {value}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/80">
                {helper}
            </p>
        </div>
    );
}

function periodLabel(value) {
    if (value === "all_time") return "All time";
    return value;
}

function viewLabel(value) {
    return value === "days" ? "Day of week" : "Monthly seasonality";
}

function TemporalPatternsPanel({ data }) {
    const [activeView, setActiveView] = useState("days");
    const [activePeriod, setActivePeriod] = useState("all_time");

    const periods = [
        { value: "all_time", label: "All time" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
        { value: "2026", label: "2026" },
    ];

    const viewOptions = [
        { value: "days", label: "Days" },
        { value: "months", label: "Months" },
    ];

    const rawSection = useMemo(() => {
        if (activeView === "days") {
            return (
                data?.best_worst_day_of_week?.[activePeriod] ??
                data?.best_worst_day_of_week?.all_time
            );
        }

        return (
            data?.best_worst_month?.[activePeriod] ??
            data?.best_worst_month?.all_time
        );
    }, [data, activeView, activePeriod]);

    const chartData = useMemo(() => {
        if (!rawSection) return [];

        if (activeView === "days") {
            return (rawSection.by_day ?? []).map((d) => ({
                ...d,
                chartLabel: d.label,
                fullLabel: d.label,
                ratePercent: Number((d.disruption_rate * 100).toFixed(1)),
            }));
        }

        return (rawSection.by_month ?? []).map((m) => ({
            ...m,
            chartLabel: m.label.slice(0, 3),
            fullLabel: m.label,
            ratePercent: Number((m.disruption_rate * 100).toFixed(1)),
        }));
    }, [rawSection, activeView]);

    const totalSampleSize = useMemo(() => {
        if (!rawSection) return 0;

        const rows =
            activeView === "days" ? rawSection.by_day ?? [] : rawSection.by_month ?? [];

        return rows.reduce((sum, row) => sum + (row.sample_size ?? 0), 0);
    }, [rawSection, activeView]);

    const bestRate = useMemo(() => {
        if (!rawSection) return "—";

        const rows =
            activeView === "days" ? rawSection.by_day ?? [] : rawSection.by_month ?? [];

        const match = rows.find((row) => row.label === rawSection.best);
        return match ? `${(match.disruption_rate * 100).toFixed(1)}%` : "—";
    }, [rawSection, activeView]);

    const worstRate = useMemo(() => {
        if (!rawSection) return "—";

        const rows =
            activeView === "days" ? rawSection.by_day ?? [] : rawSection.by_month ?? [];

        const match = rows.find((row) => row.label === rawSection.worst);
        return match ? `${(match.disruption_rate * 100).toFixed(1)}%` : "—";
    }, [rawSection, activeView]);

    if (!rawSection) {
        return (
            <Card className="h-full rounded-3xl border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Temporal patterns</CardTitle>
                    <CardDescription>No temporal pattern data available.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="h-full rounded-3xl border shadow-sm">
            <CardHeader className="space-y-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <CardTitle className="text-base">
                                {viewLabel(activeView)}
                            </CardTitle>
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                {periodLabel(activePeriod)}
                            </Badge>
                        </div>

                        <CardDescription>
                            {activeView === "days"
                                ? `Weekly disruption pattern for ${periodLabel(activePeriod)}`
                                : `Monthly disruption pattern for ${periodLabel(activePeriod)}`}
                        </CardDescription>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Tabs value={activeView} onValueChange={setActiveView}>
                            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1 sm:w-[180px]">
                                {viewOptions.map((view) => (
                                    <TabsTrigger
                                        key={view.value}
                                        value={view.value}
                                        className="rounded-full px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                    >
                                        {view.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <Tabs value={activePeriod} onValueChange={setActivePeriod}>
                            <TabsList className="grid w-full grid-cols-4 rounded-full bg-muted p-1 sm:w-[320px]">
                                {periods.map((period) => (
                                    <TabsTrigger
                                        key={period.value}
                                        value={period.value}
                                        className="rounded-full px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                    >
                                        {period.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                    <div className="flex flex-col gap-3">
                        <StatCard
                            label={`Best ${activeView === "days" ? "day" : "month"}`}
                            value={rawSection.best}
                            helper={bestRate}
                        />
                        <StatCard
                            label={`Worst ${activeView === "days" ? "day" : "month"}`}
                            value={rawSection.worst}
                            helper={worstRate}
                        />
                        <StatCard
                            label="Sample size"
                            value={`${totalSampleSize}`}
                            helper={`${periodLabel(activePeriod)} • ${activeView === "days" ? "day-level" : "month-level"} observations`}
                        />
                    </div>

                    <div className="min-w-0">
                        <ChartWrapper height={300}>
                            {activeView === "days" ? (
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                                >
                                    <CartesianGrid
                                        vertical={false}
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="chartLabel"
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
                                        formatter={(value, _name, item) => {
                                            const row = item?.payload;
                                            return [
                                                `${value}%`,
                                                `Disruption rate • ${row?.disruption_days ?? 0} disruption days / ${row?.sample_size ?? 0} total`,
                                            ];
                                        }}
                                        labelFormatter={(label, payload) => {
                                            const row = payload?.[0]?.payload;
                                            return row?.fullLabel ?? label;
                                        }}
                                        contentStyle={tooltipStyle}
                                        cursor={{ fill: "var(--muted)" }}
                                    />
                                    <Bar
                                        dataKey="ratePercent"
                                        fill={CHART_COLOR}
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            ) : (
                                <LineChart
                                    data={chartData}
                                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                                >
                                    <CartesianGrid
                                        vertical={false}
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="chartLabel"
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
                                        formatter={(value, _name, item) => {
                                            const row = item?.payload;
                                            return [
                                                `${value}%`,
                                                `Disruption rate • ${row?.disruption_days ?? 0} disruption days / ${row?.sample_size ?? 0} total`,
                                            ];
                                        }}
                                        labelFormatter={(label, payload) => {
                                            const row = payload?.[0]?.payload;
                                            return row?.fullLabel ?? label;
                                        }}
                                        contentStyle={tooltipStyle}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="ratePercent"
                                        stroke={CHART_COLOR}
                                        strokeWidth={2.5}
                                        dot={{ r: 3, fill: CHART_COLOR, strokeWidth: 0 }}
                                        activeDot={{ r: 5 }}
                                    />
                                </LineChart>
                            )}
                        </ChartWrapper>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default TemporalPatternsPanel;