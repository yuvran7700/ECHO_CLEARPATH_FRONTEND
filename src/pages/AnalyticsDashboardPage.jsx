// AnalyticsDashboardPage.jsx

import {
    AlertTriangle,
    CalendarDays,
    CloudRain,
    TrendingUp,
    ArrowUpRight,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

import { analyticsData } from "@/mocks/analysisStub";
import WeatherThresholdPanel from "@/components/AnalyticsDashboardComponents/WeatherChart";
import SeasonalityPanel from "@/components/AnalyticsDashboardComponents/DisruptionMonthChart";
import DayOfWeekPanelChart from "@/components/AnalyticsDashboardComponents/DayOfWeekPanel";
import MonthSeasonalityPanel from "@/components/AnalyticsDashboardComponents/MonthSeasonalityPanel";
import TemporalPatternsPanel from "@/components/AnalyticsDashboardComponents/TemporalCharts";
import SelectedLineSummaryCard from "@/components/AnalyticsDashboardComponents/SelectedLineSummaryCard";
// ─── Helpers ────────────────────────────────────────────────────────────────

function percent(value) {
    return `${(value * 100).toFixed(1)}%`;
}

function getWorstWeatherSignal(weather) {
    const rainfallPeak = Math.max(...weather.rainfall.map((d) => d.disruption_rate));
    const windPeak = Math.max(...weather.wind.map((d) => d.disruption_rate));
    const tempPeak = Math.max(...weather.temperature.map((d) => d.disruption_rate));

    if (rainfallPeak >= windPeak && rainfallPeak >= tempPeak) return "Rainfall";
    if (windPeak >= rainfallPeak && windPeak >= tempPeak) return "Wind";
    return "Temperature";
}

function getBestDay(data) {
    const allTimeDays = data.best_worst_day_of_week.all_time;
    return allTimeDays.by_day.find((d) => d.label === allTimeDays.best);
}

function getWorstMonth(data) {
    const allTimeMonths = data.best_worst_month.all_time;
    return allTimeMonths.by_month.find((m) => m.label === allTimeMonths.worst);
}

// ─── Shared chart styles ─────────────────────────────────────────────────────

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

// ─── Small UI wrappers ───────────────────────────────────────────────────────

function SectionCard({ className = "", children }) {
    return (
        <Card className={`rounded-3xl border shadow-sm ${className}`}>
            {children}
        </Card>
    );
}

function ChartWrapper({ height = 280, children }) {
    return (
        <div style={{ width: "100%", minWidth: 0, height }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={height}>
                {children}
            </ResponsiveContainer>
        </div>
    );
}

// ─── Overview Cards ──────────────────────────────────────────────────────────

function OverviewCards({ data }) {
    const allTimeDays = data.best_worst_day_of_week.all_time;
    const allTimeMonths = data.best_worst_month.all_time;

    const safestDay = getBestDay(data);
    const worstMonth = getWorstMonth(data);

    const cards = [
        {
            title: "Overall disruption rate",
            value: percent(data.overall.overall_disruption_rate),
            description: `${data.overall.total_disruption_days} disruption days out of ${data.overall.total_days}`,
            icon: AlertTriangle,
        },
        {
            title: "Safest day",
            value: allTimeDays.best,
            description: `${percent(safestDay.disruption_rate)} disruption rate`,
            icon: CalendarDays,
        },
        {
            title: "Worst month",
            value: allTimeMonths.worst,
            description: `${percent(worstMonth.disruption_rate)} disruption rate`,
            icon: TrendingUp,
        },
        {
            title: "Strongest weather signal",
            value: getWorstWeatherSignal(data.weather_threshold_analysis),
            description: "Highest disruption rate at extreme thresholds",
            icon: CloudRain,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <MetricCard key={card.title} {...card} />
            ))}
        </div>
    );
}

function MetricCard({ title, value, description, icon: Icon }) {
    return (
        <SectionCard className="h-full">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <CardDescription className="text-[11px] uppercase tracking-[0.18em]">
                            {title}
                        </CardDescription>
                        <CardTitle className="mt-2 text-2xl font-semibold tracking-tight">
                            {value}
                        </CardTitle>
                    </div>

                    <div className="rounded-2xl bg-muted p-2.5 shrink-0">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </CardContent>
        </SectionCard>
    );
}

// ─── Insight Section ─────────────────────────────────────────────────────────

function InsightStrip({ data }) {
    const rain10 = data.weather_threshold_analysis.rainfall.find((d) => d.threshold_mm === 10);
    const rain15 = data.weather_threshold_analysis.rainfall.find((d) => d.threshold_mm === 15);
    const strongestSignal = getWorstWeatherSignal(data.weather_threshold_analysis);

    return (
        <SectionCard>
            <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between md:p-6">
                <div className="max-w-2xl">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="rounded-full bg-muted p-2">
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Key insight
                        </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {strongestSignal} is the clearest disruption driver in the current dataset.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Weather sensitivity is strongest once conditions become more severe, making
                        threshold-based alerting a strong candidate for commuter-facing prediction UX.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-[380px] md:justify-end">
                    <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                        Rain &gt; 10mm: {percent(rain10.disruption_rate)}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                        Rain &gt; 15mm: {percent(rain15.disruption_rate)}
                    </Badge>
                </div>
            </CardContent>
        </SectionCard>
    );
}


// ─── Summary ─────────────────────────────────────────────────────────────────

function ReliabilitySummary({ data }) {
    const overallRate = data.overall.overall_disruption_rate;
    const saturday = data.best_worst_day_of_week.all_time.by_day.find((d) => d.label === "Saturday");
    const feb = data.best_worst_month.all_time.by_month.find((m) => m.label === "February");
    const rain10 = data.weather_threshold_analysis.rainfall.find((d) => d.threshold_mm === 10);

    const summaryItems = [
        `Overall disruption rate is ${percent(overallRate)} across the full dataset.`,
        `Saturday is the safest day at ${percent(saturday.disruption_rate)}.`,
        `February is one of the weakest months at ${percent(feb.disruption_rate)}.`,
        `Rain above 10mm rises to ${percent(rain10.disruption_rate)} disruption risk.`,
    ];

    return (
        <SectionCard>
            <CardHeader>
                <CardTitle className="text-base">Analyst summary</CardTitle>
                <CardDescription>
                    Short interpretation for faster decision-making
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                    {summaryItems.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl bg-muted px-4 py-3 text-sm leading-6 text-muted-foreground"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </CardContent>
        </SectionCard>
    );
}

// ─── Main section only ───────────────────────────────────────────────────────

export default function AnalyticsDashboardPage() {
    const selectedLineId = "T1";

    return (
        <section className="w-full">
            <div className="mx-auto flex w-full flex-col gap-8 px-4 py-2 md:px-6">

                <SelectedLineSummaryCard
                    selectedLineId={selectedLineId}
                    data={analyticsData}
                />


                <OverviewCards data={analyticsData} />

                {/* 2. Key insight */}
                <InsightStrip data={analyticsData} />

                {/* <SeasonalityPanel data={analyticsData} /> */}
                {/* 3. Fast trends */}
                {/* <TrendsSection data={analyticsData} /> */}
                <TemporalPatternsPanel data={analyticsData} />
                {/* 4. Deep dive — only interactive panel */}
                <WeatherThresholdPanel data={analyticsData} />

                {/* 5. Summary */}
                <ReliabilitySummary data={analyticsData} />
            </div>
        </section>
    );
}