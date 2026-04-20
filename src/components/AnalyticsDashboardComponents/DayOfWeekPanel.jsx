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

function ChartWrapper({ height = 280, children }) {
    return (
        <div style={{ width: "100%", minWidth: 0, height }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={height}>
                {children}
            </ResponsiveContainer>
        </div>
    );
}

function DayOfWeekPanelChart({ data }) {
    const [activePeriod, setActivePeriod] = useState("all_time");

    const periods = [
        { value: "all_time", label: "All time" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
        { value: "2026", label: "2026" },
    ];

    const safeSection =
        data?.best_worst_day_of_week?.[activePeriod] ??
        data?.best_worst_day_of_week?.all_time;

    const chartData = useMemo(() => {
        if (!safeSection?.by_day) return [];

        return safeSection.by_day.map((d) => ({
            ...d,
            ratePercent: Number((d.disruption_rate * 100).toFixed(1)),
        }));
    }, [safeSection]);

    const totalSampleSize = useMemo(() => {
        if (!safeSection?.by_day) return 0;
        return safeSection.by_day.reduce((sum, d) => sum + d.sample_size, 0);
    }, [safeSection]);

    if (!safeSection) {
        return (
            <Card className="h-full rounded-3xl border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Disruption by day of week</CardTitle>
                    <CardDescription>No day-of-week data available.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="h-full rounded-3xl border shadow-sm">
            <CardHeader className="space-y-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <CardTitle className="text-base">Disruption by day of week</CardTitle>
                        <CardDescription>
                            Compare weekly disruption patterns across the full dataset and each year
                        </CardDescription>
                    </div>

                    <Tabs value={activePeriod} onValueChange={setActivePeriod}>
                        <TabsList className="grid w-full grid-cols-4 rounded-full lg:w-[320px]">
                            {periods.map((period) => (
                                <TabsTrigger
                                    key={period.value}
                                    value={period.value}
                                    className="rounded-full px-3"
                                >
                                    {period.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>

            <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                        Best: {safeSection.best}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                        Worst: {safeSection.worst}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                        Sample: {totalSampleSize} days
                    </Badge>
                </div>

                <ChartWrapper height={280}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                        />
                        <XAxis
                            dataKey="label"
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
                            contentStyle={tooltipStyle}
                            cursor={{ fill: "var(--muted)" }}
                        />
                        <Bar
                            dataKey="ratePercent"
                            fill={CHART_COLOR}
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ChartWrapper>
            </CardContent>
        </Card>
    );
}

export default DayOfWeekPanelChart;