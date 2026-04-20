// AnalyticsDashboardPage.jsx

import {
    AlertTriangle,
    CalendarDays,
    CloudRain,
    TrendingUp,
    ArrowUpRight,
    Sparkles,
    BarChart3,
    Activity,
    FileText,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { analyticsData } from "@/mocks/analysisStub";
import WeatherThresholdPanel from "@/components/AnalyticsDashboardComponents/WeatherChart";
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

// ─── Small UI wrappers ───────────────────────────────────────────────────────

function SectionCard({ className = "", children }) {
    return (
        <Card className={`rounded-3xl border shadow-sm ${className}`}>
            {children}
        </Card>
    );
}

function DashboardSection({ icon: Icon, eyebrow, title, description, children }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="rounded-full border bg-muted/50 p-2">
                        <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
                        {eyebrow}
                    </span>
                </div>

                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>

            {children}
        </div>
    );
}

// ─── Overview Cards ──────────────────────────────────────────────────────────

// function OverviewCards({ data }) {
//     const allTimeDays = data.best_worst_day_of_week.all_time;
//     const allTimeMonths = data.best_worst_month.all_time;

//     const safestDay = getBestDay(data);
//     const worstMonth = getWorstMonth(data);

//     const cards = [
//         {
//             title: "Overall disruption rate",
//             value: percent(data.overall.overall_disruption_rate),
//             description: `${data.overall.total_disruption_days} disruption days out of ${data.overall.total_days}`,
//             icon: AlertTriangle,
//             tint: "bg-orange-50 text-orange-600 border-orange-100",
//         },
//         {
//             title: "Safest day",
//             value: allTimeDays.best,
//             description: `${percent(safestDay.disruption_rate)} disruption rate`,
//             icon: CalendarDays,
//             tint: "bg-emerald-50 text-emerald-600 border-emerald-100",
//         },
//         {
//             title: "Worst month",
//             value: allTimeMonths.worst,
//             description: `${percent(worstMonth.disruption_rate)} disruption rate`,
//             icon: TrendingUp,
//             tint: "bg-rose-50 text-rose-600 border-rose-100",
//         },
//         {
//             title: "Strongest weather signal",
//             value: getWorstWeatherSignal(data.weather_threshold_analysis),
//             description: "Highest disruption rate at extreme thresholds",
//             icon: CloudRain,
//             tint: "bg-amber-50 text-amber-600 border-amber-100",
//         },
//     ];

