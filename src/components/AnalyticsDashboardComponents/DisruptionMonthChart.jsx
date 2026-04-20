import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
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

function SeasonalityPanel({ data }) {
    const daySection = data.best_worst_day_of_week.all_time;
    const dayChartData = daySection.by_day.map((d) => ({
        label: d.label,
        ratePercent: Number((d.disruption_rate * 100).toFixed(1)),
    }));

    const monthSection = data.best_worst_month.all_time;
    const monthChartData = monthSection.by_month.map((m) => ({
        label: m.label.slice(0, 3),
        ratePercent: Number((m.disruption_rate * 100).toFixed(1)),
    }));

    return (
        <Card className="h-full rounded-3xl border shadow-sm">
            <Tabs defaultValue="days" className="w-full">
                <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-base">Temporal Patterns</CardTitle>
                        <CardDescription>
                            All-time disruption trends
                        </CardDescription>
                    </div>

                    <TabsList className="grid w-[160px] grid-cols-2">
                        <TabsTrigger value="days">Days</TabsTrigger>
                        <TabsTrigger value="months">Months</TabsTrigger>
                    </TabsList>
                </CardHeader>

                <CardContent>
                    <TabsContent value="days" className="mt-0 outline-none">
                        <div className="mb-4 flex flex-wrap gap-2">
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Best: {daySection.best}
                            </Badge>
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Worst: {daySection.worst}
                            </Badge>
                        </div>

                        <ChartWrapper height={280}>
                            <BarChart
                                data={dayChartData}
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
                                    formatter={(value) => [`${value}%`, "Disruption"]}
                                    contentStyle={tooltipStyle}
                                    cursor={{ fill: "var(--muted)" }}
                                />
                                <Bar
                                    dataKey="ratePercent"
                                    fill={CHART_COLOR}
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ChartWrapper>
                    </TabsContent>

                    <TabsContent value="months" className="mt-0 outline-none">
                        <div className="mb-4 flex flex-wrap gap-2">
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Best: {monthSection.best}
                            </Badge>
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Worst: {monthSection.worst}
                            </Badge>
                        </div>

                        <ChartWrapper height={280}>
                            <LineChart
                                data={monthChartData}
                                margin={{ top: 4, right: 10, left: -16, bottom: 0 }}
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
                                    formatter={(value) => [`${value}%`, "Disruption"]}
                                    contentStyle={tooltipStyle}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="ratePercent"
                                    stroke={CHART_COLOR}
                                    strokeWidth={2.5}
                                    dot={{ r: 4, fill: CHART_COLOR, strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ChartWrapper>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
}

export default SeasonalityPanel;