//     return (
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {cards.map((card) => (
//                 <MetricCard key={card.title} {...card} />
//             ))}
//         </div>
//     );
// }

// function MetricCard({ title, value, description, icon: Icon, tint }) {
//     return (
//         <SectionCard className="h-full">
//             <CardHeader className="pb-3">
//                 <div className="flex items-start justify-between gap-3">
//                     <div className="min-w-0">
//                         <CardDescription className="text-[11px] uppercase tracking-[0.18em]">
//                             {title}
//                         </CardDescription>
//                         <CardTitle className="mt-2 text-2xl font-semibold tracking-tight">
//                             {value}
//                         </CardTitle>
//                     </div>

//                     <div className={`shrink-0 rounded-2xl border p-2.5 ${tint}`}>
//                         <Icon className="h-4 w-4" />
//                     </div>
//                 </div>
//             </CardHeader>

//             <CardContent className="pt-0">
//                 <p className="text-sm leading-6 text-muted-foreground">{description}</p>
//             </CardContent>
//         </SectionCard>
//     );
// }

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
        <SectionCard className="h-full border-none bg-[#2A2B2A] text-white">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <CardDescription className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                            {title}
                        </CardDescription>
                        <CardTitle className="mt-2 text-2xl font-semibold tracking-tight text-white">
                            {value}
                        </CardTitle>
                    </div>

                    {/* Icon container with a subtle glass effect to pop against the dark bg */}
                    <div className="shrink-0 rounded-2xl bg-white/10 p-2.5 text-white">
                        <Icon className="h-4 w-4" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <p className="text-sm leading-6 text-white/70">{description}</p>
            </CardContent>
        </SectionCard>
    );
}

// ─── Insight Section ─────────────────────────────────────────────────────────

function InsightStrip({ data }) {
    const rain10 = data.weather_threshold_analysis.rainfall.find((d) => d.threshold_mm === 10);
    const rain15 = data.weather_threshold_analysis.rainfall.find((d) => d.threshold_mm === 15);
    const strongestSignal = getWorstWeatherSignal(data.weather_threshold_analysis);

    const insightCards = [
        {
            title: "Primary signal",
            value: strongestSignal,
            description: "Most predictive weather driver in this dataset",
            className: "bg-orange-50/70 border-orange-100",
            valueClassName: "text-orange-700",
        },
        {
            title: "Rain > 10mm",
            value: percent(rain10.disruption_rate),
            description: "Disruption rate at threshold",
            className: "bg-amber-50/70 border-amber-100",
            valueClassName: "text-amber-700",
        },
        {
            title: "Rain > 15mm",
            value: percent(rain15.disruption_rate),
            description: "Disruption rate at threshold",
            className: "bg-rose-50/70 border-rose-100",
            valueClassName: "text-rose-700",
        },
    ];

    return (
        <SectionCard>
            <CardContent className="p-5 md:p-6">
                <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <div className="rounded-full bg-white/80 p-2 text-orange-600 shadow-sm">
                                <ArrowUpRight className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-orange-700/80">
                                Key insight
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                            {strongestSignal} is the clearest disruption driver in the current dataset.
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            Weather sensitivity becomes more pronounced at higher thresholds,
                            making condition-based alerting a strong fit for commuter-facing
                            disruption prediction.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Badge className="rounded-full border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-100">
                                Strongest signal: {strongestSignal}
                            </Badge>
                            <Badge className="rounded-full border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100">
                                Best for threshold alerts
                            </Badge>
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                        {insightCards.map((item) => (
                            <div
                                key={item.title}
                                className={`rounded-2xl border p-4 ${item.className}`}
                            >
                                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                    {item.title}
                                </p>
                                <p className={`mt-2 text-xl font-semibold tracking-tight ${item.valueClassName}`}>
                                    {item.value}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
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
        {
            title: "Overall network profile",
            body: `Overall disruption rate is ${percent(overallRate)} across the full dataset.`,
            tint: "bg-orange-50/70 border-orange-100",
        },
        {
            title: "Most reliable day",
            body: `Saturday is the safest day at ${percent(saturday.disruption_rate)}.`,
            tint: "bg-emerald-50/70 border-emerald-100",
        },
        {
            title: "Weakest month",
            body: `February is one of the weakest months at ${percent(feb.disruption_rate)}.`,
            tint: "bg-rose-50/70 border-rose-100",
        },
        {
            title: "Rain sensitivity",
            body: `Rain above 10mm rises to ${percent(rain10.disruption_rate)} disruption risk.`,
            tint: "bg-amber-50/70 border-amber-100",
        },
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
                            key={item.title}
                            className={`rounded-2xl border px-4 py-4 ${item.tint}`}
                        >
                            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                                {item.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-foreground">
                                {item.body}
                            </p>
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
            <div className="mx-auto flex w-full flex-col gap-10 px-4 py-2 md:px-6">
                <DashboardSection
                    icon={Activity}
                    eyebrow="Selected context"
                    title="Analytics scope"
                    description="Current line, location, and observed data range for this dashboard."
                >
                    <SelectedLineSummaryCard
                        selectedLineId={selectedLineId}
                        data={analyticsData}
                    />
                </DashboardSection>

                <DashboardSection
                    icon={Sparkles}
                    eyebrow="Overview"
                    title="Key reliability signals"
                    description="High-level metrics to help you understand overall disruption behaviour at a glance."
                >
                    <OverviewCards data={analyticsData} />
                </DashboardSection>

                <DashboardSection
                    icon={ArrowUpRight}
                    eyebrow="Highlights"
                    title="What stands out"
                    description="The strongest signals and threshold effects surfaced from the current dataset."
                >
                    <InsightStrip data={analyticsData} />
                </DashboardSection>

                <DashboardSection
                    icon={BarChart3}
                    eyebrow="Trends"
                    title="Temporal patterns"
                    description="Switch between day-of-week and monthly views to compare reliability patterns over time."
                >
                    <TemporalPatternsPanel data={analyticsData} />
                </DashboardSection>

                <DashboardSection
                    icon={CloudRain}
                    eyebrow="Deep dive"
                    title="Weather threshold analysis"
                    description="Explore how disruption risk changes as weather conditions become more severe."
                >
                    <WeatherThresholdPanel data={analyticsData} />
                </DashboardSection>

                <DashboardSection
                    icon={FileText}
                    eyebrow="Summary"
                    title="Analyst interpretation"
                    description="A concise interpretation layer for presenting the most important findings."
                >
                    <ReliabilitySummary data={analyticsData} />
                </DashboardSection>
            </div>
        </section>
    );
}